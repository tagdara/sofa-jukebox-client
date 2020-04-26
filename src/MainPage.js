import React, {useState, useContext} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { DataContext } from './DataProvider';

import Queue from './Queue';
import SearchResults from './SearchResults';
import JukeboxHeader from './JukeboxHeader';
import UserActions from './UserActions';
import AuthLine from './AuthLine';
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
        minWidth: "100%",
        height: "100%",
        backgroundColor: theme.palette.background.area,
    },
    queueHolder: {
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        maxWidth: 480,
        minWidth: 320,
        margin: "0 8px 0 8px",
    }
}));

export default function MainPage() {
    
    const classes = useStyles();
    const { listMode, setListMode, promoteTrack, userQueue, backupQueue, user, removeTrack, superPromoteTrack, addTrackToPlaylist} = useContext(DataContext);
    const [ userMode, setUserMode]=useState('previous')

    return (
            <div className={classes.scrollHolder}>
                <JukeboxHeader  setListMode={setListMode} listMode={listMode} userMode={userMode} setUserMode={setUserMode} addTrackToPlaylist={addTrackToPlaylist}/>
                    { user.id ?
                    <Scrollbars className={classes.queueHolder}> 
                            { listMode==="search" &&
                                <SearchResults />
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


