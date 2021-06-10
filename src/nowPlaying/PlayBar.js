import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NowPlayingContext } from 'nowPlaying/NowPlayingProvider';
import { LayoutContext } from 'layout/LayoutProvider';
import { QueueContext } from 'queue/QueueProvider';
import IconButton from '@material-ui/core/IconButton';

import SettingsIcon from '@material-ui/icons/Settings';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipIcon from '@material-ui/icons/SkipNext';
import SpeakerIcon from '@material-ui/icons/Speaker';

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
    playBar: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        width: "100%",
    }
}))

export default function PlayBar(props) {

    const classes = useStyles();
    const { emptyQueue } = useContext(QueueContext);
    const { setListMode } = useContext(LayoutContext);
    const { isPlaying, playbackControl } = useContext(NowPlayingContext);

    return (
        <div className={classes.playBar}>
            <IconButton color="secondary" className={classes.buttonMargin} variant="contained" onClick={() => setListMode('speakers')}>
                <SpeakerIcon />
            </IconButton>

            <div className={classes.buttonSpacer}></div>
            { isPlaying ?
                <IconButton variant="contained" color="secondary" className={classes.buttonMargin} onClick={() => playbackControl('pause')}>
                    <PauseIcon />
                </IconButton>
            :
                <IconButton variant="contained" color="secondary" className={classes.buttonMargin} onClick={() => playbackControl('play')}>
                    <PlayIcon />
                </IconButton>
            }
            { !emptyQueue &&
                <IconButton  variant="contained" color="secondary" className={classes.buttonMargin} onClick={() => playbackControl('next')}><SkipIcon /></IconButton>
            }
            <div className={classes.buttonSpacer}></div>
            <IconButton color="secondary" className={classes.buttonMargin} variant="contained" onClick={() => setListMode('actions')}>
                <SettingsIcon />
            </IconButton>
        </div>
    )
    
}