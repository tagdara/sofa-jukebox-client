import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NowPlayingContext } from 'nowPlaying/NowPlayingProvider';
import { UserContext } from 'user/UserProvider';
import SongProgressBar from 'nowPlaying/SongProgressBar';
import CoverArt from 'nowPlaying/CoverArt'
import TitleAndArtist from 'nowPlaying/TitleAndArtist'
import PlayPauseSkip from 'nowPlaying/PlayPauseSkip'
import UserAvatar from 'queue/UserAvatar'

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
    },
    userIcon: {
        left: "50%",
        right: "50%",
        top: 8,
        justifyContent: "center",
        display: "flex",
        position: "absolute",
    }
}));

export default function SongTop(props) {
    
    const classes = useStyles();
    const { isPlaying, playbackControl } = useContext(NowPlayingContext);
    const { userById } = useContext(UserContext)

    const user = props.nowPlaying.user ? userById(props.nowPlaying.user) : undefined
    const userName = user ? user.name : undefined

    console.log('nowplay', props.nowPlaying)

    return (
        <div className={ props.small ? classes.smallTop : classes.largeTop  } >
            <CoverArt nowPlaying={ props.nowPlaying } small={props.small } onClick={props.coverClick} />
            { ( userName && !props.small ) &&
                <div  className={classes.userIcon}>
                    <UserAvatar userName={userName} chip={true} />
                </div>
            }
            <TitleAndArtist nowPlaying={ props.nowPlaying } small={props.small } />
            { ( props.small && props.controls) && <PlayPauseSkip /> }
            { !props.small && 
                <SongProgressBar    position={props.nowPlaying.position} 
                                    duration={props.nowPlaying.length} isPlaying={isPlaying} playbackControl={playbackControl} /> 
            }
        </div>
    )
}


