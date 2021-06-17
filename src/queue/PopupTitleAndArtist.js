import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutContext } from 'layout/LayoutProvider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({

    smallName: {
        width: "100%",
        lineHeight: "1.1",
        marginBottom:4,
        color: "#fff",
        paddingLeft: 8,
        boxSizing: "border-box",
        maxHeight: 34,
        overflow: "hidden",
    },
    largeName: {
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        paddingTop: 12,
        width: "100%",
        lineHeight: "1.1",
        marginBottom:2,
        color: "#fff",
        textAlign: "center",
        overflow: "hidden",
        minHeight: 20,
    },
    smallArtist: {
        width: "100%",
        lineHeight: 1,
        marginBottom:2,
        color: "#fff",
        paddingLeft: 8,
        boxSizing: "border-box",
    },
    largeArtist: {
        boxSizing: "border-box",
        width: "100%",
        color: "#fff",
        textAlign: "center",
    },
    titleBlock: {
        width: "100%",
        padding: 8,
        flexWrap: "wrap",
        justifyContent: "center",
        flex: "0 1 auto",
        height: 72,
        overflow: "hidden",
    },

}));

export default function TitleAndArtist(props) {
    
    const { heights } = useContext(LayoutContext);
    const classes = useStyles(heights);

    return (
        <div className={ classes.titleBlock } >
            <Typography variant={ "subtitle1" } 
                        className={ props.small ? classes.smallName : classes.largeName }
                    >
                        {(props.nowPlaying && props.nowPlaying.id) ? props.nowPlaying.name : "" }
            </Typography>
            <Typography variant={ "subtitle2" }  
                        className={ props.small ? classes.smallArtist : classes.largeArtist }
                    >
                {(props.nowPlaying && props.nowPlaying.id) ? props.nowPlaying.artist : "" }
            </Typography>
        </div>
    )
}


