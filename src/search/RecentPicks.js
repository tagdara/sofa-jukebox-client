import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NetworkContext } from 'network/NetworkProvider';
import { UserContext } from 'user/UserProvider';

import List from '@material-ui/core/List';
import SearchResultItem from 'search/SearchResultItem'

const useStyles = makeStyles(theme => ({
    nopad: {
        padding: 0,
    },
}))

export default function UserPicks(props) {

    const classes = useStyles();
    const [ recentPicks, setRecentPicks ] = useState([]);
    const { getJSON, user } = useContext(NetworkContext);
    const { userById } = useContext(UserContext);
    useEffect(() => {
        getJSON('recent').then(result=>{ console.log('rec', result); setRecentPicks(result.recent.tracks) } )    
        // eslint-disable-next-line 
    }, []);

    function sortPicks() {
        if (!recentPicks) { return [] }

        var recent = [ ...recentPicks ]
        if (props.filterUser) {
            recent = recent.filter(item => userById(item.user).name !== user)
        }
        return recent.reverse().slice(-10)
    }

    return (
        <List className={classes.nopad} >
            { sortPicks().map((track) =>
                <SearchResultItem key={track.id} track={track} popup={props.popup} />
            )}
        </List>
    )
    
}