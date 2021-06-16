import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';

import { LayoutContext } from 'layout/LayoutProvider';
import { NetworkContext } from 'network/NetworkProvider';

import SearchProvider from 'search/SearchProvider';
import SpeakerProvider from 'speaker/SpeakerProvider';
import NowPlayingProvider from 'nowPlaying/NowPlayingProvider';
import PlaylistProvider from 'playlist/PlaylistProvider';
import QueueProvider from 'queue/QueueProvider';
import UserProvider from 'user/UserProvider';
import Login from 'user/Login';

import MobileFrame from 'frame/MobileFrame'
import WideFrame from 'frame/WideFrame'
import FrameSnackbar from 'frame/FrameSnackbar'

const useStyles = makeStyles(theme => ({
    wideGrid: {
        width: "100%",
        maxWidth: 1400,
        display: "flex",
        margin: "0 auto",
        padding: 0,
        height: "100%",
        flexDirection: "row",
    },
    mobileGrid: {
        flexWrap: "nowrap",
        width: "100%",
        maxWidth: 480,
        display: "flex",
        margin: "0 auto",
        padding: 0,
        height: "100%",
        flexDirection: "column",
    },

}));

export default function MainPage() {

    const classes = useStyles();  
    const { isWide } = useContext(LayoutContext);
    const { loggedIn} = useContext(NetworkContext)

    return (
        loggedIn ? 
                    <UserProvider>
                        <PlaylistProvider>
                            <NowPlayingProvider>
                                <SpeakerProvider>
                                    <QueueProvider>
                                        <SearchProvider>
                                            <Grid container spacing={0} className={isWide ? classes.wideGrid : classes.mobileGrid} >
                                                { !isWide ?
                                                    <MobileFrame />
                                                :
                                                    <WideFrame />
                                                }
                                                <FrameSnackbar />
                                            </Grid>
                                            <CssBaseline />
                                        </SearchProvider>
                                    </QueueProvider>
                                </SpeakerProvider>
                            </NowPlayingProvider>
                        </PlaylistProvider>
                    </UserProvider>
        :
            <Login />
    );
}


