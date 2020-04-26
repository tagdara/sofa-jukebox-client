import React, {useState, useEffect, createContext} from 'react';

const serverurl="https://"+window.location.hostname;

export const useStream = () => {
    const [eventSource, setEventSource] = useState(undefined)
    //const [connected, setConnected] = useState(false);
    const [subscribers, setSubscribers] = useState([])
    const [isConnecting, setIsConnecting] = useState(false)
    
    const addSubscriber = (subscriber) => {
        // to see why this is needed for the closure issue
        // https://stackoverflow.com/questions/58193166/usestate-hook-setter-incorrectly-overwrites-state
        setSubscribers((subscribers) => ([...subscribers, subscriber] ));
    };
    
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
            var esource=new EventSource(serverurl+"/sse")
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

        if (!unmounted && !isConnecting && streamStatus!==1) {
            connectStream()
        }
            
        return () => {
            unmounted = true;
        };
    // eslint-disable-next-line    
    }, [ subscribers, isConnecting, streamConnected, streamStatus]);
    
    return { streamConnected, streamStatus, addSubscriber, connectStream };
};

export const NetworkContext = createContext();

export default function NetworkProvider(props) {

    const [connectError, setConnectError] = useState(false);
    const [ online, setOnline] = useState(false);
    const { streamConnected, streamStatus, addSubscriber, connectStream } = useStream([])

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
        
    }, []);


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
            return { "error": response.statusText }
        }
        //setLoggedIn(true)
        setConnectError(false)
        return response.json()
    }
    
    function getJSON(path) {
        return fetch(serverurl+"/"+path, { method: 'GET' })
            .then(result=>handleFetchErrors(result))
    }

    function postJSON(path, data) {

        return fetch(serverurl+'/'+path, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(result=>handleFetchErrors(result))
            .then(result=> { return result })
    }
    
    function auth() {
        var newurl=serverurl+"/auth"
        console.log(newurl)
        //window.open(newurl);
        window.location.href=newurl
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
                auth: auth,
                connectStream: connectStream,
                online: online
            }}
        >
            {props.children}
        </NetworkContext.Provider>
    )
}