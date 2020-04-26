import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from '../NetworkProvider';

export const DataContext = createContext();

export const dataReducer = (state, data) => {

    if (data==={}) { return state }
    console.log('data to dispatch', data)
    //switch (data.event.header.name) {
    //    case "Multistate":

    //    default:
    //        return state
    //}

        if (data.hasOwnProperty('nowplaying')) {
            return {...state, nowPlayer: data.nowplaying}
        }
        if (data.hasOwnProperty('playlist')) {
            console.log('TTTTTTTTTTTTTTTTTTT Has playlist!!', data.playlist)
            if (data.playlist==='update') {
                console.log('TTTTTTTTTTTTTTTTTTT its an update!!', data.playlist)
            //    getJSON('queue').then(splitQueue)
            } else if (data.playlist==='pop') {
            //    popQueue()
            }
        }
    return state
}


export default function DataProvider(props) {
    
    const initialState={"userQueue": [], "backupQueue": [], "nowPlaying": {}, "previousPicks": [] }
    const [data, dataDispatch] = useReducer(dataReducer, initialState);
    const { getJSON, loggedIn, addSubscriber } = useContext(NetworkContext);
    const [ user, setUser ]=useState(undefined)
    const [ listMode, setListMode ]=useState('queue')    
    
    useEffect(() => {
       addSubscriber(dataDispatch)
    // eslint-disable-next-line 
    }, []);
    
    useEffect(() => {  
        getJSON('user').then(setUser)
        // eslint-disable-next-line 
    }, [])   
    
    useEffect(() => {
        getJSON('queue').then(result=>dataDispatch(result))    
        getJSON('nowplaying').then(result=>dataDispatch(result))
        getJSON('playlists').then(result=>dataDispatch(result))
        //getJSON('queue').then(splitQueue)    
        //getJSON('nowplaying').then(setNowPlaying)
        //getJSON('playlists').then(setUserPlaylists)    
    }, []);
    
    function popQueue() {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX popqueue!!')
        var newqueue=[]
        if (userQueue.length>0) {
            console.log('userqueue gonna pop',userQueue[0])
            newqueue=[...userQueue]
            //newqueue=[...refUserQueue.current]
            var poptrack=newqueue.shift()
            console.log('poptrack',poptrack)
            setUserQueue(newqueue)     
            console.log('user queue now', newqueue)
        } else if (backupQueue.length>0) {
            console.log('backup queue gonna pop',backupQueue[0])
            //newqueue=[...refBackupQueue.current]
            newqueue=[...backupQueue]
            newqueue.shift()
            setBackupQueue(newqueue)    
            console.log('backup queue now', backupQueue)
        } else {
            console.log('No queue to pop', userQueue, backupQueue)
        }
    }    
    
        
    function splitQueue(queuedata) {
        console.log('splitting queue from', queuedata)
        setUserQueue(queuedata.user)
        setBackupQueue(queuedata.backup)
        setPreviousPicks(queuedata.previous)
    }
    
    function setBackupList(playlist) {
        getJSON('setbackup/'+playlist).then(result=>console.log(result))
        setBackup(true)
        setListMode('queue')
    }
    
    function pickDevice(device) {
        getJSON('set_device/'+device).then(result=>console.log(result))
    }
    
    function refreshView() {
        getJSON('user').then(setUser)
        getJSON('nowplaying').then(result=>dataDispatch(result))
    }
    
    function playbackControl(command) {
        console.log('sending', command)
        getJSON(command).then(result=>dataDispatch(result))
    }
    
    function removeTrack(id) {
        console.log('Removing track',id)
        getJSON('del/'+id).then(result=>dataDispatch(result))
    }
    
    function addTrack(id) {
        getJSON('add/'+id).then(result=>dataDispatch(result))
    }
    
    function shuffleBackupList() {
        console.log('Shuffling backup tracks')
        getJSON('backup/shuffle').then(result=>dataDispatch(result))
    }   
    
    function promoteTrack(id) {
        console.log('Promoting track',id)
        getJSON('promote/'+id).then(result=>dataDispatch(result))
    }

    function superPromoteTrack(id) {
        console.log('Super promoting track',id)
        getJSON('superpromote/'+id).then(result=>dataDispatch(result))
    }   
    
    return (
        <DataContext.Provider
            value={{
                userQueue: data.userQueue,
                backupQueue: data.backupQueue,
                nowPlaying: data.nowPlaying,
                previousPicks: data.previousPicks,
                user: user,
                setBackupList: setBackupList,
                refreshView: refreshView,
                playbackControl: playbackControl,
                addTrack: addTrack,
                removeTrack: removeTrack,
                pickDevice: pickDevice,
                
                shuffleBackupList: shuffleBackupList,
                promoteTrack: promoteTrack,
                superPromoteTrack: superPromoteTrack,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
    
