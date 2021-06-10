import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({

    buttonHolder: {
        display: "flex",
        width: "100%",
        backgroundColor: theme.palette.primary.mediumDark,
    },
}))

export default function StackHeader(props) {
    
    const classes = useStyles();
    
    return (
        <ListItem className={classes.buttonHolder}>
            <ListItemText primary={props.name} />
        </ListItem>
  );
}


