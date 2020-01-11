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

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';



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
        height: 128,
    },

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
                     <TextField
                        id="standard-name"
                        label="Search"
                        className={classes.textField}
                        value={search}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        variant="filled"
                    />
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.spacer} />
            <DialogContent>
                <List className={classes.nopad} >
                    { results.map((track) =>
                    <ListItem key={track.id}>
                        <Avatar variant="square" className={classes.square} src={track.art} />
                        <ListItemText primary={track.name} secondary={track.artist} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={()=> add_track(track.id)}><AddIcon /></IconButton>
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