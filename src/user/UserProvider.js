import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from 'network/NetworkProvider';

export const UserContext = createContext();

export const userReducer = (state, data) => {
    
    if (data===null || data==={}) { return state }
    if (data.hasOwnProperty('users')) {
        var newstate={...state, users: data.users}
        return newstate
    }
    return state
}

export default function UserProvider(props) {
    
    const initialState={ "users": [] }
    
    const [ userData, userDispatch] = useReducer(userReducer, initialState);
    const { getJSON, addSubscriber, logout, user } = useContext(NetworkContext);
    const [ spotifyUser, setSpotifyUser ]=useState({})

    function isAdmin() {
        var matchingUsers = userData.users.filter(userObj => userObj.name.toLowerCase() === user.toLowerCase())
        if (matchingUsers.length<1) return false
        return matchingUsers[0].admin
    }

    function inTimeout() {
        var matchingUsers = userData.users.filter(userObj => userObj.name.toLowerCase() === user.toLowerCase())
        if (matchingUsers.length < 1) return false
        return matchingUsers[0].timeout
    }


    useEffect(() => {
       addSubscriber(userDispatch)
    // eslint-disable-next-line 
    }, []);
    
    useEffect(() => {  
        getJSON('spotify_user').then(setSpotifyUser)
        getJSON('users').then(result => userDispatch({"users": result }))
        // eslint-disable-next-line 
    }, [])   
    
    function userById(id) {
        var matchingUsers = userData.users.filter(user => user.id === id)
        return matchingUsers.length>0 ? matchingUsers[0] : {}
    }

    function refreshUserData() {
        getJSON('spotify_user').then(setSpotifyUser)
        getJSON('users').then(result => userDispatch({"users": result }))
    }

    return (
        <UserContext.Provider
            value={{
                logout: logout,
                userById: userById,
                refreshUserData: refreshUserData,
                spotifyUser: spotifyUser,
                setSpotifyUser: setSpotifyUser,
                user: user,
                isAdmin: isAdmin,
                inTimeout: inTimeout,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
    
