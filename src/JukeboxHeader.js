import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';

import SongTop from './SongTop';

import SearchBox from './SearchBox';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipIcon from '@material-ui/icons/SkipNext';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({

    headerBlock: {
        maxHeight: 480,
        maxWidth: 480,
        minWidth: 320,
        padding: 8,
        margin: 4,
        backgroundColor: theme.palette.primary.mediumDark,
        borderRadius: 4,
        boxSizing: "border-box",
        zIndex: 10,
        boxShadow: "inset 0 -50px 100px 100px #111, inset 0 -50px 100px 100px #FF4500; ",
        flexGrow: 1,
    },
    buttonGrid: {
        paddingTop: 8,
        display: "flex",
        alignItems: "center",
        paddingBottom: 4,
    },
    buttonMargin: {
        marginLeft: 4,
    },
    buttonSpacer: {
        flexGrow: 1,
    },
}));

export default function JukeboxHeader(props) {
    
    const classes = useStyles();
    const { nowPlaying, playbackControl } = useContext(DataContext);
    const [ songView, setSongView]=useState('large')
    const ios=navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    
    function toggleSearch() {
        if (props.listMode==='search') {
            setSongView('large')
            props.setListMode('queue')
        } else {
            if ( window.innerWidth < 480 || ios) {
                setSongView('small')
            }
            props.setListMode('search')
        }
    }
    
    function toggleUser() {
        if (props.listMode==='actions') {
            setSongView('large')
            props.setListMode('queue')
        } else {
            setSongView('small')
            props.setListMode('actions')
        }
    }    
    
    function changeSongView() {
        if ( songView==="small" ) {
            setSongView("large")
        } else if ( songView==="large" ) {
            setSongView("small")
        }
    }
    
    return (
        <div className={classes.headerBlock} >
            <SongTop large={songView==="large"} nowPlaying={nowPlaying} changeSongView={changeSongView} />
            <div className={classes.buttonGrid}>
                { props.listMode==='search' ?
                    <SearchBox toggleSearch={toggleSearch} searchText={props.searchText} setSearchText={props.setSearchText} search={props.search} setListMode={props.setListMode} />
                :
                <>
                        <IconButton color="secondary" 
                                    variant="contained" 
                                    onClick={() => toggleSearch()}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton color="secondary" 
                                    className={classes.buttonMargin}
                                    variant="contained" onClick={() => toggleUser()}>
                            <SettingsIcon />
                        </IconButton>

                        <div className={classes.buttonSpacer}></div>
                        { nowPlaying.is_playing ?
                            <IconButton variant="contained" color="secondary" 
                                        className={classes.buttonMargin} onClick={() => playbackControl('pause')}>
                                <PauseIcon />
                            </IconButton>
                        :
                            <IconButton variant="contained" color="secondary" 
                                        className={classes.buttonMargin} onClick={() => playbackControl('play')}>
                                <PlayIcon />
                            </IconButton>
                        }
                        { (nowPlaying && nowPlaying.id) &&
                            <IconButton  variant="contained" color="secondary" className={classes.buttonMargin} onClick={() => playbackControl('next')}><SkipIcon /></IconButton>
                        }
                </>
                }
            </div>
        </div>
    )
}


