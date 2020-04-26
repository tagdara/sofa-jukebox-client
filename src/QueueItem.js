import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PromoteIcon from '@material-ui/icons/VerticalAlignTop';
import SuperPromoteIcon from '@material-ui/icons/Publish';

import ClearIcon from '@material-ui/icons/Clear';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';


const useStyles = makeStyles(theme => ({

    title: {
        flexGrow: 1,
    },
    bigButton: {
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    square: {
        marginRight: 16,
    },
    dark: {
        opacity: .8,
        marginRight: 16,
    },
    nowrap: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    itemtext: {
        flexGrow: 1,
        overflow: "hidden",
        textOverflow: 'ellipsis',
    },
    userQueue: {
        backgroundColor: theme.palette.background.userTrack,
        display: "flex",
    },
    backupQueue: {
        
        color: theme.palette.text.backupQueue,
        display: "flex",
        overflow: "hidden",
    },
    list: {
        padding: 0,
        width: "100%",
        overflow: "hidden",
    },
    highlight: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.hover,
    },
    base: {
        '&:hover': {
            backgroundColor: theme.palette.background.hover,
            color: theme.palette.primary.contrastText,
        }        
    },
    promoted: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.promoted,
        '&:hover': {
            backgroundColor: theme.palette.background.promotedHover,
            color: theme.palette.primary.contrastText,
        }     
    },
    button: {
        marginLeft: 4,
    }
    
}));

function QueueItem(props) {
    
    const classes = useStyles();
    
    function promoteOrSuperPromote(track, idx) {

        if (idx===0) { return null }
        if (props.promoteTrack!==undefined) {
            if (track.hasOwnProperty('promoted') & track.promoted) {
                if (props.superPromoteTrack!==undefined) {
                    return <IconButton className={classes.button} size={"small"} onClick={ ()=> props.superPromoteTrack(track.id) }><SuperPromoteIcon /></IconButton>
                } 
            } else {
                return <IconButton className={classes.button} size={"small"} onClick={ ()=> props.promoteTrack(track.id) }><PromoteIcon /></IconButton>
            }
        }
            
        return null
    }

    return (
        <ListItem   key={props.track.selection_tracker ? props.track.selection_tracker : props.track.id} 
                    className={ classNames( classes.base,
                                    props.track.promoted && classes.promoted, 
                                    props.highlight && classes.highlight, 
                                    props.user ? classes.userQueue : classes.backupQueue
                    )} onClick={ () => props.setHighlight(props.track.id) }>
            <Avatar variant="square" className={props.backup ? classes.dark : classes.square} src={props.track.art} />
            <ListItemText   className={classes.itemtext} classes={{ primary: classes.nowrap, secondary: classes.nowrap }} 
                            primary={ props.track.name } secondary={ props.track.artist } />
            { props.highlight &&
            <>
                {promoteOrSuperPromote(props.track, props.index) }
                { props.remove!==undefined &&
                    <IconButton className={classes.button} size={"small"} onClick={()=>props.remove(props.track.id)}><ClearIcon /></IconButton>
                }
            </>
            }
        </ListItem>
    );
}

export default QueueItem;
