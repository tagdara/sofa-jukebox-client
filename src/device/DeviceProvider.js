import React, {useContext, useEffect, createContext, useReducer } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { NetworkContext } from 'network/NetworkProvider';

export const DeviceContext = createContext();

export const dataReducer = (state, data) => {
    
    if (data===null || data==={}) { return state }
    
    var newstate={...state}

        if (data.hasOwnProperty('device')) {
            newstate={...newstate, device: data.device}
        }
        if (data.hasOwnProperty('devices')) {
            newstate={...newstate, devices: data.devices}
        }

    return newstate
}


export default function DeviceProvider(props) {
    
    const initialState = { "device": {}, "devices": [] }
    
    const [ data, dataDispatch] = useReducer(dataReducer, initialState);
    const { setListMode } = useContext(LayoutContext);
    const { getJSON, addSubscriber } = useContext(NetworkContext);
    
    useEffect(() => {
       addSubscriber(dataDispatch)
    // eslint-disable-next-line 
    }, []);
    
    useEffect(() => {
        getJSON('devices').then(result=>dataDispatch(result))
        // eslint-disable-next-line 
    }, []);

    function pickDevice(device) {
        console.log('setting device', device)
        getJSON('set_device/'+device).then(result=>console.log(result))
        setListMode('queue')
    }
    
    function refreshDevices() {
        getJSON('devices').then(result=>dataDispatch(result))
    }


    return (
        <DeviceContext.Provider
            value={{
                device: data.device,
                devices: data.devices,
                pickDevice: pickDevice,
                refreshDevices: refreshDevices,
            }}
        >
            {props.children}
        </DeviceContext.Provider>
    );
}
    
