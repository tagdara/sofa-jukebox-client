import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NetworkContext } from 'network/NetworkProvider'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import UserEditor from 'user/UserEditor'

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
    }

}))

export default function UserList(props) {

    const classes = useStyles();
    const [ users, setUsers ] = useState([])
    const [ editing, setEditing ] = useState(false)
    const [ selectedUser, setSelectedUser ] = useState(undefined)
    const { postJSON, getJSON } = useContext(NetworkContext);
    
    useEffect(() => {
        getJSON('users').then(result=> { setUsers(result) })    
        // eslint-disable-next-line 
    }, []);

    function saveUser(data) {
        if (data.id) {
            // This is an existing user
            postJSON('users/save', data).then(result=> { setUsers(result) })    
        } else {
            postJSON('users/add', data).then(result=> { setUsers(result) })
        }
    }

    function deleteUser(data) {
        console.log('want to delete', data)
        postJSON('users/del', {"id": data}).then(result=> { setUsers(result) })    
    }

    function editUser(user) {
        setSelectedUser(user)
        setEditing(true)
    }

    function closeEditor() {
        setEditing(false)        
    }

    return (
        editing ?
            <UserEditor user={selectedUser} close={closeEditor} save={saveUser} delete={deleteUser} />
        :
            <List className={classes.nopad} >
                { users.map( user => 
                    <ListItem key={user.id} className={classes.item} onClick={ () => editUser(user) }>
                        <Avatar color="primary" className={classes.square} >{  user.name ? user.name[0].toUpperCase() : "?"  } </Avatar>
                        <ListItemText className={classes.itemtext} primary={ user.name } />
                    </ListItem> 
                )}
                <Button  variant="contained" color="secondary" className={classes.button} 
                        startIcon={<PersonAddIcon />} onClick={ () => editUser(undefined)} >
                            Add User</Button>
            </List>
    )
    
}