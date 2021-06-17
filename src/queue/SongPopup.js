import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { QueueContext } from 'queue/QueueProvider'
import { UserContext } from 'user/UserProvider'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PromoteIcon from '@material-ui/icons/VerticalAlignTop';
import SuperPromoteIcon from '@material-ui/icons/Publish';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import RadioIcon from '@material-ui/icons/Radio';
import ClearIcon from '@material-ui/icons/Clear';

import SongTop from 'nowPlaying/SongTop';
import UserAvatar from 'queue/UserAvatar'

const useStyles = makeStyles(theme => ({

    addMusicButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
    },
    dialog: {
        maxWidth: 480,
    }
}));

export default function SongPopup(props) {

    const classes = useStyles();  
//    const { listMode, setListMode } = useContext(LayoutContext);
    const { isAdmin } = useContext(UserContext)
    const { addRadioTracks, promoteTrack, removeTrack, superPromoteTrack } = useContext(QueueContext);
    const { userById } = useContext(UserContext)

    const user = props.track.user ? userById(props.track.user) : undefined
    const userName = user ? user.name : undefined

    function promoteOrSuperPromote(track) {
        //if (idx===0) { return null }
        if (track.hasOwnProperty('promoted') & track.promoted) {
            if (props.superPromoteTrack!==undefined) {
                return (
                    <ListItem>
                        <Button fullWidth variant="contained" startIcon={<SuperPromoteIcon />} onClick={ ()=> { superPromoteTrack(track.id); props.close() }}>SuperPromote Track</Button>
                    </ListItem> 
                )                 
            } 
        } else {
            return (
                <ListItem>
                    <Button fullWidth variant="contained" startIcon={<PromoteIcon />} onClick={ ()=> { promoteTrack(track.id); props.close() }}>Promote Track</Button>
                </ListItem>     
            )                
        } 
        return null
    }

    return (
        <Dialog fullWidth onClose={props.close} open={props.open} className={classes.dialog}>
            <DialogContent>
                <SongTop nowPlaying={ props.track } small={true } controls={false}/>
                <List>
                    { userName &&
                        <ListItem>
                            <UserAvatar userName={userName} chip={true} />
                        </ListItem>  
                    }
                    { promoteOrSuperPromote(props.track) }  
                    { isAdmin() &&
                    <ListItem>
                        <Button fullWidth variant="contained" startIcon={<RadioIcon />} onClick={ ()=> { addRadioTracks(props.track.id); props.close() }}>More Like This</Button>
                    </ListItem>    
                    }
                    <ListItem>
                        <Button fullWidth variant="contained" startIcon={<ClearIcon />} onClick={ ()=> { removeTrack(props.track.id);  props.close() }}>Remove Track</Button>
                    </ListItem>        
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}