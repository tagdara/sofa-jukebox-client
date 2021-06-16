import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { SearchContext } from 'search/SearchProvider';
import { QueueContext } from 'queue/QueueProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import SuperPromoteIcon from '@material-ui/icons/Publish';


const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },
    square: {
        marginRight: 16,
    },
    bigButton: {
        height: 30,
        width: "100%",
    },
    rightButton: {
        height: 30,
        marginLeft:8,
        width: "100%",
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

export default function RecentPicks(props) {

    const classes = useStyles();
    const { searchType, previousPicks } = useContext(SearchContext);
    const { superPromoteTrack, checkTrackInQueue, addTrack } = useContext(QueueContext);

    function sortPicks() {
        return [ ...previousPicks.tracks ].reverse()
    }
    
    return (
        <List className={classes.nopad} >
            { sortPicks().map((track) =>
            <ListItem key={track.id}>
                <Avatar variant="square" className={classes.square} src={track.art} />
                <ListItemText primary={track.name} secondary={track.artist + " (" + track['count'] + ")" } />
                <ListItemSecondaryAction>
                    { checkTrackInQueue(track.id) ===false &&
                        <IconButton size={"small"} onClick={()=> addTrack(track.id)}><AddIcon /></IconButton>
                    }
                    { checkTrackInQueue(track.id) ==="user" &&
                        <IconButton size={"small"} disabled><PlaylistAddCheckIcon /></IconButton>
                    }
                    { checkTrackInQueue(track.id) ==="backup" &&
                        <IconButton className={classes.button} size={"small"} onClick={ ()=> superPromoteTrack(track.id) }><SuperPromoteIcon /></IconButton>
                    }
                </ListItemSecondaryAction>
            </ListItem>
            )}
        </List>
    )
    
}