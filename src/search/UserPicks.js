import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NetworkContext } from 'network/NetworkProvider';

import List from '@material-ui/core/List';
import SearchResultItem from 'search/SearchResultItem'

const useStyles = makeStyles(theme => ({
    nopad: {
        padding: 0,
    },
}))

export default function UserPicks(props) {

    const classes = useStyles();
    const [ userPicks, setUserPicks ] = useState([]);
    const { getJSON, user } = useContext(NetworkContext);

    useEffect(() => {
        getJSON('user/picks').then(result=>setUserPicks(result))    
        // eslint-disable-next-line 
    }, []);

    return (
        <List className={classes.nopad} >
            { userPicks.slice(-10).map((track) =>
                <SearchResultItem key={track.id} track={track} popup={props.popup} />
            )}
        </List>
    )
    
}