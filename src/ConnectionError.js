import React, {useContext} from 'react';
import { NetworkContext } from './NetworkProvider';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

export default function ConnectionError() {
    
    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }
    
    return (
        <ListItem>
            <Button onClick={()=> reloadPWA() } >Server Disconnected</Button>
        </ListItem>
  );
}


