import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from 'search/SearchProvider';
import { QueueContext } from 'queue/QueueProvider';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SuperPromoteIcon from '@material-ui/icons/Publish';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import RadioIcon from '@material-ui/icons/Radio';

const useStyles = makeStyles(theme => ({

    list: {
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
        padding: 0,
    },
    xlist: {
        padding: 0,
        maxWidth: "100%",
        overflow: "hidden",
    },
    square: {
        marginRight: 16,
    },
    bigButton: {
        marginTop: 8,
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    selected: {
        backgroundColor: theme.palette.background.promoted,
    },
    placeholder: {
        borderRadius: 8,
        backgroundColor: theme.palette.background.lowButton,
        padding:16,
        margin: 16,
    }

}))

export default function SearchResults(props) {

    const classes = useStyles();
    const { searchResults, checkPrevious } = useContext(SearchContext);
    const { addTrack, checkTrackInQueue, superPromoteTrack, addRadioTracks } = useContext(QueueContext)
    const [ expanded, setExpanded ]=useState(undefined)
    
    
    function prevPlays(track) {
        if (checkPrevious(track.id)>0) {
            return " ("+checkPrevious(track.id)+")" 
        } 
        return ""
    }
    
    function expand(trackId) {
        if (expanded===trackId) { 
            setExpanded(undefined) 
        } else {
            setExpanded(trackId)
        }
        
    }
    
    return (
        searchResults.length ?
        <List className={classes.list} >
            { searchResults.map((track) =>
            <React.Fragment key={track.id}>
                <ListItem className={ (checkTrackInQueue(track.id) || track.id===expanded ) ? classes.selected : classes.normal} >
                    <Avatar variant="square" className={classes.square} src={track.art} />
                    <ListItemText primary={track.name} secondary={ track.artist + prevPlays(track) } onClick={ ()=> expand(track.id) } />
                    <ListItemSecondaryAction>
                        { !checkTrackInQueue(track.id) ?
                            <IconButton size={"small"} onClick={()=> addTrack(track.id)}><AddIcon /></IconButton>
                            :
                            <>
                            { checkTrackInQueue(track.id)==='backup' ?
                                <IconButton size={"small"} onClick={ ()=> superPromoteTrack(track.id) }><SuperPromoteIcon /></IconButton>
                            :
                                <IconButton size={"small"} disabled><PlaylistAddCheckIcon /></IconButton>
                            }
                            </>
                        }
                    </ListItemSecondaryAction>
                </ListItem>
                { track.id===expanded &&
                    <ListItem className={ classes.selected} >
                        <IconButton size={"small"} onClick={ ()=> addRadioTracks(track.id) }><RadioIcon /></IconButton>
                    </ListItem>
                }
            </React.Fragment>
            )}
        </List>
        :
        <div className={classes.placeholder}>
            <Typography variant="subtitle1">Search the Spotify catalog by song or artist and your results will appear here.</Typography>
        </div>
    )
    
}