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
    largeTitleBlock: {
        width: "100%",
        padding: 4,
        flexWrap: "wrap",
        justifyContent: "center",
        flex: "0 1 auto",
        height: 72,
        overflow: "hidden",
    },
    smallTitleBlock: {
        overflow: "hidden",
        paddingLeft: 8,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        flexGrow: 1,
    },
}));

export default function TitleAndArtist(props) {
    
    const { heights } = useContext(LayoutContext);
    const classes = useStyles(heights);

    return (
        <div className={ props.small ?  classes.smallTitleBlock : classes.largeTitleBlock } >
            <Typography variant={ props.small ? "body1" : "h6" } 
                        className={ props.small ? classes.smallName : classes.largeName }
                    >
                        {(props.nowPlaying && props.nowPlaying.id) ? props.nowPlaying.name : "" }
            </Typography>
            <Typography variant={ props.small ? "body2" : "subtitle1" }  
                        className={ props.small ? classes.smallArtist : classes.largeArtist }
                    >
                {(props.nowPlaying && props.nowPlaying.id) ? props.nowPlaying.artist : "" }
            </Typography>
        </div>
    )
}


