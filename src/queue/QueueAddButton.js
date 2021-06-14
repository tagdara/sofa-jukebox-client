import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutContext } from 'layout/LayoutProvider';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({

    addMusicButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
        zIndex: 999,
    }
}));

export default function QueueAddButton(props) {

    const classes = useStyles();  
    const { listMode, setListMode } = useContext(LayoutContext);

    if (listMode !== "queue") { return null }

    return (
        <Fab color="primary" aria-label="add" onClick={()=> setListMode('search')} className={classes.addMusicButton} >
            <AddIcon />
        </Fab>
    )

}


