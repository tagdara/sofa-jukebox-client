import React, {useContext, useEffect, createContext, useReducer } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { NetworkContext } from 'network/NetworkProvider';
import { PlaylistContext } from 'playlist/PlaylistProvider';

export const NowPlayingContext = createContext();

export const dataReducer = (state, data) => {
    
    if (data===null || data==={}) { return state }
    
    var newstate={...state}

        if (data.hasOwnProperty('nowplaying')) {
            newstate={...newstate, nowPlaying: data.nowplaying}
        }
        if (data.hasOwnProperty('device')) {
            newstate={...newstate, device: data.device}
        }
        if (data.hasOwnProperty('devices')) {
            newstate={...newstate, devices: data.devices}
        }

    return newstate
}


export default function NowPlayingProvider(props) {
    
    const initialState = { "nowPlaying": {}, "device": {}, "devices": [] }
    
    const [ data, dataDispatch] = useReducer(dataReducer, initialState);
    const { addTrackToPlaylist, playlistName } = useContext(PlaylistContext);
    const { setListMode, setSnackbarMessage, setShowSnackbar } = useContext(LayoutContext);
    const { getJSON, addSubscriber } = useContext(NetworkContext);
    
    useEffect(() => {
       addSubscriber(dataDispatch)
    // eslint-disable-next-line 
    }, []);
    
    useEffect(() => {
        getJSON('nowplaying').then(result=>dataDispatch(result))
        // eslint-disable-next-line 
    }, []);

    function pickDevice(device) {
        console.log('setting device', device)
        getJSON('set_device/'+device).then(result=>console.log(result))
        setListMode('queue')
    }
    
    function refreshView() {
        getJSON('nowplaying').then(result=>dataDispatch(result))
    }
    
    function playbackControl(command, value) {
        console.log('sending', command)
        if (value) { command = command+"/"+value }
        getJSON(command).then( result=> {  dataDispatch(result) } )

    }
    
    function addThisTrackToPlaylist(playlist) {
        addTrackToPlaylist(data.nowPlaying.id, playlist)
        setListMode("queue") 
        setSnackbarMessage("Added to "+playlistName(playlist))
        setShowSnackbar(true)
    }
   
    const songActive = ( data.nowPlaying && data.nowPlaying.id )
    const isPlaying = ( data.nowPlaying && data.nowPlaying.id && data.nowPlaying.is_playing )
    
    return (
        <NowPlayingContext.Provider
            value={{

                nowPlaying: data.nowPlaying,
                isPlaying: isPlaying,
                songActive: songActive,
                device: data.device,
                devices: data.devices,

                refreshView: refreshView,
                playbackControl: playbackControl,
                pickDevice: pickDevice,
                addThisTrackToPlaylist: addThisTrackToPlaylist,

            }}
        >
            {props.children}
        </NowPlayingContext.Provider>
    );
}
    
