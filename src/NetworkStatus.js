import React, {useContext} from 'react';
import { NetworkContext } from './NetworkProvider';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

export default function NetworkStatus() {
    
    const { connectStream, streamStatus, online } = useContext(NetworkContext);
    
    function getStatusName() {
        if (streamStatus===0) { return "Stream connecting" }
        if (streamStatus===1) { return "Stream open" }
        if (streamStatus===2) { return "Stream closed" }
        return "Stream status unknown ("+streamStatus+")"
    }

    return (
        <ListItem>
            <Button onClick={()=> connectStream() } >{ getStatusName()+ " "+ online }</Button>
        </ListItem>
  );
}


