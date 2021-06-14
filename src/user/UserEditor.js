import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },
    square: {
        marginRight: 16,
        backgroundColor: theme.palette.background.mediumButton,
    },
    info: {
        marginRight: 16,
        color: theme.palette.background.lowButton,
        backgroundColor: "rgba(0,0,0,0)",
    },
    bigButton: {
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    item: {
        minHeight: 60,
    },
    button: {
        maxWidth: "100%",
        margin: 16,
    },
    inputLine: {
        display: "flex",
        flexDirection: "row",
    },
    input: {
        display: "flex",
        flexGrow: 1,
    },
    name: {
        padding: 4,
        flexGrow: 0,
        backgroundColor: "#444",
        borderRadius: 4,
    },
    userAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: theme.palette.background.mediumButton,
    },
    centerRow: {
        display: "flex",
        justifyContent: "center",
    }
}))

export default function UserEditor(props) {

    const classes = useStyles();
    const newUser = { "name": "", "admin": false, "email": "" }
    const user = props.user ? props.user : newUser 
    const [ userPin, setUserPin ] = useState(undefined)
    const [ userName, setUserName ] = useState(user.name)
    const [ userEmail, setUserEmail ] = useState(user.email)
    const [ userAdmin, setUserAdmin ] = useState(user.admin)
    const [ userTimeout, setUserTimeout ] = useState(user.timeout)

    function saveChanges() {
        var userData = { ...user, "name": userName, "email": userEmail, "admin": userAdmin, "timeout": userTimeout }
        if (userPin && userPin.length>3) { userData.password = userPin }
        props.save(userData)
        props.close()
    }

    function deleteUser() {
        if (user.id) {
            props.delete(user.id)
        }
        props.close()
    }

    function toggleTimeout() {
        let timeoutTime = ""
        if (!userTimeout) {
            timeoutTime = new Date();
            timeoutTime = addHoursToDate(timeoutTime, 1).toISOString()
        }
        setUserTimeout(timeoutTime)
        var userData = { ...user, "name": userName, "timeout": timeoutTime }
        props.save(userData)
    }

    function addHoursToDate(date: Date, hours: number): Date {
        return new Date(new Date(date).setHours(date.getHours() + hours));
    }
      
    console.log('userTimeout', userTimeout)

    return (
        <List className={classes.nopad} >
            <ListItem key={user.id} className={classes.centerRow} >
                <Avatar color="primary" className={classes.userAvatar} >{ userName ? userName[0].toUpperCase() : "?" } </Avatar>
            </ListItem> 

            <ListItem className={classes.inputLine}>
                <ListItemText className={classes.input} primary={"User"} />
                <TextField onChange={(e) => setUserName(e.target.value) } className={classes.name}
                            InputProps={{ disableUnderline: true }}
                            value={ userName ? userName : ""} id="user" type="text"  />
            </ListItem> 
            
            <ListItem className={classes.inputLine}>
                <ListItemText className={classes.input} primary={"Email"} />
                <TextField onChange={(e) => setUserEmail(e.target.value) } className={classes.name}
                            InputProps={{ disableUnderline: true }}
                            value={ userEmail ? userEmail : ""} id="email" type="text"  />
            </ListItem> 

            <ListItem className={classes.inputLine}>
                <ListItemText className={classes.input} primary={"PIN"} />
                <TextField onChange={(e) => setUserPin(e.target.value)} className={classes.name}
                            InputProps={{ disableUnderline: true }}
                            id="pin" type="password" 
                            value={ userPin ? userPin : ""} />
            </ListItem> 

            <ListItem className={classes.inputLine}>
                <ListItemText className={classes.input} primary={"Admin"} />
                <Checkbox checked={userAdmin} onChange={(e) => setUserAdmin( e.target.checked )} color="default" inputProps={{ 'aria-label': 'admin' }}/>
            </ListItem> 

            <ListItem className={classes.inputLine}>
                <ListItemText className={classes.input} primary={"Admin"} />
                <Checkbox checked={userAdmin} onChange={(e) => setUserAdmin( e.target.checked )} color="default" inputProps={{ 'aria-label': 'admin' }}/>
            </ListItem> 

            <ListItem className={classes.inputLine}>
                <ListItemText className={classes.input} primary={"Timeout"} />
                <Button variant="contained" className={classes.button} onClick={toggleTimeout}>{ userTimeout ? "Release" : "Put in Timeout"}</Button>
            </ListItem> 

            <ListItem className={classes.centerRow}>
                <Button className={classes.button} onClick={deleteUser}><DeleteIcon /></Button>
                <Button className={classes.button} startIcon={<ClearIcon />} onClick={props.close}>Cancel</Button>
                <Button  variant="contained" color="secondary" className={classes.button} startIcon={<DoneIcon />} onClick={saveChanges} >Save</Button>
            </ListItem>
        </List>
    )
    
}