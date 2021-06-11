import React, { useContext, useEffect, createContext, useReducer } from 'react';
import { NetworkContext } from 'network/NetworkProvider';
import { LayoutContext } from 'layout/LayoutProvider';

export const QueueContext = createContext();

export const queueReducer = (state, data) => {
    
    if (data===null || data==={}) { return state }
    
    var newstate={...state}
    
    if (data.hasOwnProperty('user')) {
        newstate={...newstate, user: data.user}
    }
    if (data.hasOwnProperty('backup')) {
        newstate={...newstate, backup: data.backup}
    }

    if (data.hasOwnProperty('playlist')) {
        if (data.playlist==='update') {
            // TODO GET THE NEW LIST or fix the server to send the data
            console.log('Need to download the new list when this happens')
        } else if (data.playlist==='pop') {
            if (state.user.tracks && state.user.tracks.length>0) {
                var newUserTracks=[...state.user.tracks]
                newUserTracks.shift()
                newstate = {...newstate, user: {...newstate.user, tracks: newUserTracks } }
            } else if (state.backup.tracks && state.backup.tracks.length>0) {
                var newBackupTracks=[...state.backup.tracks]
                newBackupTracks.shift()
                newstate = {...newstate, backup: {...newstate.backup, tracks: newBackupTracks } }
            } else {
                console.log('Requested pop with no tracks', state.user, state.backup)
            }
        }
    }
    return newstate
}


export default function QueueProvider(props) {
    
    const initialState={ "user": {}, "backup": {}, "preview": {} }
    const [ data, dataDispatch] = useReducer(queueReducer, initialState);
    const { getJSON, addSubscriber } = useContext(NetworkContext);
    const { setListMode } = useContext(LayoutContext);
    
    useEffect(() => {
        addSubscriber(dataDispatch)
    // eslint-disable-next-line 
    }, []);
    
    useEffect(() => {
        getJSON('queue').then(result=>dataDispatch(result))    
        // eslint-disable-next-line 
    }, []);

    function checkTrackInQueue(id) {
        if (data.user.tracks) {
            for (var i = 0; i < data.user.tracks.length; i++) {
                if (data.user.tracks[i].id===id) {
                    return 'user'
                }
            }
        }
        if (data.backup.tracks) {
            for (i = 0; i < data.backup.tracks.length; i++) {
                if (data.backup.tracks[i].id===id) {
                    return 'backup'
                }
            }
        }
        return false
    }

    function setBackupList(playlist) {
        getJSON('setbackup/'+playlist).then(result=>dataDispatch({"backup":result}))
        setListMode('queue')
    }

    function removeTrack(id) {
        console.log('Removing track',id)
        getJSON('del/'+id).then(result=>dataDispatch(result))
    }
    
    function addTrack(id) {
        getJSON('add/'+id).then(result=>dataDispatch(result))

    }
    
    function addRadioTracks(id) {
        getJSON('radio/'+id).then(result=>dataDispatch(result))
        setListMode('queue')

    }

    function clearQueue(id) {
        getJSON('queue/clear').then(result=>dataDispatch(result))
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

    const emptyUserQueue = !(data && data.user && data.user.tracks && data.user.tracks.length > 0)
    const emptyBackupQueue = !(data && data.backup && data.backup.tracks && data.backup.tracks.length > 0)

    const emptyQueue = emptyUserQueue && emptyBackupQueue
    
    return (
        <QueueContext.Provider
            value={{
                addRadioTracks: addRadioTracks,
                addTrack: addTrack,
                backupQueue: data.backup,
                checkTrackInQueue: checkTrackInQueue,
                clearQueue: clearQueue,
                emptyQueue: emptyQueue,
                promoteTrack: promoteTrack,
                removeTrack: removeTrack,
                setBackupList: setBackupList,
                shuffleBackupList: shuffleBackupList,
                superPromoteTrack: superPromoteTrack,
                userQueue: data.user,
            }}
        >
            {props.children}
        </QueueContext.Provider>
    );
}
    
