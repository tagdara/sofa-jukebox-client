import React, {useContext, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from 'network/NetworkProvider';

export const DisplayContext = createContext();

export const dataReducer = (state, data) => {
    
    if (data===null || data==={}) { return state }
    
    var newstate={...state}

    if (data.hasOwnProperty('display')) {
        newstate={...newstate, display: data.display}
    } 

    return newstate
}


export default function DisplayProvider(props) {
    
    const initialState={ "display": {} }
    
    const [ data, dataDispatch] = useReducer(dataReducer, initialState);
    const { getJSON, addSubscriber } = useContext(NetworkContext);
    
    useEffect(() => {
       addSubscriber(dataDispatch)
    // eslint-disable-next-line 
    }, []);
    
    function displayCommand(cmd) {
        getJSON('display/'+cmd)
    }

    return (
        <DisplayContext.Provider
            value={{
                displayCommand: displayCommand,
                display: data.display,
            }}
        >
            {props.children}
        </DisplayContext.Provider>
    );
}
    
