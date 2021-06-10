import React, {useContext} from 'react';
import { NetworkContext } from 'network/NetworkProvider';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({

    buttonHolder: {
        display: "flex",
        width: "100%"
    },
}))

export default function AuthLine() {
    
    const { spotifyAuth } = useContext(NetworkContext);
    const classes = useStyles();
    
    return (
        <ListItem className={classes.buttonHolder}>
            <Button variant="contained" color="primary" fullWidth onClick={()=> spotifyAuth() } >Authorize Spotify</Button>
        </ListItem>
  );
}


