import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { QueueContext } from 'queue/QueueProvider'
import { UserContext } from 'user/UserProvider'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PromoteIcon from '@material-ui/icons/VerticalAlignTop';
import SuperPromoteIcon from '@material-ui/icons/Publish';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RadioIcon from '@material-ui/icons/Radio';
import ClearIcon from '@material-ui/icons/Clear';

import TitleAndArtist from 'nowPlaying/TitleAndArtist'

const useStyles = makeStyles(theme => ({

    addMusicButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
    },
    dialog: {
        maxWidth: 480,
        width: "90%",
    }
}));

export default function SongPopup(props) {

    const classes = useStyles();  
//    const { listMode, setListMode } = useContext(LayoutContext);
    const { isAdmin } = useContext(UserContext)
    const { addRadioTracks, promoteTrack, removeTrack, superPromoteTrack } = useContext(QueueContext);

    console.log(props.song)

    function promoteOrSuperPromote(track) {

        //if (idx===0) { return null }
        if (track.hasOwnProperty('promoted') & track.promoted) {
            if (props.superPromoteTrack!==undefined) {
                return (
                    <ListItem onClick={ ()=> { superPromoteTrack(track.id); props.close() }}>
                        <ListItemIcon><SuperPromoteIcon /></ListItemIcon>
                        <ListItemText primary={"SuperPromote Track"} />
                    </ListItem>   
                )                 
            } 
        } else {
            return (
            <ListItem onClick={ ()=> { promoteTrack(track.id); props.close() }}>
                <ListItemIcon><PromoteIcon /></ListItemIcon>
                <ListItemText primary={"Promote Track"} />
            </ListItem>      
            )                
        } 
        return null
    }

    return (
        <Dialog onClose={props.close} open={props.open} className={classes.dialog}>
            <TitleAndArtist nowPlaying={props.track} />
            <List>
                { promoteOrSuperPromote(props.track) }  
                { isAdmin() &&
                    <ListItem onClick={ ()=> { addRadioTracks(props.track.id); props.close() }}>
                        <ListItemIcon><RadioIcon /></ListItemIcon>
                        <ListItemText primary={"More Like This"} />
                    </ListItem>    
                }
                <ListItem onClick={ () => { removeTrack(props.track.id); props.close() }} >
                    <ListItemIcon><ClearIcon /></ListItemIcon>
                    <ListItemText primary={"Remove Track"} />
                </ListItem>       
            </List>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}