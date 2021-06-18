import React, { useContext, useEffect, createContext, useReducer } from 'react';
import { NetworkContext } from 'network/NetworkProvider';

export const SpeakerContext = createContext();

export const speakerReducer = (state, data) => {

    if (data===null || data==={}) { return state }

    if (data.hasOwnProperty('speakers')) {
        var newstate={...state}
        newstate={...newstate, speakers: data.speakers }
        return newstate
    }

    return state
}


export default function SpeakerProvider(props) {
    
    const initialState={ "speakers": [] }
    const [ speakerData, speakerDispatch] = useReducer(speakerReducer, initialState);
    const { getJSON, postJSON, addSubscriber } = useContext(NetworkContext);
    
    useEffect(() => {
        addSubscriber(speakerDispatch)
    // eslint-disable-next-line 
    }, []);
    
    useEffect(() => {
        getJSON('speakers').then(result=>speakerDispatch(result))    
        // eslint-disable-next-line 
    }, []);


    function changeInput(id, inp) {
        postJSON('speakers/input', {"id": id, "value": inp}).then(result=> { console.log(result); speakerDispatch(result) })    
    }
    
    function changePower(id, power) {
        postJSON('speakers/power', {"id": id, "value": power}).then(result=> { console.log(result); speakerDispatch(result) })    
    }

    function changeVolume(id, volume) {
        postJSON('speakers/volume', {"id": id, "value": volume}).then(result=> { console.log(result); speakerDispatch(result) })    
    }

    function changeMaxVolume(id, volume) {
        postJSON('speakers/volume_max', {"id": id, "value": volume}).then(result=> { console.log(result); speakerDispatch(result) })    
    }

    return (
        <SpeakerContext.Provider
            value={{
                changeInput: changeInput,
                changePower: changePower,
                changeMaxVolume: changeMaxVolume,
                changeVolume: changeVolume,
                speakers: speakerData.speakers
            }}
        >
            {props.children}
        </SpeakerContext.Provider>
    );
}
    
