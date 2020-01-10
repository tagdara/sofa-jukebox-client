import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RefreshIcon from '@material-ui/icons/Refresh';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipIcon from '@material-ui/icons/SkipNext';


import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
    barList: {
        paddingLeft:0,
    },
    spacer: {
        height: 90,
    }
}));

function App() {
    
    const serverurl="https://disp.dayton.home:9999"
    const classes = useStyles();
    const [user, setUser]= useState({});
    const [queue, setQueue]= useState([]);
    const [backup, setBackup]= useState(false);
    const [nowPlaying, setNowPlaying]= useState({})
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

    function skip() {
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

  return (
    <div className="App">
        <AppBar position="fixed">
            <Toolbar className={classes.barList}>
                { nowPlaying &&
                    <>
                    <List className={classes.title}>
                        <ListItem >
                            <Avatar variant="square" className={classes.square} src={nowPlaying.art} />
                            <ListItemText primary={nowPlaying.name} secondary={nowPlaying.artist} />
                        </ListItem>
                    </List>
                    {nowPlaying.is_playing ?
                        <IconButton onClick={() => pause()}><PauseIcon /></IconButton>
                    :
                        <IconButton onClick={() => play()}><PlayIcon /></IconButton>
                    }
                    <IconButton onClick={() => skip()}><SkipIcon /></IconButton>
                    </>
                }
                <IconButton edge="end" color="inherit" aria-label="refresh" onClick={() => refreshView()}>
                    <RefreshIcon />
                </IconButton>
              </Toolbar>
        </AppBar>
            <Toolbar className={classes.spacer} />
        { user && 
            <List>
                { queue.map((track,idx) =>
                <ListItem key={track.id+idx}>
                    <Avatar variant="square" className={classes.square} src={track.art} />
                    <ListItemText primary={track.name} secondary={track.artist} />
                    <ListItemSecondaryAction>
                        <IconButton><FavoriteIcon /></IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                )}

                <ListItem>
                    <Button color="inherit" onClick={() => setBackupList('Big Mix')}>Set Backup Queue</Button>
                </ListItem>
                <ListItem>
                    <Button color="inherit" onClick={() => setDevice('jukebox')}>Set Playback Device</Button>
                </ListItem>

            </List>
        }
        { user.id ?
            <Button color="inherit" >Spotify User {user.id}</Button>
        :
            <Button color="inherit" onClick={() => auth()}>Login</Button>
        }
    </div>
  );
}

export default App;
