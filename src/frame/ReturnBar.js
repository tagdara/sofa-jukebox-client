import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutContext } from 'layout/LayoutProvider';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({

    buttonGrid: {
        paddingTop: 8,
        display: "flex",
        alignItems: "center",
        paddingBottom: 4,
    },
    buttonMargin: {
        marginLeft: 4,
    },
    buttonSpacer: {
        flexGrow: 1,
    },
    actionsLabel: {
        width: "100%",
        color: theme.palette.primary.main,
    },
    returnBar: {
        minHeight: 64,
        display: "flex",
        flexGrow: 1,
        padding: "8px 16px",
        alignItems: "center",

    }
}))

export default function ReturnBar(props) {

    const classes = useStyles();
    const { setListMode, listMode } = useContext(LayoutContext);

    
    function actionBarLabel() {
        if (listMode==="playlists") return "Select a Playlist"
        if (listMode==="addtoplaylist") return "Add Song to Playlist"
        if (listMode==="devices") return "Select Playback Device"
        return "Choose an Action"
    }
    
    function actionBack() {
        if (listMode==="preview")  {
            setListMode("playlists") 
        } else {
            setListMode('queue')
        }
    }

    return (
        <div className={classes.returnBar}>
            <Typography className={classes.actionsLabel}>
                { props.label ? props.label : actionBarLabel() }
            </Typography>
            <IconButton size={"small"} color="secondary" variant="contained" onClick={() => actionBack()  } >
                <ClearIcon />
            </IconButton>
        </div>
    )
    
}