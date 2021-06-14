import React, { useEffect, useContext, useState } from 'react';
import { NetworkContext } from 'network/NetworkProvider';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';

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
        display: "flex",
        flexDirection: "row",
    },
    header: {
        fontSize: 16,
        justifyContent: "flex-end",
        display: "flex",
    }
}));

export default function Login(props) {
    
    const { login, getStorage, checkToken, userInTimeout } = useContext(NetworkContext);
    const [user, setUser] = useState(getStorage('user'))
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const classes = useStyles();
    
    useEffect(() => {
        checkToken()
        if (userInTimeout) {
            setErrorMessage('You Are In Time Out')
        }
    // eslint-disable-next-line         
    }, [])    
    
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
        <div className={classes.cardHolder}>
            <Card className={classes.card} >
                <CardHeader className={classes.header} title="Jukebox" />
                <CardContent>
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
                </CardContent>
                <CardActions>
                    <Button variant={"contained"} color="primary" fullWidth onClick={ ()=> checkLogin()}>
                        LOGIN
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
};