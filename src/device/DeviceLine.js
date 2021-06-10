import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({

    buttonHolder: {
        display: "flex",
        width: "100%"
    },
}))

export default function DeviceLine(props) {
    
    const classes = useStyles();
    
    return (
        <ListItem className={classes.buttonHolder}>
            <Button variant="contained" color="primary" fullWidth onClick={()=> props.selectDevice() } >Select Device</Button>
        </ListItem>
  );
}


