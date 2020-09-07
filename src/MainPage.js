import React, {useState, useContext} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';

import Queue from './Queue';
import SearchResults from './SearchResults';
import JukeboxHeader from './JukeboxHeader';
import Actions from './Actions';
import Playlists from './Playlists';

import UserActions from './UserActions';
import AuthLine from './AuthLine';
import PreviousPicks from './PreviousPicks';

import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles(theme => ({
    scrollHolder: {
        display: "flex",
        flex:3,
        paddingBottom: 0,
        marginBottom: 0,
        overflow: "hidden",
        marginLeft: "calc(100vw - 100%)",
        alignContent: "flex-start",
        flexDirection: "column",
        height: "100%",
        backgroundColor: theme.palette.background.area,
        maxWidth: 480,
    },
    wideHolder: {
        display: "flex",
        flex:3,
        paddingBottom: 0,
        marginBottom: 0,
        overflow: "hidden",
        marginLeft: "calc(100vw - 100%)",
        alignContent: "flex-start",
        flexDirection: "row",
        height: "100%",
        backgroundColor: theme.palette.background.area,
        width: "100%",
    },

    queueHolder: {
        maxWidth: 480,
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        width: "calc(100% - 8px) !important",
        margin: "0px 4px 0px 4px",
    }
}));

export default function MainPage() {
    
    const classes = useStyles();
    const { searchResults, listMode, setListMode, promoteTrack, playlists, setBackupList, ownedPlaylists, addThisTrackToPlaylist,
            userQueue, backupQueue, user, removeTrack, superPromoteTrack, addTrackToPlaylist} = useContext(DataContext);
    const [ userMode, setUserMode]=useState('previous')
    const wideBreakpoint = 960
    const isWide = window.innerWidth > wideBreakpoint;
    
    return (
            <div className={ isWide ? classes.wideHolder : classes.scrollHolder}>
                <JukeboxHeader  setListMode={setListMode} listMode={listMode} userMode={userMode} setUserMode={setUserMode} addTrackToPlaylist={addTrackToPlaylist}/>
                    { user.id ?
                    <Scrollbars className={classes.queueHolder}> 
                            { listMode==="search" &&
                                <React.Fragment>
                                { searchResults.length ?
                                    <SearchResults />
                                :
                                    <PreviousPicks setListMode={setListMode} />
                                }
                                </React.Fragment>
                                
                            }
                            { listMode==="actions" &&
                                <Actions  setListMode={setListMode} userMode={userMode} setUserMode={setUserMode} />
                            }
                            { listMode==="playlists" &&
                                <>
                                    <ListItem>
                                        <Button disabled className={classes.bigButton} >Select Backup Playlist</Button>
                                    </ListItem>
                                    <Playlists  action={ setBackupList } playlists={ playlists } />
                                </>
                            }
                            { listMode==="addtoplaylist" &&
                                <>
                                    <ListItem>
                                        <Button disabled className={classes.bigButton} >Add Song to Playlist</Button>
                                    </ListItem>
                                    <Playlists action={ addThisTrackToPlaylist } playlists={ ownedPlaylists() } />
                                </>
                            }
                            { listMode==="previous" &&
                                <UserActions  setListMode={setListMode} userMode={userMode} setUserMode={setUserMode} />
                            }
                            { listMode==="queue" &&
                            <>
                                <Queue queue={userQueue} remove={removeTrack} user={true} />
                                <Queue queue={backupQueue} remove={removeTrack} promoteTrack={promoteTrack} superPromoteTrack={superPromoteTrack} foldable={true} backup={true} />
                            </>
                            }
                    </Scrollbars>
                        :
                    <AuthLine />
                    }
            </div>
  );
}


