import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { SearchContext } from 'search/SearchProvider';
import { QueueContext } from 'queue/QueueProvider';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },
    square: {
        marginRight: 16,
    },
    bigButton: {
        height: 30,
        width: "100%",
    },
    rightButton: {
        height: 30,
        marginLeft:8,
        width: "100%",
    },
    smallButton: {
        marginTop: 8,
        backgroundColor: theme.palette.background.lowButton,
        marginRight: 4,
    },
    smallHighlight: {
        marginTop: 8,
        backgroundColor: theme.palette.background.mediumButton,
        marginRight: 4,
    },

    selected: {
        backgroundColor: theme.palette.background.promoted,
    }
    select: {
        borderRadius: 4,
    }
}))

export default function SearchSelect(props) {

    const classes = useStyles();
    const { searchType, setSearchType, previousPicks } = useContext(SearchContext);

    function sortPicks() {
        if (listMode==='recent') {
            return [ ...previousPicks.tracks ].reverse()
        } else {
            var popPicks=previousPicks.tracks.filter(pick => pick.count > 1);
            return [...popPicks].sort((a, b) => (a.count > b.count) ? 1 : -1).reverse()
        }
    }
    
    const handleSelect = (event) => {
        setSearchType(event.target.value);
    }

    return (
        <Select value={searchType}  onChange={handleSelect} disableUnderline className={classes.select}>
            <MenuItem value={"popular"}>Popular</MenuItem>
            <MenuItem value={"recent"}>Recent</MenuItem>
        </Select>
    )
    
}