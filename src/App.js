import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import NetworkProvider from './NetworkProvider';
import DataProvider from './DataProvider';
import MainPage from './MainPage';
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
    direction: "ltr",
    palette: {
        queue: {
            dark: deepOrange[1100],
        },
        primary: {
            light: deepOrange[400],
            medium: deepOrange[500],
            main: deepOrange[600],
            dark: deepOrange[700],
            mediumDark: grey[900],
            superDark: deepOrange[900]
        },
        secondary: {
            light: deepOrange[500],
            main: deepOrange[700],
            dark: deepOrange[900],
        },
        text: {
            primary: "#c0c0c0",
            backupQueue: "#909090",
        },
        background: {
            default: "#000",
            page: "#111",
            userTrack: "rgba(188, 54, 12, 0.5)",
            promoted: "rgba(188, 54, 12, 0.3)",
            promotedHover: "rgba(188, 54, 12, 0.4)",
            inQueue: "rgba(188, 54, 12, 0.1)",
            hover: "rgba(188, 54, 12, 0.1)",
            paper: "#222",
            lowButton: "#272727",
            mediumButton: deepOrange[900],
            playPause: deepOrange[1100],
        },
        type: "dark",
    }
});



export default function App() {

    return (
        <NetworkProvider>
            <ThemeProvider theme={theme}> 
                <DataProvider>
                    <MainPage />
                    <CssBaseline />
                </DataProvider>
            </ThemeProvider>
        </NetworkProvider>
    );
}


