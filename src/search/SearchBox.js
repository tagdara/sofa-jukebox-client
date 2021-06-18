import React, { useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutContext } from 'layout/LayoutProvider';
import { SearchContext } from 'search/SearchProvider';

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
    playPause: {
        marginLeft: 4,
        marginRight: 8,
    },
    searchText: {
        fontSize: 16, 
    },
    searchHolder: {
        padding: 16,
        margin: 4,
        borderRadius: 4,
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    searchBox: {
        margin: 8,
        zIndex: "-2",
        borderRadius: "0px 0px 8px 8px",
        padding: 8,
    },
    hold: {
        width: "100%",
    }
}));

export default function SearchBox(props) {
    
    const classes = useStyles();
    const { setListMode, setShowSearch } = useContext(LayoutContext);
    const { searchText, setSearchText, search } = useContext(SearchContext);
    const searchRef = useRef();

    useEffect( () => {
        console.log('searchfocus', props.searchFocus)
        if (props.searchFocus === false ) { searchRef.current.blur() }
    }, [ props.searchFocus ] ); 


    const handleChange = event => {
        setSearchText(event.target.value);
        if (event.target.value.length > 0) {
            search(event.target.value)
        } else {
            setSearchText("")
            search("")
        }
    };    

    return (
        <Paper elevation={0} className={classes.searchHolder} onTouchStart={() => props.setSearchFocus(true)}>
            <InputBase
                classes={{ input: classes.searchText,}}                        
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
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
                ref={ searchRef }
            />
            <IconButton size={"small"} onClick={ ()=> { setListMode('queue'); } }><ClearIcon /></IconButton>
        </Paper>
  );
}
