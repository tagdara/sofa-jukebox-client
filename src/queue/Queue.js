import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import QueueItem from 'queue/QueueItem';
import QueueHeader from 'queue/QueueHeader';

const useStyles = makeStyles(theme => ({

    bigButton: {
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    list: {
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
        padding: 0,
    },

}));

function Queue(props) {
    
    const classes = useStyles();
    const [ highlight, setHighlight]=useState(false)
    const [ folded, setFolded]=useState(true)
    
    function getFoldableItems() {
        if (!props.queue.hasOwnProperty('tracks')) return []
        if (props.queue.tracks.length===0) return []
        if (props.foldable===true && folded===true) {
            if (props.height && props.height>0 && (Math.floor(props.height/60)-1)>1) {
                return props.queue.tracks.slice(0, Math.floor(props.height/60)+1)
            }
            return props.queue.tracks.slice(0, 5);
        }
        return props.queue.tracks
    }

    return (
        <>
            { (props.header && getFoldableItems().length>0) && <QueueHeader queue={props.queue} /> }
            { getFoldableItems().map((track,idx) =>
            <QueueItem  key={track.selection_tracker ? track.selection_tracker : track.id} track={track} index={idx} highlight={ highlight===track.id } remove={props.remove} 
                        promoteTrack={props.promoteTrack} superPromoteTrack={props.superPromoteTrack} addRadioTracks={props.addRadioTracks}
                        setHighlight={setHighlight} backup={props.backup} user={props.user} popup={props.popup} />
            )}
            { (props.foldable && props.queue.length>5 ) && 
                <ListItem>
                    { folded ?
                        <Button className={classes.bigButton} onClick={( ) => setFolded(false) } >Show all {props.queue.length} backup tracks</Button>
                    :
                        <Button className={classes.bigButton} onClick={( ) => setFolded(true) } >Hide extra backup tracks</Button>
                    }
                </ListItem>
            }
        </>
    );
}

export default Queue;
