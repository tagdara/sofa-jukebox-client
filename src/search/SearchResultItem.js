import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from 'search/SearchProvider';
import { QueueContext } from 'queue/QueueProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SuperPromoteIcon from '@material-ui/icons/Publish';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({

    list: {
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
        padding: 0,
    },
    xlist: {
        padding: 0,
        maxWidth: "100%",
        overflow: "hidden",
    },
    square: {
        marginRight: 16,
    },
    bigButton: {
        marginTop: 8,
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    placeholder: {
        borderRadius: 8,
        backgroundColor: theme.palette.background.lowButton,
        padding:16,
        margin: 16,
    }

}))

export default function SearchResults(props) {

    const classes = useStyles();
    const { addTrack, checkTrackInQueue, superPromoteTrack } = useContext(QueueContext)
    const track = props.track

    
    return (
        <ListItem className={ checkTrackInQueue(track.id) ? classes.selected : classes.normal } >
            <Avatar variant="square" className={classes.square} src={track.art} />
            <ListItemText primary={track.name} secondary={ track.artist } onClick={ ()=> props.popup(track) } />
            <ListItemSecondaryAction>
                { !checkTrackInQueue(track.id) ?
                    <IconButton size={"small"} onClick={()=> addTrack(track.id)}><AddIcon /></IconButton>
                    :
                    <>
                    { checkTrackInQueue(track.id)==='backup' ?
                        <IconButton size={"small"} onClick={ ()=> superPromoteTrack(track.id) }><SuperPromoteIcon /></IconButton>
                    :
                        <IconButton size={"small"} disabled><PlaylistAddCheckIcon /></IconButton>
                    }
                    </>
                }
            </ListItemSecondaryAction>
        </ListItem>
    )
    
}