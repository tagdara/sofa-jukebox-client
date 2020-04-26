import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from './NetworkProvider';

export const DataContext = createContext();

export const dataReducer = (state, data) => {
    
    if (data==={}) { return state }
    
    var newstate={...state}

        if (data.hasOwnProperty('nowplaying')) {
            newstate={...newstate, nowPlaying: data.nowplaying}
        }
        if (data.hasOwnProperty('user')) {
            newstate={...newstate, userQueue: data.user}
        }
        if (data.hasOwnProperty('backup')) {
            newstate={...newstate, backupQueue: data.backup}
        }
        if (data.hasOwnProperty('previous')) {
            newstate={...newstate, previousPicks: data.previous}
        }
        if (data.hasOwnProperty("searchResults")) {
            newstate={...newstate, searchResults: data.searchResults}  
        }
 
        if (data.hasOwnProperty('playlist')) {
            if (data.playlist==='update') {
                // TODO GET THE NEW LIST or fix the server to send the data
                console.log('Need to download the new list when this happens')
            } else if (data.playlist==='pop') {
                if (state.userQueue.length>0) {
                    var newUserQueue=[...state.userQueue]
                    newUserQueue.shift()
                    newstate={...newstate, userQueue: newUserQueue}
                } else if (state.backupQueue.length>0) {
                    var newBackupQueue=[...state.backupQueue]
                    newBackupQueue.shift()
                    newstate={...newstate, backupQueue: newBackupQueue}
                } else {
                    console.log('Requested pop with no tracks', state.userQueue, state.backupQueue)
                }
            }
        }
    return newstate
}


export default function DataProvider(props) {
    
    const initialState={"userQueue": [], "backupQueue": [], "nowPlaying": {}, "previousPicks": [], "searchResults": [] }
    
    const [ data, dataDispatch] = useReducer(dataReducer, initialState);
    const { getJSON,addSubscriber } = useContext(NetworkContext);
    const [ user, setUser ]=useState({})
    const [ listMode, setListMode ]=useState('queue')
    const [ searchText, setSearchText ]=useState('')
    const [ playlists, setPlaylists]=useState([])
    
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
        getJSON('playlists').then(result=>setPlaylists(result))
        // eslint-disable-next-line 
    }, []);

    function search(text) {
        setSearchText(text)
        setListMode('search')
        if (text.length<1) {
            dataDispatch({"searchResults": []})
        } else {
            getJSON('search/'+text).then(result=>dataDispatch({"searchResults": result }))
        }
    };  
    
    function checkTrackInQueue(id) {
        for (var i = 0; i < data.userQueue.length; i++) {
            if (data.userQueue[i].id===id) {
                return 'user'
            }
        }
        for (i = 0; i < data.backupQueue.length; i++) {
            if (data.backupQueue[i].id===id) {
                return 'backup'
            }
        }
        return false
    }
    
    function checkPrevious(id) {
        for (var i = 0; i < data.previousPicks.length; i++) {
            if (data.previousPicks[i].id===id) {
                return data.previousPicks[i].count
            }
        }
        return 0
    }

    function setBackupList(playlist) {
        getJSON('setbackup/'+playlist).then(result=>dataDispatch({"backup":result}))
    //    setBackup(true)
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
        getJSON('backup/shuffle').then(result=>dataDispatch({"backup":result}))
        setListMode('queue')
    }   
    
    function promoteTrack(id) {
        console.log('Promoting track',id)
        getJSON('promote/'+id).then(result=>dataDispatch(result))
    }

    function superPromoteTrack(id) {
        console.log('Super promoting track',id)
        getJSON('superpromote/'+id).then(result=>dataDispatch(result))
    }   
    
    function addTrackToPlaylist(id, playlistid) {
        console.log('Adding track to playlist',id, playlistid)
        getJSON('addtoplaylist/'+id+"/"+playlistid).then(result=>dataDispatch(result))
    }
    
    return (
        <DataContext.Provider
            value={{
                listMode: listMode,
                setListMode: setListMode,
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
                checkPrevious: checkPrevious,
                
                searchResults: data.searchResults,
                searchText: searchText,
                setSearchText: setSearchText,
                search: search,
                
                checkTrackInQueue: checkTrackInQueue,
                
                playlists: playlists,
                addTrackToPlaylist: addTrackToPlaylist,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
    
