import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from 'search/SearchProvider';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import SearchResultItem from 'search/SearchResultItem'

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
    const { searchResults } = useContext(SearchContext);

    return (
        searchResults.length ?
            <List className={classes.list} >
                { searchResults.map((track) =>
                    <SearchResultItem key={track.id} track={track} popup={props.popup} />
                )}
            </List>
        :
        <div className={classes.placeholder}>
            <Typography variant="subtitle1">Search the Spotify catalog by song or artist and your results will appear here.</Typography>
        </div>
    )
    
}