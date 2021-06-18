import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'user/UserProvider';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import UserAvatar from 'queue/UserAvatar'

const useStyles = makeStyles(theme => ({
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
    itemText: {
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        flexGrow: 1,
        overflow: "hidden",
        textOverflow: 'ellipsis',
    },
    queueItem: {
        display: "flex",
        overflow: "hidden",
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
    }

    //onClick={ highlight }

    return (
        <ListItem   key={props.track.selection_tracker ? props.track.selection_tracker : props.track.id} 
                    className={classes.queueItem} 
                    onClick={ highlight }
                >
            <Avatar variant="square" className={props.backup ? classes.dark : classes.square} src={props.track.art} />
            <ListItemText   className={classes.itemText} classes={{ primary: classes.nowrap, secondary: classes.nowrap }} 
                            primary={ props.track.name } secondary={ props.track.artist } />
            { userName && <UserAvatar userName={userName} /> }
        </ListItem>
    );
}

export default QueueItem;
