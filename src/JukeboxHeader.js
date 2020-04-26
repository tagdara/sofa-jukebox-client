import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';

import SearchBox from './SearchBox';
import UserActionsBar from './UserActionsBar';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import Button from '@material-ui/core/Button';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipIcon from '@material-ui/icons/SkipNext';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({

    name: {
        lineHeight: "1.1",
        marginBottom:2,
        color: "#fff",
    },
    searchGrid: {
        padding: 0,
        display: "flex",
    },


    playPause: {
        marginLeft: 4,
    },
    buttonSpacer: {
        flexGrow: 1,
    },
    headerBlock: {
        maxWidth: 480,
        minWidth: 320,
        padding: 16,
        margin: "8px 8px 4px 8px",
        backgroundColor: theme.palette.primary.mediumDark,
        borderRadius: 8,
        boxSizing: "border-box",
        zIndex: 10,
    },
    artGrid: {
        flexGrow: 1,
        padding: 0,
        flexBasis: "30%",
    },
    titleBlock: {
        height: 100,
        overflow: "hidden",
        paddingLeft: 16,
        alignItems: "center",
        display: "flex",
    },
    nowPlaying: {
        display: "flex",
        paddingBottom: 16,
        height: 100,
    },
    buttonGrid: {
        paddingTop: 16,
        display: "flex",
        alignItems: "center",
    },
    cover: {
        height: 100,
        width: 100,
    },
    buttonHighlight: {
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        }
    },
    button: {
        '&:hover': {
            backgroundColor: theme.palette.primary.medium,
        }
    },
    searchBox: {
        height: 100,
        maxWidth: 480,
        margin: "-16px 8px 8px 8px",
        borderRadius: "0px 0px 8px 8px",
        backgroundColor: theme.palette.primary.superDark,
        padding: "16px 8px 8px 8px",
        boxSizing: "border-box",
    },
    slideIn: {
        animation: `$openBar 0.2s forwards`,
        transform: "translateY(-100%)",
    },
    slideOut: {
        animation: `$closeBar 0.2s forwards`,
        height: 0,
        margin: 0,
        padding: 0,
    },
    "@keyframes openBar": {
        "0%": {
            transform: "translateY(-100%)"
        },
        "100%": {
            transform: "translateY(0)"
        }
     },
    "@keyframes closeBar": {
        "0%": {
            transform: "translateY(0)"
        },
        "100%": {
            transform: "translateY(-100%)"
        }
    },
    iconCover: {
        padding: 24,
        height: 100,
        width: 100,
        boxSizing: "border-box",
    },

}));

export default function JukeboxHeader(props) {
    
    const classes = useStyles();
    const { nowPlaying, playbackControl } = useContext(DataContext);
    
    function toggleSearch() {
        if (props.listMode==='search') {
            props.setListMode('queue')
        } else {
            props.setListMode('search')
        }
    }
    
    function toggleUser() {
        if (props.listMode==='previous') {
            props.setListMode('queue')
        } else {
            props.setListMode('previous')
        }
    }    
    
    function barOpen() {
        if (props.listMode==='search' || props.listMode==='previous') { return true}
        return false
    }
    
    return (
        <>
        <div className={classes.headerBlock} >
            { nowPlaying &&
            <div className={classes.nowPlaying} >
                { (nowPlaying && nowPlaying.id) ?
                    <img
                        className={classes.cover}
                        src={ nowPlaying.art }
                        title={ nowPlaying.name }
                        alt={ nowPlaying.name }
                    />
                    : 
                    <QueueMusicIcon className={ classes.iconCover } />
                }
                <div className={ classes.titleBlock } >
                    <div >
                        <Typography variant="h6" className={classes.name}>{(nowPlaying && nowPlaying.id) ? nowPlaying.name : "Not playing"}</Typography>
                        <Typography variant="subtitle1">{nowPlaying.artist}</Typography>
                    </div>
                </div>
                
            </div>
            }
            <div className={classes.buttonGrid}>
                <Button size="small" disableElevation color="secondary" className={props.listMode==='search' ? classes.buttonHighlight : classes.button} variant="contained" onClick={() => toggleSearch()}>
                    <SearchIcon />
                </Button>
                <Button size="small" disableElevation color="secondary" className={ classNames(classes.playPause, props.listMode==='previous' ? classes.buttonHighlight : classes.button)} variant="contained" onClick={() => toggleUser()}><RecentActorsIcon /></Button>
                { nowPlaying &&
                <>
                        <div className={classes.buttonSpacer}></div>
                        { nowPlaying.is_playing ?
                            <Button size="small" disableElevation variant="contained" color="secondary" className={classes.playPause} onClick={() => playbackControl('pause')}><PauseIcon /></Button>
                        :
                            <Button size="small" disableElevation variant="contained" color="secondary" className={classes.playPause} onClick={() => playbackControl('play')}><PlayIcon /></Button>
                        }
                        { (nowPlaying && nowPlaying.id) &&
                            <Button size="small" disableElevation variant="contained" color="secondary" className={classes.playPause} onClick={() => playbackControl('next')}><SkipIcon /></Button>
                        }
                </>
                }
            </div>
        </div>
            <div className={classNames(classes.searchBox, barOpen() ? classes.slideIn : classes.slideOut )}>
            { props.listMode==='search' &&
                <SearchBox searchText={props.searchText} setSearchText={props.setSearchText} search={props.search} setListMode={props.setListMode} />
            }
            { props.listMode==='previous' &&
                <UserActionsBar setUserMode={props.setUserMode} userMode={props.userMode} />
            }
            </div>
        </>
    )
}


