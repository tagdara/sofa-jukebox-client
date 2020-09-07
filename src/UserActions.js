import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PreviousPicks from './PreviousPicks';
import Playlists from './Playlists';
import Admin from './Admin';

const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },
    square: {
        marginRight: 16,
    },
    bigButton: {
        marginTop: 8,
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    smallButton: {
        marginTop: 8,
        backgroundColor: theme.palette.background.lowButton,
        marginRight: 4,
    },
    smallHighlight: {
        marginTop: 8,
        backgroundColor: theme.palette.background.mediumButton,
        marginRight: 4,
    },

    selected: {
        backgroundColor: theme.palette.background.promoted,
    }
}))

export default function UserActions(props) {

    const classes = useStyles();
    const { nowPlaying, playlists, setBackupList, shuffleBackupList, addTrackToPlaylist, user } = useContext(DataContext);

    function addThisTrackToPlaylist(playlist) {
        addTrackToPlaylist(nowPlaying.id, playlist)
        props.setListMode("queue") 
    }
    
    function ownedPlaylists() {
        var owned=[]
        for (var i = 0; i < playlists.length; i++) {
            if (playlists[i].owner===user.id) {
                owned.push(playlists[i])
            }
        }
        return owned
        
    }

    return (
        <List className={classes.nopad} >
        { props.userMode ==='previous' &&
            <PreviousPicks  setListMode={props.setListMode} add={props.add} tracks={props.previousPicks} 
                            checkQueue={props.checkQueue} checkPrevious={props.checkPrevious}
                            superPromoteTrack={props.superPromoteTrack} />
        }
        { props.userMode==='backup' &&
            <>
                <ListItem>
                    <Button className={classes.bigButton} onClick={shuffleBackupList} >Shuffle Current List</Button>
                </ListItem>
                <Playlists  action={ setBackupList } playlists={ playlists } />
            </>
        }
        { props.userMode==='add' &&
            <>
                <ListItem>
                    <Button disabled className={classes.bigButton} >Add Song to Playlist</Button>
                </ListItem>
                <Playlists action={ addThisTrackToPlaylist } playlists={ ownedPlaylists() } />
            </>
        }
        { props.userMode==='admin' &&
            <Admin   user={props.user} setDevice={props.setDevice} />
        }
        </List>
    )
    
}