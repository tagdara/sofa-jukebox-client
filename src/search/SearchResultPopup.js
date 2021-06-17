import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { QueueContext } from 'queue/QueueProvider'
import { UserContext } from 'user/UserProvider'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import RadioIcon from '@material-ui/icons/Radio';
import AddIcon from '@material-ui/icons/Add';

import SongTop from 'nowPlaying/SongTop';


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

export default function SearchResultPopup(props) {

    const classes = useStyles();  
    const { isAdmin } = useContext(UserContext)
    const { addRadioTracks, addTrack } = useContext(QueueContext);


    return (
        <Dialog fullWidth onClose={props.close} open={props.open} className={classes.dialog}>
            <DialogContent>
                <SongTop nowPlaying={ props.track } small={true } controls={false}/>
                <List>
                    { isAdmin() &&
                    <ListItem>
                        <Button fullWidth variant="contained" startIcon={<RadioIcon />} onClick={ ()=> { addRadioTracks(props.track.id); props.close() }}>More Like This</Button>
                    </ListItem>    
                    }
                    <ListItem>
                        <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={ ()=> { addTrack(props.track.id);  props.close() }}>Add Track</Button>
                    </ListItem>        
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}