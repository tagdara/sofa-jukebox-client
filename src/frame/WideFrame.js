import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { NowPlayingContext } from 'nowPlaying/NowPlayingProvider';
import { LayoutContext } from 'layout/LayoutProvider';
import { QueueContext } from 'queue/QueueProvider';
import { PlaylistContext } from 'playlist/PlaylistProvider';

import Grid from '@material-ui/core/Grid';
import Queues from 'queue/Queues';
import SearchResultsOrSuggestions from 'search/SearchResultsOrSuggestions';
import JukeboxHeader from 'nowPlaying/JukeboxHeader';
import ActionList from 'action/ActionList';
import Devices from 'device/Devices';
import Playlists from 'playlist/Playlists';

import PreviewPlaylist from 'playlist/PreviewPlaylist';
import SearchBox from 'search/SearchBox';
import StackHeader from 'frame/StackHeader';

import { Scrollbar } from 'react-scrollbars-custom';

const useStyles = makeStyles(theme => ({
    queueBlock: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: heights => heights.blockHeight,
        minHeight: heights => heights.blockHeight,
        padding: "8px 8px 0px 8px",
        borderRadius: 4,
        boxSizing: "border-box",
        overflow: "hidden",
        borderLeft: "1px solid #111",
    },
    searchBlock: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: heights => heights.blockHeight,
        minHeight: heights => heights.blockHeight,
        padding: "8px 8px 0px 8px",
        borderRadius: 4,
        boxSizing: "border-box",
        overflow: "hidden",
        borderLeft: "1px solid #111",
        position: "relative",
    },
    scrollBlock: {
        flexGrow: 1,
        flexBasis: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: heights => heights.blockHeight,
        padding: 0,
        borderRadius: 4,
        boxSizing: "border-box",
        overflow: "hidden",
        transform: 'translateX(-[CONTAINER_SPACING / 2]px)'
    },    
}));

export default function WideFrame() {

    
    const { showSearch, heights, listMode, setListMode, } = useContext(LayoutContext);
    const classes = useStyles(heights);
    const { preview } = useContext(PlaylistContext);
    const { addThisTrackToPlaylist } = useContext(NowPlayingContext);
    const { addRadioTracks, setBackupList } = useContext(QueueContext);

    function pickListMode() {
        setListMode("playlists")
    }

    function bigCover() {
        // tbd make big display kiosk mode?
    }

    return (
        <>
            <Grid item xs={4} className={classes.searchBlock}>
                <JukeboxHeader coverClick={bigCover} small={ false }  /> />
                <Scrollbar style={{ width: "100%", height: heights.halfHeight }}>
                    { listMode==="actions" &&
                        <ActionList />
                    }
                    { listMode==="devices" &&
                        <Devices />
                    }
                    { listMode==="playlists" &&
                        <Playlists action={ setBackupList } />
                    }
                    { listMode==="preview" &&
                        <PreviewPlaylist playlist={ preview } addRadioTracks={addRadioTracks} />
                    }
                    { listMode==="addtoplaylist" &&
                        <Playlists action={ addThisTrackToPlaylist } owned={true}  />
                    }
                </Scrollbar>
            </Grid>
            <Grid item xs={4} className={classes.queueBlock}>
                <StackHeader name={"Queue"} />
                <Scrollbar >
                    <Queues pickListMode={pickListMode} />
                </Scrollbar>
            </Grid>
            { listMode==="actions" &&
                <Scrollbar>
                    <ActionList />
                </Scrollbar>
            }
            { listMode==="devices" &&
                <Scrollbar>
                    <Devices />
                </Scrollbar>
            }
            { listMode==="playlists" &&
                <Scrollbar>
                    <Playlists action={ setBackupList } />
                </Scrollbar>
            }
            { listMode==="preview" &&
                <Scrollbar>
                    <PreviewPlaylist playlist={ preview } addRadioTracks={addRadioTracks} />
                </Scrollbar>
            }
            { listMode==="addtoplaylist" &&
                <Scrollbar>
                    <Playlists action={ addThisTrackToPlaylist } owned={true}  />
                </Scrollbar>
            }
            { showSearch &&
                <Grid item xs={4} className={classes.searchBlock}>
                    <StackHeader name={"Search"} />
                    <SearchBox />
                    <Scrollbar >     
                        <SearchResultsOrSuggestions />
                    </Scrollbar>
                </Grid>
            }
        </>
    )
}


