import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';
import Button from '@material-ui/core/Button';

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
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    rightButton: {
        marginLeft:8,
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

export default function PreviousPicks(props) {

    const classes = useStyles();
    const { previousPicks, superPromoteTrack, checkTrackInQueue, addTrack } = useContext(DataContext);
    const [listMode, setListMode]=useState("popular")

    function sortPicks() {
        if (listMode==='recent') {
            return [...previousPicks].reverse()
        } else {
            return [...previousPicks].sort((a, b) => (a.count > b.count) ? 1 : -1).reverse()
        }
    }
    
    return (
        <>
            <List className={classes.nopad} >
                <ListItem>
                    <Button className={classes.bigButton} onClick={()=> setListMode('popular')} >Popular</Button>
                    <Button className={classes.rightButton} onClick={()=> setListMode('recent')} >Recent</Button>
                </ListItem>
            </List>
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
        </>
    )
    
}