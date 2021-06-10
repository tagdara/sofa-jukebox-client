import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NowPlayingContext } from 'nowPlaying/NowPlayingProvider';
import { QueueContext } from 'queue/QueueProvider';

import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkipIcon from '@material-ui/icons/SkipNext';


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
}))

export default function PlayBar(props) {

    const classes = useStyles();
    const { isPlaying, playbackControl } = useContext(NowPlayingContext);
    const { emptyQueue } = useContext(QueueContext)

    return (
        <>
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
        </>
    )
    
}