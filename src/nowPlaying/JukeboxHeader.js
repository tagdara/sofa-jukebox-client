import React, { useContext, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';
import { NowPlayingContext } from 'nowPlaying/NowPlayingProvider';
import { UserContext } from 'user/UserProvider';
import { LayoutContext } from 'layout/LayoutProvider';

import AuthLine from 'spotify/AuthLine';
import SongTop from 'nowPlaying/SongTop';
import PlayBar from 'nowPlaying/PlayBar';

const useStyles = makeStyles(theme => ({

    grayBlock: {
        flexGrow: 1,
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 8,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 8,
        boxSizing: "border-box",
        zIndex: 10,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 4,
    },
    colorBlock: {
        flexGrow: 1,
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 8,
        backgroundColor: theme.palette.background.header,
        borderRadius: 8,
        boxSizing: "border-box",
        zIndex: 10,
        boxShadow: "inset 0 -50px 100px 100px "+theme.palette.background.header+", inset 0 -50px 100px 100px "+theme.palette.background.headerHighlight,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 4,
    },
    headerBlock: {
        flexBasis: "0%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        //maxHeight: heights => heights.halfHeight,
        maxHeight: heights => heights.blockHeight,
        minHeight: heights => heights.halfHeight,
        padding: 0,
        borderRadius: 4,
        boxSizing: "border-box",
        overflow: "hidden",
        alignItems: "stretch",
        margin: 4,
    },
    smallHeaderBlock: {
        flexBasis: "unset",
        display: "flex",
        flexDirection: "column",
        maxWidth: 480,
        minWidth: 312,
        padding: 0,
        backgroundColor: theme.palette.primary.mediumDark,
        borderRadius: 4,
        boxSizing: "border-box",
        zIndex: 10,
        boxShadow: "inset 0 -50px 100px 100px #111, inset 0 -50px 100px 100px #FF4500; ",
        flexGrow: 0,
        overflow: "hidden",
    },
    buttonGrid: {
        paddingTop: 0,
        display: "flex",
        alignItems: "center",
        paddingBottom: 0,
 //       minHeight: 48,
        width: "100%",
    },
    actionButtonGrid: {
        width: "100%",
        paddingTop: 0,
        display: "flex",
        alignItems: "center",
        paddingBottom: 0,
        minHeight: 40,
        //backgroundColor: theme.palette.primary.mediumDark,
    },
    buttonMargin: {
        marginLeft: 4,
    },
    buttonSpacer: {
        flexGrow: 1,
    },
}));

export default function JukeboxHeader(props) {

    const { isWide, heights, setHeaderHeight, setListMode} = useContext(LayoutContext);
    const classes = useStyles(heights);     
    const { isAdmin, spotifyAuthenticated, spotifyAuthenticating } = useContext(UserContext)
    const { isPlaying, playbackControl, nowPlaying } = useContext(NowPlayingContext);
 
    const headerRef = useRef(null);
    const colorBackground = (nowPlaying && nowPlaying.id)
   
    useEffect(() => {
        setHeaderHeight(headerRef.current.offsetHeight); 
    // eslint-disable-next-line   
    }, [ props.songView, headerRef] ); 
    
    return (
        <Collapse collapsedHeight={90} in={!props.small}>
            <div ref={headerRef} className={ colorBackground ? classes.colorBlock : classes.grayBlock }>
                <SongTop nowPlaying={nowPlaying} small={( props.small && !isWide) } coverClick={props.coverClick} controls={true} />
                { (isAdmin && !spotifyAuthenticated && !spotifyAuthenticating) &&   
                    <AuthLine />
                }
                { !props.small && 
                    <PlayBar wide={isWide} isPlaying={isPlaying} nowPlaying={nowPlaying} playbackControl={playbackControl} setListMode={setListMode} />
                }
            </div>
        </Collapse>
    )
}


