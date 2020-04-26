import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import QueueItem from './QueueItem';


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
        if (props.foldable===true && folded===true) {
            return props.queue.slice(0, 5);
        }
        return props.queue
    }

    return (
            <List className={classes.list} >
                { getFoldableItems().map((track,idx) =>
                <QueueItem  key={track.selection_tracker ? track.selection_tracker : track.id} track={track} index={idx} highlight={ highlight===track.id } remove={props.remove} 
                            promoteTrack={props.promoteTrack} superPromoteTrack={props.superPromoteTrack} 
                            setHighlight={setHighlight} backup={props.backup} user={props.user} />
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
            </List>
    );
}

export default Queue;
