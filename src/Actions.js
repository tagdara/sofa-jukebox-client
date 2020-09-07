import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },
    square: {
        marginRight: 16,
    },
    bigButton: {
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },

}))

export default function Actions(props) {

    const classes = useStyles();
    const { user, pickDevice, displayCommand, shuffleBackupList } = useContext(DataContext);
    
    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }
    
    return (
        <List className={classes.nopad} >
            <ListItem>
                <Button className={classes.bigButton} onClick={ shuffleBackupList }>Shuffle Backup Tracks</Button>
            </ListItem>
            <ListItem>
                <Button className={classes.bigButton} onClick={() => props.setListMode('playlists')}>Select Playlist</Button>
            </ListItem>
            <ListItem>
                <Button className={classes.bigButton} onClick={() => props.setListMode('addtoplaylist')}>Add Track to Playlist</Button>
            </ListItem>
            <ListItem>
                <Button className={classes.bigButton} onClick={reloadPWA}>Reload Jukebox App</Button>
            </ListItem>
            <ListItem>
                <Button className={classes.bigButton} onClick={ () => displayCommand('clock') }>Show Clock</Button>
            </ListItem>
            <ListItem>
                <Button className={classes.bigButton} onClick={ () => displayCommand('nowplaying') }>Show Now Playing</Button>
            </ListItem>
            <ListItem>
                <Button className={classes.bigButton} onClick={ () => displayCommand('backlight/toggle') }>Screen</Button>
            </ListItem>
            <ListItem>
                <Button className={classes.bigButton} onClick={ () => displayCommand('camera') }>Camera</Button>
            </ListItem>
            <ListItem>
                <Button className={classes.bigButton}>{ user ? "Spotify User "+user.id : "No Spotify User"}</Button>
            </ListItem>
            <ListItem>
                <Button  className={classes.bigButton} onClick={() => pickDevice('jukebox')}>Set Playback Device</Button>
            </ListItem>
        </List>
    )
    
}