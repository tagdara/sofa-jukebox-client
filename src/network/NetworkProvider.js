import React, {useState, useEffect, createContext} from 'react';

const serverurl="https://"+window.location.hostname;
//const serverurl="https://"+window.location.hostname+":2443"

function writeCookie(key, value, days) {
    var date = new Date();
    // Default at 365 days.
    days = days || 365;
    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
    return value;
};

export const useStream = () => {
    const [eventSource, setEventSource] = useState(undefined)
    //const [connected, setConnected] = useState(false);
    const [subscribers, setSubscribers] = useState([])
    const [isConnecting, setIsConnecting] = useState(false)
    const [ streamToken, setStreamToken ] = useState("")

    const addSubscriber = (subscriber) => {
        // to see why this is needed for the closure issue
        // https://stackoverflow.com/questions/58193166/usestate-hook-setter-incorrectly-overwrites-state
        setSubscribers((subscribers) => ([...subscribers, subscriber] ));
    };

    useEffect(() => {
        writeCookie("access_token", streamToken, 1)
    }, [ streamToken ])
    
    function getStreamStatus() {
        
        if (eventSource) {
            return eventSource.readyState
        } else {
            return 10
        }
    }

    function getConnected() {
        if (eventSource!==undefined) {
            if (eventSource.readyState===1) {
                return true
            }
        }
        return false
    }

    const streamStatus=getStreamStatus()
    
    const streamConnected = getConnected()
    
    const connectStream = () => {
        if (subscribers.length>0 && !isConnecting) {
            setIsConnecting(true)
            var esource=new EventSource(serverurl+"/sse", { withCredentials: true })
            esource.addEventListener('message', dataHandler);
            esource.addEventListener('error', errorHandler);
            esource.addEventListener('open', openHandler);
            setEventSource(esource)
        }
    }

   const openHandler = () => {
        console.log('SSE Opened')
        //setConnected(true)
        setIsConnecting(false)
    }

    const errorHandler = () => {
        console.log('ERROR with EventSource')
        //setConnected(false)
        //connectStream()
    }

    const dataHandler = event => {
        //deviceDispatch(JSON.parse(event.data));
        var data=JSON.parse(event.data)
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i](data)
        }
        //setHeartbeat(Date.now())
    };


    useEffect(() => {
        let unmounted = false;

        if (!unmounted && !isConnecting && streamStatus!==1 && streamToken) {
            connectStream()
        }
            
        return () => {
            unmounted = true;
        };
    // eslint-disable-next-line    
    }, [ streamToken, subscribers, isConnecting, streamConnected, streamStatus]);
    
    return { streamConnected, streamStatus, addSubscriber, connectStream, setStreamToken };
};

export const NetworkContext = createContext();

export default function NetworkProvider(props) {

    const [connectError, setConnectError] = useState(false);
    const [ online, setOnline] = useState(false);
    const { streamConnected, streamStatus, addSubscriber, connectStream, setStreamToken } = useStream([])
    const [ user, setUser] = useState(null);
    const [refreshToken, setRefreshToken]= useState(null);
    const [accessToken, setAccessToken]= useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [ userInTimeout, setUserInTimeout] = useState(false)

    useEffect(() => {

        function updateOnlineStatus(event) {
            setOnline(navigator.onLine)
        }

        window.addEventListener('online',  updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    
        return () => {
            window.removeEventListener('online',  updateOnlineStatus);
            window.removeEventListener('offline',  updateOnlineStatus);
        };
        
    }, [ ]);


    function handleFetchErrors(response) {
        if (response.status===400) {
            console.log('Not logged in', response.status, response.statusText)
            return { "error": "login" }
        }
        if (response.status===401) {
            console.log('Not logged in', response.status, response.statusText)
            return { "error": "login" }
        }
        if (!response.ok) {
            console.log('Error connecting', response.status, response.statusText)
            setConnectError(true)
            if (response.status === 451) {
                setLoggedIn(false)
                setUserInTimeout(true)
            }
            return { "error": response.statusText, "status": response.status }
        }
        //setLoggedIn(true)
        setConnectError(false)
        return response.json()
    }

    function getJSON(path) {
        if (accessToken && loggedIn ) {
      	    return fetch(serverurl+"/"+path, { method: 'GET', headers: { 'authorization': accessToken}})
     		    .then(result=>handleFetchErrors(result))
        } else {
            //console.log('not logged in. refusing to get ',path)
            setLoggedIn(false)
            var promise1 = new Promise(function(resolve, reject) {
                resolve(undefined);});
            return promise1;
        }
    }

    function postJSON(path, data, skipToken) {
        
        if (accessToken || skipToken===true) {
            var headers={   'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}
            if (!skipToken) {
                headers.authorization=accessToken
            }
            return fetch(serverurl+'/'+path, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(result=>handleFetchErrors(result))
                .then(result=> { return result })
        } else {
            setLoggedIn(false)
            var promise1 = new Promise(function(resolve, reject) {
                resolve(undefined);});
            return promise1;
        }
    }
    
    function spotifyAuth() {
        var newurl=serverurl+"/spotify_auth"
        console.log(newurl)
        //window.open(newurl);
        window.location.href=newurl
    }  

    function loginResult(response) {

        if (response && response.hasOwnProperty('access_token')) { 
            console.log('login response', response)
            setAccessToken(response.access_token)
            setStreamToken(response.access_token)
            setUserInTimeout(false)
            setLoggedIn(true)
            return response 
        } else if ( response && response.hasOwnProperty('status') && response.status === 451 ) {
            setUserInTimeout(true)
        }
        setLoggedIn(false)
        return null
    }

    function login(user, password) {
        console.log('Logging in as user',user)
        var data={"user":user, "password": password}
  	    return postJSON('login',data, true)
 		            .then(result=>loginResult(result))
                    .then(result=>setTokenStorage(user, result))
    }

    function checkToken() {
        setRefreshToken(getStorage('refresh_token'))
        setUser(getStorage('user'))
        var data={"user":getStorage('user'), "refresh_token": getStorage('refresh_token')}
  	    return postJSON('auth', data, true)
 		            .then(result=>loginResult(result))
                    .then(result=>setTokenStorage(getStorage('user'), result))
    }


    function logout() {

        setAccessToken(undefined)
        setRefreshToken(undefined)
        localStorage.setItem("access_token", undefined)
        localStorage.setItem("refresh_token", undefined)

        console.log('Logging out user',user)
        var data={"user":user, "refresh_token": refreshToken}
  	    postJSON('logout',data)
 		            .then(result=>loginResult(result))
                    //.then(result=>setTokenStorage(user, result))

    }

    function setTokenStorage(user, newTokens) {
        if (newTokens) {
            if (newTokens.hasOwnProperty('access_token')) {
                localStorage.setItem("access_token", newTokens.access_token)
                setAccessToken(newTokens.access_token)
            }
            if (newTokens.hasOwnProperty('refresh_token')) {
                localStorage.setItem("refresh_token", newTokens.refresh_token)
                setRefreshToken(newTokens.refresh_token)
            }
            localStorage.setItem("user", user)
            setUser(user)
            if (newTokens.access_token && newTokens.refresh_token && !loggedIn) { setLoggedIn(true) }
        }
        return newTokens
    }
    
    function getStorage(item) {
        return localStorage.getItem(item)
    }
    
    return (
        <NetworkContext.Provider
            value={{
                connectError: connectError,
                streamConnected: streamConnected,
                streamStatus: streamStatus,
                getJSON: getJSON,
                postJSON: postJSON,
                addSubscriber: addSubscriber,
                spotifyAuth: spotifyAuth,
                connectStream: connectStream,
                online: online,
                getStorage: getStorage,
                login: login,
                logout: logout,
                user: user,
                refreshToken: refreshToken,
                accessToken: accessToken,
                loggedIn: loggedIn,
                checkToken: checkToken,
                userInTimeout: userInTimeout,
            }}
        >
            {props.children}
        </NetworkContext.Provider>
    )
}