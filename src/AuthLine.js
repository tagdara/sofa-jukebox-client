import React, {useContext} from 'react';
import { NetworkContext } from './NetworkProvider';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

export default function AuthLine() {
    
    const { auth } = useContext(NetworkContext);

    return (
        <ListItem>
            <Button onClick={()=> auth() } >Authorize Spotify</Button>
        </ListItem>
  );
}


