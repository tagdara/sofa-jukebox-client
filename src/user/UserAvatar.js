import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    small: {
        height: 24,
        width: 24,
        fontSize: 12,
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
        for (var j = 0; j < 3; j++) {
            var value = (hash >> (j * 8)) & 0xFF;
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
                <Avatar style={{ backgroundColor: stringToColor(props.userName) }} className={props.small && classes.small} >{ props.userName[0].toUpperCase() }</Avatar> 
    );
}

