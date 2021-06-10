import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutContext } from 'layout/LayoutProvider';

import QueueMusicIcon from '@material-ui/icons/QueueMusic';

const useStyles = makeStyles(theme => ({

    largeCover: {
        maxHeight: heights => heights.halfHeight - 141,
        objectFit: "contain",
        minHeight: 0,
        maxWidth: "100%",
        width: "auto",
        height: "auto",
        margin: "0 auto",
        filter: "drop-shadow(0px 4px 8px rgba(0,0,0,.4)) drop-shadow(0px 6px 20px rgba(0,0,0,.4));",
    },
    largeIcon: {
        flexGrow: 1,
        maxHeight: heights => heights.halfHeight - 141,
        height: "50%",
        width: "auto",
        alignSelf: "flex-start",
        margin: "0 auto",
        //color: "#FF4500",
        color: "#333",
    },
    smallCover: {
        height: 50,
        width: 50,
    },
}));

export default function CoverArt(props) {
    
    const { heights } = useContext(LayoutContext);
    const classes = useStyles(heights);

    return (
        (props.nowPlaying && props.nowPlaying.id) ?
            <img
                className={props.small ? classes.smallCover : classes.largeCover }
                src={ props.nowPlaying.art }
                title={ props.nowPlaying.name }
                alt={ props.nowPlaying.name }
                onClick={ props.onClick }
            />
        : 
            <QueueMusicIcon className={props.small ? classes.smallCover : classes.largeIcon  } onClick={ props.onClick } />
    )
}
