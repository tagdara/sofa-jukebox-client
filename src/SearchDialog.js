import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    nopad: {
        padding: 0,
    },
    square: {
        marginRight: 16,
    },
    spacer: {
        height: 196,
    },
    barList: {
        height: 128,
    },
    textField: {
        padding: 12,
        background: "#444",
        borderRadius: 4,
    },
    searchText: {
        fontSize: 16,
    }
}))

export default function SearchButton(props) {
    const serverurl="https://jukebox.dayton.tech"
    const classes = useStyles();
    const [search, setSearch]= useState("");
    const [results, setResults]= useState([]);  
    
    const handleChange = event => {
        setSearch(event.target.value);
        if (event.target.value.length > 3) {
            get_json('search/'+event.target.value).then(setResults)
        } else if (event.target.value.length < 1) {
            setResults([])
        }
    };    

    async function get_json(url) {
        const response = await fetch(serverurl+"/"+url, {});
        const json = await response.json();
        return json
    }
    
    function search_track() {
        get_json('search/'+search).then(setResults)
    }
    
    function add_track(id) {
        get_json('add/'+id).then(result => {console.log(result)})
    }

    
    return (
        <Dialog open={props.open} fullScreen={true}>
            <AppBar position="fixed">
                <Toolbar className={classes.barList}>
                    <InputBase
                        classes={{ input: classes.searchText,}}                        
                        startAdornment={
                            <InputAdornment position="start">
                                { search.length ?
                                <IconButton onClick={()=> props.close()}><ArrowBackIcon /></IconButton>
                                :
                                <IconButton onClick={()=> props.close()}><SearchIcon /></IconButton>
                                }
                            </InputAdornment>
                        }
                        id="song search"
                        placeholder="Search for songs"
                        type="search"
                        className={classes.textField}
                        value={search}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Toolbar className={classes.spacer} />
                <List className={classes.nopad} >
                    { results.map((track) =>
                    <ListItem key={track.id}>
                        <Avatar variant="square" className={classes.square} src={track.art} />
                        <ListItemText primary={track.name} secondary={track.artist} />
                        <ListItemSecondaryAction>
                            { !props.checkQueue(track.id) ?
                                <IconButton onClick={()=> add_track(track.id)}><AddIcon /></IconButton>
                                :
                                <IconButton disabled><PlaylistAddCheckIcon /></IconButton>
                            }
                        </ListItemSecondaryAction>
                    </ListItem>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> props.close()} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    )
    
}