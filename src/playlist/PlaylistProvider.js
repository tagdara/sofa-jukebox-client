import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { NetworkContext } from 'network/NetworkProvider';
import { UserContext } from 'user/UserProvider';

export const PlaylistContext = createContext();

export const dataReducer = (state, data) => {
    
    if (data===null || data==={}) { return state }
    
    var newstate={...state}

        if (data.hasOwnProperty('preview')) {
            newstate={...newstate, preview: data.preview}
        } 

    return newstate
}


export default function PlaylistProvider(props) {
    
    const initialState={ "preview": [] }
    
    const [ data, dataDispatch] = useReducer(dataReducer, initialState);
    const { spotifyUser } = useContext(UserContext)
    const { setListMode, setSnackbarMessage } = useContext(LayoutContext);
    const { getJSON, addSubscriber } = useContext(NetworkContext);
    const [ playlists, setPlaylists ]=useState([])

    const ownedPlaylists = getOwnedPlaylists()
    
    useEffect(() => {
       addSubscriber(dataDispatch)
    // eslint-disable-next-line 
    }, []);
    
    useEffect(() => {
        getJSON('playlists').then( result => setPlaylists(sortName(result)) )
        // eslint-disable-next-line 
    }, []);


    function choosePreview(playlist) {
        getJSON('setpreview/'+playlist).then(result=>dataDispatch({"preview":result}))
        setListMode('preview')
    }

    function addTrackToPlaylist(id, playlistid) {
        console.log('Adding track to playlist',id, playlistid)
        getJSON('addtoplaylist/'+id+"/"+playlistid).then(result=>dataDispatch(result))
    }
    
    function getOwnedPlaylists() {
        var owned=[]
        for (var i = 0; i < playlists.length; i++) {
            if (playlists[i].owner===spotifyUser.id) {
                owned.push(playlists[i])
            }
        }
        return sortName(owned)
    }
    
    function playlistName(id) {
        for (var i = 0; i < playlists.length; i++) {
            if (playlists[i].id===id) {
               return playlists[i].name
            }
        }
    }
    
    function addThisTrackToPlaylist(playlist) {
        addTrackToPlaylist(data.nowPlaying.id, playlist)
        setListMode("queue") 
        setSnackbarMessage("Added to "+playlistName(playlist))
    }

    function sortName(itemlist) {
        var newlist=[...itemlist]
        newlist.sort(function(a, b) {
            var keyA = (a.name),
            keyB = (b.name);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        return newlist
    }    

    return (
        <PlaylistContext.Provider
            value={{                
                addTrackToPlaylist: addTrackToPlaylist,
                addThisTrackToPlaylist: addThisTrackToPlaylist,

                choosePreview: choosePreview,
                ownedPlaylists: ownedPlaylists,                
                playlists: playlists,
                preview: data.preview,
                playlistName: playlistName,

            }}
        >
            {props.children}
        </PlaylistContext.Provider>
    );
}
    
