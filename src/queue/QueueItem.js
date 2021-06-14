import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'user/UserProvider';

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
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        flexGrow: 1,
        overflow: "hidden",
        textOverflow: 'ellipsis',
    },
    userQueue: {
//        backgroundColor: theme.palette.background.userTrack,
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
    },
    user: {
        height: 24,
        width: 24,
        backgroundColor:  theme.palette.primary.main,
        fontSize: 12,
    }
    
}));

function QueueItem(props) {
    
    const classes = useStyles();
    const { userById } = useContext(UserContext)

    const user = userById(props.track.user)
    const userName = user ? user.name : undefined
    
    function highlight() {
        props.popup(props.track)
        props.setHighlight(props.track.id)
    }

    //onClick={ highlight }

    return (
        <ListItem   key={props.track.selection_tracker ? props.track.selection_tracker : props.track.id} 
                    className={ classNames( classes.base,
                                    props.track.promoted && classes.promoted, 
                                    props.highlight && classes.highlight, 
                                    props.user ? classes.userQueue : classes.backupQueue
                    )} 
                    onClick={ highlight }
                >
            <Avatar variant="square" className={props.backup ? classes.dark : classes.square} src={props.track.art} />
            <ListItemText   className={classes.itemtext} classes={{ primary: classes.nowrap, secondary: classes.nowrap }} 
                            primary={ props.track.name } secondary={ props.track.artist } />
            { userName && <Avatar className={classes.user} >{ userName[0].toUpperCase() }</Avatar> }
        </ListItem>
    );
}

export default QueueItem;
