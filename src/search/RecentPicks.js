import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from 'search/SearchProvider';
import List from '@material-ui/core/List';
import SearchResultItem from 'search/SearchResultItem'

const useStyles = makeStyles(theme => ({
    nopad: {
        padding: 0,
    },
}))

export default function RecentPicks(props) {

    const classes = useStyles();
    const { previousPicks } = useContext(SearchContext);

    function sortPicks() {
        return [ ...previousPicks.tracks ].reverse()
    }
    
    return (
        <List className={classes.nopad} >
            { sortPicks().map((track) =>
                <SearchResultItem key={track.id} track={track} popup={props.popup} />
            )}
        </List>
    )
    
}