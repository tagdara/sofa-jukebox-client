import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    user: {
        height: 24,
        width: 24,
        fontSize: 12,
        border: "solid 1px #000"
    }
    
}));

export default function UserAvatar(props) {
    
    const classes = useStyles();

    var stringToColor = function(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    return ( props.chip ?
                <Chip
                    style={{ backgroundColor: stringToColor(props.userName) }}
                    label={"Selected by "+props.userName }
                />
            :
                <Avatar style={{ backgroundColor: stringToColor(props.userName) }} className={classes.user} >{ props.userName[0].toUpperCase() }</Avatar> 
    );
}

