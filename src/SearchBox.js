import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    textField: {
        padding: 4,
        borderRadius: 4,
    },
    searchText: {
        fontSize: 16,
        
    },
    searchHolder: {
        margin: 8,
        borderRadius: 4,
        backgroundColor: theme.palette.background.lowButton,
        maxWidth: 480,
    },
    searchBox: {
        margin: "-8px 8px 8px 8px",
        zIndex: "-2",
        borderRadius: "0px 0px 8px 8px",
        backgroundColor: theme.palette.primary.superDark,
        padding: 8,
    }
}));

export default function SearchBox(props) {
    
    const classes = useStyles();
    const { setListMode, searchText, setSearchText, search } = useContext(DataContext);

    const handleChange = event => {
        setSearchText(event.target.value);
        if (event.target.value.length > 0) {
            setListMode('search')
            search(event.target.value)
        } else {
            setListMode('queue')
            setSearchText("")
            search("")
        }
    };    

    return (
            <Paper elevation={0} className={classes.searchHolder}>
            <InputBase
                classes={{ input: classes.searchText,}}                        
                startAdornment={
                    <InputAdornment position="start">
                        { searchText.length ?
                            <IconButton size={"small"} onClick={ ()=> { setSearchText(""); search("") } }><ClearIcon /></IconButton>
                        :
                            <IconButton size={"small"} ><SearchIcon /></IconButton>
                        }
                    </InputAdornment>
                }
                id="song search"
                placeholder="Search for songs"
                type="search"
                className={classes.textField}
                value={ searchText }
                onChange={handleChange}
                fullWidth
                autoFocus
            />
            </Paper>
  );
}
