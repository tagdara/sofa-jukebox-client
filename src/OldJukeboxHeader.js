import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchBox from './SearchBox';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipIcon from '@material-ui/icons/SkipNext';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({

    mobileTopbar: {
        marginTop: "env(safe-area-inset-top)",
        minWidth: 320,
        width: "100%",
    },
    desktopTopbar: {
        marginTop: "env(safe-area-inset-top)",
        width: 480,
        left: 0,
        right: "auto",
    },
    barList: {
        paddingLeft:0,
        flexDirection: "column",
    },
    title: {
        paddingTop: 16,
        flexGrow: 1,
    },
    nowplayingBar: {
        height: 96,
        overflow: "hidden",
    },
    square: {
        
        height: 96,
        width: 96,
    },
    nowrap: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    controlBar: {
        height: 48,
    },    
    iconPad: {
        marginLeft:8,
    },  
    artGrid: {
        padding: 0,
    },
    titleGrid: {
        boxSizing: "border-box",
        padding: 0,
    },
    headerGrid: {
        width: "100%",
        padding: 16,
    },
    name: {
        lineHeight: "1.1",
        marginBottom:2,
    },
    searchGrid: {
        padding: 0,
        display: "flex",
    },
    songImageAspect: {
        position: "relative",
        margin: 0,
        width: "100%",
        paddingTop: "100%", /* 1:1 Aspect Ratio */
        maxWidth: 320,
        maxHeight: 320,
    },
    titleAspect: {
        position: "relative",
        margin: 0,
        width: "100%",
        paddingTop: "50%", /* 2:1 Aspect Ratio */
        overflow: "hidden",
        maxWidth: 640,
        maxHeight: 320,
    },
    titleArea: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        top: 0,
        left: 16,
        bottom: 0,
        right: 0,
        maxWidth: "100%",
        maxHeight: "100%",
        minWidth: "100%",
        minHeight: "100%",
    },

    bigcover: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        maxWidth: "100%",
        maxHeight: "100%",
        minWidth: "100%",
        minHeight: "100%",
    },
    buttonGrid: {
        paddingTop: 8,
        paddingBottom: 8,
        display: "flex",
        alignItems: "center",
    },
    playPause: {
        marginLeft: 4,
    },
    buttonSpacer: {
        flexGrow: 1,
        flexBasis: 1,
    }

}));

export default function JukeboxHeader(props) {
    
    const classes = useStyles();
    const mobileBreakpoint = 480;
    const isMobile = window.innerWidth <= mobileBreakpoint;
    
    return (
        <AppBar position="fixed" className={isMobile ? classes.mobileTopbar : classes.desktopTopbar} >
            <Toolbar className={classes.barList} disableGutters>
                <Grid container className={classes.headerGrid} >
                    <Grid item xs={4} className={classes.artGrid} >
                        <div className={classes.songImageAspect} >
                        { props.nowPlaying.art &&
                            <img
                                className={classes.bigcover}
                                src={ props.nowPlaying.art }
                                title={ props.nowPlaying.name }
                                alt={ props.nowPlaying.name }
                            />
                        }
                        </div>
                    </Grid>
                    <Grid item xs={8} className={classes.titleGrid} >
                        <div className={classes.titleAspect} >
                            <div className={classes.titleArea}>
                                <Typography variant="h6" className={classes.name}>{props.nowPlaying.name}</Typography>
                                <Typography variant="subtitle">{props.nowPlaying.artist}</Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonGrid}>
                        <Button disableElevation variant="contained" color="secondary" onClick={() => props.setListMode('previous')}><RecentActorsIcon /></Button>
                        <div className={classes.buttonSpacer}></div>
                        { !props.user.id &&
                            <Button color="inherit" onClick={ () => props.auth() }>Authorize Spotify</Button>
                        }
                        { props.nowPlaying.is_playing ?

                            <Button disableElevation variant="contained" color="secondary" className={classes.playPause} onClick={() => props.playbackControl('pause')}><PauseIcon /></Button>
                        :
                            <Button disableElevation variant="contained" color="secondary" className={classes.playPause} onClick={() => props.playbackControl('play')}><PlayIcon /></Button>
                        }
                        <Button disableElevation variant="contained" color="secondary" className={classes.playPause} onClick={() => props.playbackControl('next')}><SkipIcon /></Button>
                    </Grid>
                    <Grid item xs={12} className={classes.searchGrid} >
                        <SearchBox searchText={props.searchText} setSearchText={props.setSearchText} search={props.search} setListMode={props.setListMode} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}


