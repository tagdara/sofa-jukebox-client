import React, { useState, createContext } from 'react';
import DarkTheme from 'theme/DarkTheme'
import LightTheme from 'theme/LightTheme'

export const JukeboxThemeContext = createContext();

export default function JukeboxThemeProvider(props) {
    
    const themes={"dark":DarkTheme, "light":LightTheme}
    const defaultTheme = "dark"
    const savedTheme = getStorage('themeName')
    const [themeName, setThemeName] = useState(savedTheme ? savedTheme : defaultTheme)

    function getStorage(item) {
        var value = localStorage.getItem(item)
        if (value === "null") { console.log(item, 'is null', value); value = null }
        return value
    }

    function changeTheme(name) {
        if (!name || !themes.hasOwnProperty(name)) {
            if (themeName === "dark") {
                name = "light"
            } else {
                name = "dark"
            }
        }
        
        setThemeName(name)
        localStorage.setItem("themeName", name)


    }

    const theme = themes[themeName]

    return (
        <JukeboxThemeContext.Provider
            value={{
                theme: theme,
                themeName: themeName,
                changeTheme: changeTheme,
            }}
        >
            {props.children}
        </JukeboxThemeContext.Provider>
    )
}