import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';
import { NetworkContext } from './NetworkProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';

const useStyles = makeStyles(theme => ({

    actionBar: {
        padding: 2,
        maxWidth: 480,
        display: "flex",
        alignItems: "center",
    },
    nopad: {
        height: 54,
        padding: 6,
        maxWidth: 480,
        display: "flex",
        alignItems: "center",
    },
    buttonHighlight: {
        color: theme.palette.primary.contrastText,
        marginRight: 4,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        }
    },
    button: {
        marginRight: 4,
        '&:hover': {
            backgroundColor: theme.palette.primary.medium,
        }
    },
}))


export default function UserActionsBar(props) {

    const classes = useStyles();
    const { nowPlaying } = useContext(DataContext);   
    const { streamStatus } = useContext(NetworkContext);

    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }

    return (
        <List className={classes.actionBar} >
            <ListItem className={classes.nopad}>
                <Button size="small" disableElevation className={props.userMode==='backup' ? classes.buttonHighlight : classes.button} onClick={()  => props.setUserMode("backup") }>
                    <QueueMusicIcon />
                </Button>
                <Button size="small" disableElevation className={props.userMode==='previous' ? classes.buttonHighlight : classes.button} onClick={()  => props.setUserMode("previous") }>
                    <RecentActorsIcon />
                </Button>
                <Button size="small" disableElevation className={props.userMode==='admin' ? classes.buttonHighlight : classes.button} onClick={()  => props.setUserMode("admin") }>
                    <SettingsIcon />
                </Button>
                { (nowPlaying && nowPlaying.id) &&
                    <Button size="small" disableElevation className={props.userMode==='add' ? classes.buttonHighlight : classes.button} onClick={()  => props.setUserMode("add") }>
                        <PlaylistAddIcon />
                    </Button>
                }
                { streamStatus!==1 &&
                <Button size="small" disableElevation className={classes.button} onClick={()  => reloadPWA() }>
                    <SyncProblemIcon />
                </Button>
                }
            </ListItem>
        </List>
    )
    
}