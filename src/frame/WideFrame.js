import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { NowPlayingContext } from 'nowPlaying/NowPlayingProvider';
import { LayoutContext } from 'layout/LayoutProvider';
import { QueueContext } from 'queue/QueueProvider';
import { PlaylistContext } from 'playlist/PlaylistProvider';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Queues from 'queue/Queues';
import QueueAddButton from 'queue/QueueAddButton';
import SearchResultsOrSuggestions from 'search/SearchResultsOrSuggestions';
import JukeboxHeader from 'nowPlaying/JukeboxHeader';
import ActionList from 'action/ActionList';
import Devices from 'device/Devices';
import Playlists from 'playlist/Playlists';

import PreviewPlaylist from 'playlist/PreviewPlaylist';
import SearchBox from 'search/SearchBox';
import StackHeader from 'frame/StackHeader';
import ReturnBar from 'frame/ReturnBar';
import SpeakerList from 'speaker/SpeakerList'
import UserList from 'user/UserList'

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
    xcolumn: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        flexGrow: 1,
        width: "100%",
    },
    column: {
        position: "relative",
    },
    addButton: {
        maxWidth: "80%",
        margin: 16,
    }
}));

export default function WideFrame() {

    
    const { showExpanded, heights, listMode, setListMode, } = useContext(LayoutContext);
    const classes = useStyles(heights);
    const { preview } = useContext(PlaylistContext);
    const { addThisTrackToPlaylist } = useContext(NowPlayingContext);
    const { addRadioTracks, setBackupList } = useContext(QueueContext);

    function bigCover() {
        // tbd make big display kiosk mode?
    }

    console.log('listmode', listMode)

    return (
        <>
            <Grid item xs={showExpanded ? 4 : 6} className={classes.column}>
                <JukeboxHeader coverClick={bigCover} small={ false }  /> 
                { !showExpanded &&
                    <Button fullWidth className={classes.addButton} onClick={() => setListMode('search')}>Add Songs</Button>
                }
            </Grid>
            <Grid item xs={showExpanded ? 4 : 6} className={classes.column}>
                <StackHeader name={"Queue"} />
                <Scrollbar style={{ width: "100%" }} >
                    <Queues scrollUnfold={true} />
                </Scrollbar>
                <QueueAddButton />
            </Grid>
            { showExpanded &&
                <Grid item xs={4} className={classes.xsearchBlock}>
                    { listMode === 'search' &&
                        <>
                            <StackHeader name={"Search"} />
                            <SearchBox />
                            <Scrollbar style={{ width: "100%" }} >     
                                <SearchResultsOrSuggestions />
                            </Scrollbar>
                        </>
                    }
                    { listMode === "playlists" &&
                        <>
                            <StackHeader name={"Playlists"} />
                            <ReturnBar label={"Select a Playlist"}/>
                            <Playlists action={ setBackupList } />
                        </>
                    }
                    { listMode==="actions" &&
                        <Scrollbar  style={{ width: "100%" }}>
                            <ActionList />
                        </Scrollbar>
                    }
                    { listMode==="devices" &&
                        <Scrollbar  style={{ width: "100%" }}>
                            <Devices />
                        </Scrollbar>
                    }
                    { listMode==="preview" &&
                        <Scrollbar  style={{ width: "100%" }}>
                            <PreviewPlaylist playlist={ preview } addRadioTracks={addRadioTracks} />
                        </Scrollbar>
                    }
                    { listMode==="addtoplaylist" &&
                        <Scrollbar  style={{ width: "100%" }}>
                            <Playlists action={ addThisTrackToPlaylist } owned={true}  />
                        </Scrollbar>
                    }
                    { listMode === "speakers" &&
                        <>
                            <ReturnBar label={"Adjust input and volume"}/>
                            <Scrollbar style={{ width: "100%" }} >
                                <SpeakerList />
                            </Scrollbar>
                        </>
                    }  
                    { listMode==="users" &&
                        <>
                            <ReturnBar label={"Add or edit users"}/>
                            <Scrollbar style={{ width: "100%" }}  >
                                <UserList />
                            </Scrollbar>
                        </>
                    }
                </Grid>
            }
        </>
    )
}


