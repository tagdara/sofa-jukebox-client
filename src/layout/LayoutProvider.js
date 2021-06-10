import React, { useState, createContext } from 'react';
import { use100vh } from 'react-div-100vh'

export const LayoutContext = createContext();

export default function LayoutProvider(props) {

    const wideBreakpoint = 960
    const isWide = window.innerWidth > wideBreakpoint;
    const height = use100vh()
    const [ headerHeight, setHeaderHeight]=useState(0)
    const halfHeight = height ? height / 2 : '50vh' 
    const heights={ headerHeight: headerHeight, blockHeight: isWide ? height : halfHeight, bodyHeight: height-headerHeight-5, scrollHeight: isWide ? height - 64 : halfHeight, halfHeight: halfHeight, height: height }
    const ios = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)    
    const [ showSearch, setShowSearch ]=useState(true)
    const [ listMode, setListMode ]=useState('queue')
    const [ snackbarMessage, setSnackbarMessage]=useState("")
    const [ showSnackbar, setShowSnackbar]=useState(false)

    return (
        <LayoutContext.Provider
            value={{
                isWide: isWide,
                heights: heights,
                ios: ios,
                showSearch: showSearch,
                setShowSearch: setShowSearch,
                setHeaderHeight: setHeaderHeight,

                listMode: listMode,
                setListMode: setListMode,
                setSnackbarMessage: setSnackbarMessage,
                snackbarMessage: snackbarMessage,
                showSnackbar: showSnackbar,
                setShowSnackbar: setShowSnackbar,

            }}
        >
            {props.children}
        </LayoutContext.Provider>
    )
}