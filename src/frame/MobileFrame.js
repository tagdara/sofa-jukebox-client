import React, {useState, useContext, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { NowPlayingContext } from 'nowPlaying/NowPlayingProvider';
import { LayoutContext } from 'layout/LayoutProvider';
import { QueueContext } from 'queue/QueueProvider';
import { UserContext } from 'user/UserProvider';
import { PlaylistContext } from 'playlist/PlaylistProvider';

import Grid from '@material-ui/core/Grid';
import Queues from 'queue/Queues';
import QueueAddButton from 'queue/QueueAddButton';
import SearchBox from 'search/SearchBox';
import SearchSelect from 'search/SearchSelect';
import SearchResultsOrSuggestions from 'search/SearchResultsOrSuggestions';
import JukeboxHeader from 'nowPlaying/JukeboxHeader';
import ActionList from 'action/ActionList';
import Devices from 'device/Devices';
import Playlists from 'playlist/Playlists';
import UserList from 'user/UserList'
import SpeakerList from 'speaker/SpeakerList'
import ReturnBar from 'frame/ReturnBar'
import PreviewPlaylist from 'playlist/PreviewPlaylist';
import BlackList from 'blacklist/BlackList'
import { Scrollbar } from 'react-scrollbars-custom';

const useStyles = makeStyles(theme => ({
    mainFrame: {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",   
        transform: 'translateX(-[CONTAINER_SPACING / 2]px)',
        justifyContent: "flex-start",     
    },
    xscrollBlock: {
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
        transform: 'translateX(-[CONTAINER_SPACING / 2]px)',
        justifyContent: "flex-start",
    },   
    scrollBlock: {
        flexGrow: 1,
        flexBasis: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        borderRadius: 4,
        boxSizing: "border-box",
        overflow: "hidden",
        justifyContent: "flex-start",   
    }
}));

export default function MobileFrame(props) {

  
    const { heights, listMode, setListMode, } = useContext(LayoutContext);
    const classes = useStyles(heights);
    const { spotifyUser, inTimeout } = useContext(UserContext);
    const { preview } = useContext(PlaylistContext);
    const { addThisTrackToPlaylist } = useContext(NowPlayingContext);
    const { addRadioTracks, setBackupList } = useContext(QueueContext);
    const [ scrollUnfold, setScrollUnfold] = useState(false)
    const [ shrinkTop, setShrinkTop] = useState(false)
    const [ searchFocus, setSearchFocus ] = useState(true)
    const smallHeader = (listMode !== "queue" || shrinkTop === true ) // Add more small reasons here if needed

    useEffect( () => {
        setScrollUnfold(false) 
    }, [ listMode ] ); 
    

    function handleScroll(e) {
        const bottom = e.scrollHeight - e.scrollTop === e.clientHeight;
        //const top = e.scrollTop === 0 ;
        if (bottom) {
            setScrollUnfold(true)
            setShrinkTop(true)
        }
        //if (top) {
        //    setScrollUnfold(false)
        //    setShrinkTop(false)
        //}
    }

    function chooseBackupList(id) {
        setBackupList(id)
        setListMode('queue')
    }

    function bigTop() {
        setScrollUnfold(false)
        setShrinkTop(false)
    }

    if (inTimeout()) {
        return (
        <Grid item xs={12} className={classes.scrollBlock}>
            <div>Sorry, you're in timeout</div>
        </Grid>
        )
    }

    return (
        <Grid item xs={12} className={classes.scrollBlock}>
            <JukeboxHeader coverClick={bigTop} small={ smallHeader }  />
            { spotifyUser.id &&
            <div className={classes.scrollBlock}>
                { listMode === "speakers" &&
                    <>
                        <ReturnBar label={"Adjust input and volume"}/>
                        <Scrollbar style={{ width: "100%" }} onScroll={ () => setSearchFocus(false) } >
                            <SpeakerList />
                        </Scrollbar>
                    </>
                }  

                { listMode === "search" &&
                    <>
                        <SearchBox setSearchFocus={setSearchFocus} searchFocus={searchFocus}/>
                        <SearchSelect />
                        <Scrollbar style={{ width: "100%" }} onScroll={ () => setSearchFocus(false) } >
                            <SearchResultsOrSuggestions />
                        </Scrollbar>
                    </>
                }     
                { listMode === "actions" &&
                    <>
                        <ReturnBar label={"Choose an Action"}/>
                        <Scrollbar style={{ width: "100%" }}  >
                            <ActionList />
                        </Scrollbar>
                    </>
                }     
                { listMode==="playlists" &&
                    <>
                        <ReturnBar label={"Select a Playlist"}/>
                        <Playlists action={ chooseBackupList } />
                    </>
                }
                { listMode==="preview" &&
                    <>
                        <ReturnBar label={"Return to Playlists"}/>
                        <Scrollbar style={{ width: "100%" }}  >
                            <PreviewPlaylist playlist={ preview } addRadioTracks={addRadioTracks} />
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
                { listMode==="queue" &&
                    <>
                    <Scrollbar style={{ width: "100%" }} onScroll={ handleScroll } >
                        <Queues scrollUnfold={scrollUnfold} />
                    </Scrollbar>
                    <QueueAddButton />
                    </>
                }
                { listMode==="devices" &&
                    <Scrollbar style={{ width: "100%" }}  >
                        <Devices />
                    </Scrollbar>
                }
                { listMode==="blacklist" &&
                    <>
                        <ReturnBar label={"Blocked terms"}/>
                        <Scrollbar style={{ width: "100%" }}  >
                            <BlackList />
                        </Scrollbar>
                    </>
                }
                { listMode==="addtoplaylist" &&
                    <Scrollbar style={{ width: "100%" }}  >
                        <Playlists action={ addThisTrackToPlaylist } owned={true}  />
                    </Scrollbar>
                }
            </div>
            }
        </Grid>
    )
 
}


