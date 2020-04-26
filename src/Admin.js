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

export default function Playlists(props) {

    const classes = useStyles();
    const { user, pickDevice } = useContext(DataContext);
    
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
                <Button className={classes.bigButton} onClick={reloadPWA}>Reload Jukebox App</Button>
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