import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import teal from '@material-ui/core/colors/teal';

const LightTheme = createMuiTheme({
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
        admin: {
            light: teal[500],
            main: teal[700],
            dark: teal[900],
        },
        text: {
            primary: "#000",
            backupQueue: "#909090",
        },
        background: {
            default: "#eee",
            page: "#ddd",
            userTrack: "rgba(188, 54, 12, 0.5)",
            hover: "rgba(188, 54, 12, 0.1)",
            paper: "#ccc",
            lowButton: "#ddd",
            header: "#ddd",
            headerHighlight: deepOrange[400],
            mediumButton: deepOrange[900],
            playPause: deepOrange[1100],
        },
        type: "light",
    }
});

export default LightTheme
