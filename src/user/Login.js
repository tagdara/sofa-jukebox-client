import React, { useEffect, useContext, useState } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { NetworkContext } from 'network/NetworkProvider';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const useStyles = makeStyles(theme => ({
    loginBox: {
        marginTop: "30%",
        margin: "auto",
    },
    controlArea: {
        height: "90%",
        margin: "8px auto",
        maxWidth: 1440,
        boxSizing: "border-box",
        overflowY: "auto",
        width: "100%",
    },
    form: {
        width: "100%",
    },
    card: {
        maxWidth: 480,
        minWidth: 320,
        margin: "20% auto",
        backgroundColor: "#222",
    },
    xcard: {
        maxHeight: 480,
        maxWidth: 640,
        minWidth: 320,
        padding: 8,
        margin: "auto",
        backgroundColor: "#222",
        borderRadius: 6,
        boxSizing: "border-box",
        zIndex: 10,
        color: "#fff",
    },
    cardHolder: {
        margin: 8,
        height: "100%",
    },
    name: {
        padding: 4,
        flexGrow: 0,
        backgroundColor: "#444",
        borderRadius: 4,
    },
    input: {
        display: "flex",
        flexGrow: 1,
    },
    inputLine: {
        maxWidth: "80%",
        color: theme.palette.primary.contrastText,
        display: "flex",
        flexDirection: "row",
    },
    header: {
        fontSize: 16,
        justifyContent: "flex-end",
        display: "flex",
    },
    grayBlock: {
        flexGrow: 1,
        maxWidth: 480,
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
    scrollBlock: {
        margin: 0,
        flexGrow: 1,
        flexBasis: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: 0,
        borderRadius: 4,
        boxSizing: "border-box",
        overflow: "hidden",
        justifyContent: "flex-start",   
    },
    largeIcon: {
        flexGrow: 1,
        maxHeight: heights => heights.halfHeight - 141,
        height: "auto",
        minHeight: 0,
        width: "auto",
        alignSelf: "flex-start",
        margin: "0 auto",
        //color: "#FF4500",
        boxSizing: "border-box",
        padding: 32,
        color: "#000",
    },
}));

export default function Login(props) {
    
    const { heights } = useContext(LayoutContext);
    const { login, getStorage, checkToken, userInTimeout, refreshToken } = useContext(NetworkContext);
    const [user, setUser] = useState(getStorage('user'))
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const classes = useStyles(heights);
    
    useEffect(() => {
        checkToken()
        if (userInTimeout) {
            setErrorMessage('You Are In Time Out')
        }
    // eslint-disable-next-line         
    }, [])    

    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    } 

    function confirmToken(result) {
        if (result) {
            setErrorMessage('')
        } else if (userInTimeout) {
            setErrorMessage('You Are In Time Out')
        } else {
            setErrorMessage('Incorrect credentials')
        }
    }

    function checkLogin() { 
        login(user,password).then(result=>confirmToken(result))
    }

    function keyPress(code) {
        if (code===13) {
            checkLogin()
        }
    }

    return (
        <Grid item xs={12} className={classes.scrollBlock}>
            <div className={classes.grayBlock} >
                <MusicNoteIcon className={props.small ? classes.smallCover : classes.largeIcon  } onClick={ props.onClick } />
                { refreshToken != null  ?
                    <>
                        <ListItem className={classes.inputLine}>
                            <ListItemText className={classes.input} primary={"Connecting " +user} />
                        </ListItem>
                        <ListItem className={classes.inputLine}>
                            <Button color="primary" fullWidth onClick={ ()=> reloadPWA()}>
                                RELOAD
                            </Button>
                        </ListItem>
                    </>
                :
                    <>
                            <ListItem className={classes.inputLine}>
                                <ListItemText className={classes.input} primary={"User"} />
                                <TextField onChange={(e) => setUser(e.target.value) } className={classes.name}
                                    InputProps={{ disableUnderline: true }}
                                    value={user? user : ""} id="user" type="text"  />
                            </ListItem>
                            <ListItem className={classes.inputLine}>
                                <ListItemText className={classes.input} primary={"PIN"} />
                                <TextField onChange={(e) => setPassword(e.target.value)} onKeyDown={ (e) => keyPress(e.keyCode) } className={classes.name}
                                    InputProps={{ disableUnderline: true }}
                                    id="pin" type="password" defaultValue={""}  />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={errorMessage} />
                            </ListItem>
                        <ListItem>
                            <Button variant={"contained"} color="primary" fullWidth onClick={ ()=> checkLogin()}>
                                LOGIN
                            </Button>
                        </ListItem>
                    </>
                }
            </div>
        </Grid>
    )
};