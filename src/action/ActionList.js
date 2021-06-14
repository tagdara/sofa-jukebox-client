import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutContext } from 'layout/LayoutProvider';
import { QueueContext } from 'queue/QueueProvider'
import { UserContext }from 'user/UserProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

import SpeakerIcon from '@material-ui/icons/Speaker';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RadioIcon from '@material-ui/icons/Radio';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import PeopleIcon from '@material-ui/icons/People';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },
    square: {
        marginRight: 16,
        backgroundColor: theme.palette.background.mediumButton,
    },
    info: {
        marginRight: 16,
        color: theme.palette.background.lowButton,
        backgroundColor: "rgba(0,0,0,0)",
    },
    bigButton: {
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    item: {
        minHeight: 60,
    }

}))

export default function ActionList(props) {

    const classes = useStyles();
    const { setListMode } = useContext(LayoutContext)
    const { user, spotifyUser, isAdmin, logout } = useContext(UserContext);
    const { clearQueue, addRadioTracks, shuffleBackupList } = useContext(QueueContext);

    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }

    console.log('user', user, isAdmin())
 
    return (
        <List className={classes.nopad} >
            <ListItem className={classes.item} onClick={ () => { shuffleBackupList(); setListMode('queue') }  }>
                <Avatar color="primary" variant="square" className={classes.square} ><ShuffleIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Shuffle" } />
            </ListItem>
            { isAdmin() && 
            <ListItem className={classes.item} onClick={ () => addRadioTracks(props.nowPlaying.id) }>
                <Avatar variant="square" className={classes.square} ><RadioIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "More Like This" } />
            </ListItem>
            }
            <ListItem className={classes.item} onClick={ () => setListMode('playlists') }>
                <Avatar variant="square" className={classes.square} ><QueueMusicIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Select Playlist" } />
            </ListItem>
            { isAdmin() && 
            <ListItem className={classes.item} onClick={ () => setListMode('addtoplaylist')}>
                <Avatar variant="square" className={classes.square} ><PlaylistAddIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Add Song to Playlist" } />
            </ListItem>
            }
            { isAdmin() && 
            <ListItem className={classes.item} onClick={ () => clearQueue()}>
                <Avatar variant="square" className={classes.square} ><DeleteOutlineIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Clear Queue" }  />
            </ListItem>
            }
            { isAdmin() && 
            <ListItem className={classes.item} onClick={ () => setListMode('devices')}>
                <Avatar variant="square" className={classes.square} ><SpeakerIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Select Audio Device" }  />
            </ListItem>
            }
            { isAdmin() && 
            <ListItem className={classes.item} onClick={ () => setListMode('users')}>
                <Avatar variant="square" className={classes.square} ><PeopleIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Manage Users" }  />
            </ListItem>
            }
            { isAdmin() && 
            <ListItem className={classes.item} onClick={ () => setListMode('blacklist')}>
                <Avatar variant="square" className={classes.square} ><PeopleIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Blacklist" }  />
            </ListItem>
            }
            <ListItem className={classes.item} onClick={reloadPWA} >
                <Avatar variant="square" className={classes.square} ><ReplayIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Reload App" }  />
            </ListItem>
            <ListItem className={classes.item} onClick={logout} >
                <Avatar variant="square" className={classes.square} ><ExitToAppIcon /></Avatar>
                <ListItemText className={classes.itemtext} primary={ "Logout: " + user }  />
            </ListItem>
            { spotifyUser && 
                <ListItem className={classes.item} >
                    <Avatar variant="square" className={classes.info} ><LibraryMusicIcon /></Avatar>
                    <ListItemText className={classes.itemtext} primary={ "Spotify: " +spotifyUser.id }  />
                </ListItem>
            }   
        </List>
    )
    
}