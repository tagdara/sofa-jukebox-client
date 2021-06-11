import React, { useState, useContext}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { QueueContext } from 'queue/QueueProvider'
import { LayoutContext } from 'layout/LayoutProvider'
import Queue from 'queue/Queue';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SongPopup from 'queue/SongPopup';

const useStyles = makeStyles(theme => ({
    bigButton: {
        width: "100%",
    },
    list: {
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
        padding: 0,
    },
    status: {
        textAlign: "center",
        width: "100%",
    }

}));

export default function Queues(props) {

    const classes = useStyles();
    const { heights, setListMode } = useContext(LayoutContext);   
    const { addRadioTracks, backupQueue, emptyQueue, promoteTrack, removeTrack, superPromoteTrack, userQueue } = useContext(QueueContext);
    const [ popTrack, setPopTrack ] = useState(undefined)

    function closePopup() {
        setPopTrack(undefined)
    }

    function popup(song) {
        setPopTrack(song)
    }


    return (
        <List className={classes.list} >
        { !emptyQueue ?
            <>
                <Queue  queue={userQueue} remove={removeTrack} user={true} addRadioTracks={addRadioTracks} popup={popup} />
                <Queue  queue={backupQueue} remove={removeTrack} promoteTrack={promoteTrack} superPromoteTrack={superPromoteTrack} 
                        foldable={props.scrollUnfold ? false : true } backup={true} height={heights.scrollHeight} addRadioTracks={addRadioTracks} 
                        header={true} popup={popup} />
            </>
        :
            <>
                <ListItem>
                    <Typography className={classes.status} variant="subtitle1">No songs in queue</Typography>
                </ListItem>
                <ListItem>
                    <Button color="primary" variant="contained" className={classes.bigButton} onClick={ () => setListMode('playlists') }>Select Playlist</Button>
                </ListItem>
            </>
        }
        { popTrack &&
            <SongPopup track={popTrack} open={popTrack !== undefined } close={closePopup} />
        }
        </List>
  );
}


