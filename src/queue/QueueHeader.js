import React, {useContext} from 'react';
import { LayoutContext } from 'layout/LayoutProvider'

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ListItem from '@material-ui/core/ListItem';

export default function QueueHeader(props) {
    
    const { setListMode } = useContext(LayoutContext);

    return (
        <ListItem>
            <Chip
                avatar={<Avatar alt={props.queue.display} src={props.queue.art} />}
                label={"Music from "+props.queue.display}
                variant="outlined"
                onClick ={ () => setListMode("playlists") }
            />
        </ListItem>
    );
}

