import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

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

}))

export default function Playlists(props) {

    const classes = useStyles();

    console.log('playlists',props.playlists)

    return (
        <List className={classes.nopad} >
            { props.playlists.map((playlist) =>
            <ListItem button className={classes.item} key={playlist.id} onClick={()=> props.action(playlist.id)}>
                <Avatar variant="square" className={classes.square} src={playlist.art} />
                <ListItemText primary={playlist.name} />
            </ListItem>
            )}
        </List>
    )
    
}