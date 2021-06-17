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

export default function PopularPicks(props) {

    const classes = useStyles();
    const { previousPicks } = useContext(SearchContext);

    function sortPicks() {
        var popPicks=previousPicks.tracks.filter(pick => pick.count > 1);
        return [...popPicks].sort((a, b) => (a.count > b.count) ? 1 : -1).reverse()
    }
    
    return (
        <List className={classes.nopad} >
            { sortPicks().map((track) =>
                <SearchResultItem key={track.id} track={track} popup={props.popup} />
            )}
        </List>
    )
    
}