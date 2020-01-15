import React, {useState, useEffect, useRef} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import yellow from '@material-ui/core/colors/yellow';

import { makeStyles } from '@material-ui/core/styles';
//import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipIcon from '@material-ui/icons/SkipNext';
import ClearIcon from '@material-ui/icons/Clear';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SearchDialog from './SearchDialog';
import Paper from '@material-ui/core/Paper';

const theme = createMuiTheme({
    direction: "ltr",
    palette: {
        primary: {
            light: deepOrange[700],
            main: deepOrange[900],
            dark: deepOrange[1100]
        },
        secondary: {
            light: yellow[300],
            main: yellow[500],
            dark: yellow[700]
        },
        text: {
            primary: "#c0c0c0",
        },
        background: {
            default: "#000",
            page: "#111",
            hover: "rgba(188, 54, 12, 0.1)",
            paper: "#222",
        },
        type: "dark",
    }
});


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    square: {
        marginRight: 16,
    },
    topbar: {
        marginTop: "env(safe-area-inset-top)",
    },
    barList: {
        paddingLeft:0,
    },
    spacer: {
        marginTop: "env(safe-area-inset-top)",
        height: 128,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1000,
    },
    controlBar: {
        height: 48,
    },
    nowplayingBar: {
        height: 64,
        overflow: "hidden",
    },
    nowrap: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    paper: {
        width: "100%",
    }
}));

function App() {
    
    const classes = useStyles();
    const serverurl="https://jukebox.dayton.tech"
    
    const [eventSource, setEventSource] = useState(null);
    const [connectError, setConnectError] = useState(false);
    const [user, setUser]= useState({});
    const [queue, setQueue]= useState([]);
    const [searching, setSearching] =useState(false)

    const [backup, setBackup]= useState(false);
    const [nowPlaying, setNowPlaying]= useState({})

    let refQueue= useRef(queue);
    useEffect(() => {
        refQueue.current = queue;
    });

    useEffect(() => {
        if (eventSource===null || eventSource.readyState===2 || connectError===true) {
            console.log('previous eventsource', eventSource)
            console.log('connecting event source')
            // Authorization headers or custom headers may not be supported with EventSource
            var esource=new EventSource(serverurl+"/sse", { withCredentials: true })
            esource.addEventListener('message', listener);
            esource.addEventListener('error', errorlistener);
            esource.addEventListener('open', openlistener);
            setEventSource(esource)
        }    
    }, [connectError])

    const listener = event => {
        var data=JSON.parse(event.data)
        if (data.hasOwnProperty('nowplaying')) {
            setNowPlaying(data.nowplaying)
        }
        if (data.hasOwnProperty('playlist')) {
            if (data.playlist==='update') {
                get_json('queue').then(setQueue)
            } else if (data.playlist==='pop') {
                popQueue()
            }
        }
    };

    const errorlistener = event => {
        setConnectError(true)
        console.log('SSE error',event.srcElement.readyState,event)
    };

    const openlistener = event => {
        setConnectError(false)
    };

    async function get_json(url) {
        const response = await fetch(serverurl+"/"+url, {});
        const json = await response.json();
        return json
    }
    
    useEffect(() => {  
        get_json('user').then(setUser)
    }, [])

    useEffect(() => {
        if (user.id) {
            get_json('queue').then(setQueue)    
            get_json('nowplaying').then(setNowPlaying)
        }
        console.log(user)
    }, [user, backup])

    function popQueue() {
        var newqueue=[...refQueue.current]
        newqueue.shift()
        setQueue(newqueue)        
    }

    function auth() {
        var newurl=serverurl+"/auth"
        console.log(newurl)
        window.open(newurl);
    }
    
    function setDevice(device) {
        get_json('set_device/'+device).then(result=>console.log(result))
    }

    function pause() {
        get_json('pause').then(setNowPlaying)
    }
    
    function play() {
        get_json('play').then(setNowPlaying)
    }

    function next_track() {
        get_json('next').then(setNowPlaying)
    }

    function setBackupList(playlist) {
        get_json('setbackup/'+playlist).then(result=>console.log(result))
        setBackup(true)
    }
    
    function refreshView() {
        get_json('user')
            .then(setUser)
        get_json('nowplaying').then(setNowPlaying)
    }
    
    function closeDialog() {
        setSearching(false)
    }
    
    function remove_track(id) {
        console.log('Removing track',id)
        get_json('del/'+id).then(result => {console.log(result)})
    }
    
    function restartSpotifyd() {
        console.log('restarting spotifyd')
        get_json('spotifyd/restart').then(result => {console.log(result)})
    }
    
    function checkTrackInQueue(id) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].id==id) {
                return true
            }
        }
        return false
    }

  return (
    <ThemeProvider theme={theme}> 
    <Paper className={classes.paper} >
        <AppBar position="fixed" className={classes.topbar} >
            <Toolbar className={classes.barList}>
                { nowPlaying &&
                    <List className={classes.title}>
                        <ListItem className={classes.nowplayingBar}>
                            <Avatar variant="square" className={classes.square} src={nowPlaying.art} />
                            <ListItemText classes={{ primary: classes.nowrap, secondary: classes.nowrap }} primary={nowPlaying.name} secondary={nowPlaying.artist} />
                        </ListItem>
                        <ListItem className={classes.controlBar} >
                            { user && 
                                <Button onClick={() => setSearching(true)} >Add Songs</Button>
                            }
                            <ListItemText primary={" "} />
                            <ListItemSecondaryAction>
                               {nowPlaying.is_playing ?
                                    <IconButton onClick={() => pause()}><PauseIcon /></IconButton>
                                :
                                    <IconButton onClick={() => play()}><PlayIcon /></IconButton>
                                }
                                <IconButton onClick={() => next_track()}><SkipIcon /></IconButton>
                            </ListItemSecondaryAction>
                         </ListItem>
                    </List>
                }
            </Toolbar>
        </AppBar>
        {   searching &&
            <SearchDialog open={searching} close={closeDialog} checkTrackInQueue={checkTrackInQueue} />
        }
            <Toolbar className={classes.spacer} />
        { user && 
            <List>
                { queue.map((track,idx) =>
                <ListItem key={track.id}>
                    <Avatar variant="square" className={classes.square} src={track.art} />
                    <ListItemText classes={{ primary: classes.nowrap, secondary: classes.nowrap }} primary={track.name} secondary={track.artist} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={()=>remove_track(track.id)}><ClearIcon /></IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                )}

                <ListItem>
                    <Button color="inherit" onClick={() => setBackupList('Big Mix')}>Set Backup Queue</Button>
                </ListItem>
                <ListItem>
                    <Button color="inherit" onClick={() => setDevice('jukebox')}>Set Playback Device</Button>
                </ListItem>
                <ListItem>
                    <Button color="inherit" onClick={() => restartSpotifyd()}>Restart spotifyd</Button>
                </ListItem>
                <ListItem>
                    <Button color="inherit" onClick={() => refreshView()}>Refresh View</Button>
                </ListItem>
            </List>
        }
        { user.id ?
            <Button color="inherit" >Spotify User {user.id}</Button>
        :
            <Button color="inherit" onClick={() => auth()}>Login</Button>
        }
        <Toolbar />
    </Paper>
    </ThemeProvider>
  );
}

export default App;
