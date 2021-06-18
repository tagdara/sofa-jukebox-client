import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({

    list: {
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
        padding: 0,
    },

}))

export default function SuggestionHeader(props) {

    const classes = useStyles();
    
//  <ListItemAvatar><Avatar><PersonIcon /></Avatar></ListItemAvatar>

    return (
        <ListItem className={ classes.normal } >

            <ListItemText primary={props.text}/>
        </ListItem>
    )
    
}