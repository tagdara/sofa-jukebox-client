import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({

    smallName: {
        width: "100%",
        lineHeight: "1.1",
        marginBottom:2,
        color: "#fff",
    },
    largeName: {
        paddingTop: 12,
        width: "100%",
        lineHeight: "1.1",
        marginBottom:2,
        color: "#fff",
        textAlign: "center",
    },
    largeTitleBlock: {
        width: "100%",
        overflow: "hidden",
        padding: 4,
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    smallTitleBlock: {
        overflow: "hidden",
        paddingLeft: 16,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
    },
    largeBase: {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    smallBase: {
        display: "flex",
    },
    largeCover: {
        height: "auto",
        maxWidth: "70%",
        alignSelf: "flex-start",
        margin: "0 auto",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);",
    },
    largeIcon: {
        background: "#222",
        flexGrow: 1,
        height: "auto",
        maxWidth: "70%",
        alignSelf: "flex-start",
        margin: "0 auto",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);",
        color: "#FF4500",
        padding: "20%",
    },
    smallCover: {
        height: 50,
        width: 50,
    },
    progress: {
        marginTop: 8,
        height: 1,
        width: "80%"
    }
}));

export default function SongTopLarge(props) {
    
    const classes = useStyles();
    const [percent, setPercent]=useState(0)
    const [pos, setPos]=useState(undefined)
    const [oldPos, setOldPos]=useState(undefined)

    useEffect(() => {
        const interval = setInterval(() => {
            //console.log(props.nowPlaying.position, Math.round(100*(pos/props.nowPlaying['length'])));
            if (props.nowPlaying.position) {
                if (oldPos!==props.nowPlaying.position) {
                    setPos(props.nowPlaying.position)
                    setOldPos(props.nowPlaying.position)
                } else {
                    setPos(pos+1)
                }
                setPercent(Math.round(100*(pos/props.nowPlaying.length)))
            }
        }, 1000);
        return () => { clearInterval(interval) };
    }, [props.nowPlaying.position, props.nowPlaying.length, oldPos, pos]);
    

    return (
        <div className={props.large ? classes.largeBase : classes.smallBase } >
            { (props.nowPlaying && props.nowPlaying.id) ?
                <img
                    className={props.large ? classes.largeCover : classes.smallCover }
                    src={ props.nowPlaying.art }
                    title={ props.nowPlaying.name }
                    alt={ props.nowPlaying.name }
                    onClick={ props.changeSongView }
                />
                : 
                <QueueMusicIcon className={props.large ? classes.largeIcon : classes.smallCover } />
            }
            <div className={  props.large ? classes.largeTitleBlock : classes.smallTitleBlock } >
                <Typography variant={ props.large ? "h6" : "body1" } className={props.large ? classes.largeName : classes.smallName }>
                    {(props.nowPlaying && props.nowPlaying.id) ? props.nowPlaying.name : "Not playing"}
                </Typography>
                <Typography variant={ props.large ? "subtitle1" : "body2" }>
                    {(props.nowPlaying && props.nowPlaying.id) ? props.nowPlaying.artist : "."}
                </Typography>
            </div>
            {props.large &&
                <LinearProgress className={classes.progress} variant="determinate" value={percent} />
            }
        </div>
    )
}


