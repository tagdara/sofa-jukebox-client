import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PlaylistContext } from 'playlist/PlaylistProvider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Scrollbar } from 'react-scrollbars-custom';

const useStyles = makeStyles(theme => ({

    nopad: {
        ping: 0,
    },
    square: {
        marginRight: 16,
    },
    bigButton: {
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    button: {
        marginLeft: 4,
    }
}))

export default function Playlists(props) {

    // Takes an action as props so that it can be used to perform different actions and 
    // the owned parameter to filter only owned for adding tracks

    const classes = useStyles();
    const { playlists, ownedPlaylists, choosePreview } = useContext(PlaylistContext);

    const playlistSet = props.owned ? ownedPlaylists : playlists

    return (
        <Scrollbar style={{ width: "100%" }} >
        <List className={classes.nopad} >
            { playlistSet.map((playlist) =>
                <ListItem button className={classes.item} key={playlist.id} >
                    <Avatar variant="square" className={classes.square} src={playlist.art} onClick={()=> props.action(playlist.id)}/>
                    <ListItemText primary={playlist.name} onClick={()=> props.action(playlist.id)}/>
                    <IconButton className={classes.button} size={"small"} onClick={ ()=> choosePreview(playlist.id) }><MoreHorizIcon /></IconButton>
                </ListItem>
            )}
        </List>
        </Scrollbar>
    )
    
}