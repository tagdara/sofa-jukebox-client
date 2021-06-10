import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { SearchContext } from 'search/SearchProvider';
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
    },
    select: {
        padding: 8,
        margin: "0 16px",
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
    }
}))

export default function SearchSelect(props) {

    const classes = useStyles();
    const { searchType, setSearchType } = useContext(SearchContext);

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