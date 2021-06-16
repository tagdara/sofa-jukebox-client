import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NowPlayingContext } from 'nowPlaying/NowPlayingProvider';

import SongProgressBar from 'nowPlaying/SongProgressBar';
import CoverArt from 'nowPlaying/CoverArt'
import TitleAndArtist from 'nowPlaying/TitleAndArtist'
import PlayPauseSkip from 'nowPlaying/PlayPauseSkip'

const useStyles = makeStyles(theme => ({

    smallCoverHolder: {
        flex: 0,
        minHeight: 0,/* new */
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    smallTop: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "8px 8px 8px 8px",
        boxSizing: "border-box",
    },
    largeTop: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingTop: 8,
        boxSizing: "border-box",
    },
    collapse: {
        width: "100%",
    }
}));

export default function SongTop(props) {
    
    const classes = useStyles();
    const { isPlaying, playbackControl, nowPlaying } = useContext(NowPlayingContext);

    return (
        <div className={ props.small ? classes.smallTop : classes.largeTop  } >
            <CoverArt nowPlaying={ nowPlaying } small={props.small } onClick={props.coverClick} />
            <TitleAndArtist nowPlaying={ nowPlaying } small={props.small } />
            { props.small && <PlayPauseSkip /> }
            { !props.small && 
                <SongProgressBar    position={nowPlaying.position} 
                                    duration={nowPlaying.length} isPlaying={isPlaying} playbackControl={playbackControl} /> 
            }
        </div>
    )
}


