import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NetworkContext } from 'network/NetworkProvider'

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import BlockIcon from '@material-ui/icons/Block';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';


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
        display: "flex",
    },
    newTerm: {
        marginRight: 16,
        flexGrow: 1,
    }

}))

export default function BlackList(props) {

    const classes = useStyles();
    const [ blackListData, setBlackListData ] = useState([])
    const { postJSON, getJSON } = useContext(NetworkContext);
    const [ adding, setAdding] = useState(false)
    const [ newTerm, setNewTerm] = useState("")

    const blackList = blackListData && blackListData.hasOwnProperty('blacklist') ? blackListData.blacklist : []

    useEffect(() => {
        getJSON('blacklist').then(result=> { console.log('result', result); setBlackListData(result) })    
        // eslint-disable-next-line 
    }, []);

    function addTerm(term) {
        let termList = []
        termList.push(term)
        postJSON('blacklist/add', { "terms": termList })
            .then(result=> { console.log('result', result); setBlackListData(result) })    
            .then(setNewTerm(""))
            .then(setAdding(false))
    }

    function delTerm(term) {
        let termList = []
        termList.push(term)
        postJSON('blacklist/del', { "terms": termList }).then(result=> { console.log('result', result); setBlackListData(result) })    
    }

    return (
        <List className={classes.nopad} >
            { blackList.map( item => 
                <ListItem key={item} className={classes.item}>
                    <Avatar color="primary" variant="square" className={classes.square} ><BlockIcon /></Avatar>
                    <ListItemText className={classes.itemtext} primary={ item } />
                    { !adding &&
                        <IconButton size={"small"} onClick={ () => delTerm(item)}><ClearIcon/></IconButton>
                    }
                </ListItem>
            )}
            { adding ?
                <ListItem className={classes.item}>
                    <Avatar color="primary" variant="square" className={classes.square} ><BlockIcon /></Avatar>
                    <TextField onChange={(e) => setNewTerm(e.target.value) } className={classes.newTerm}
                                value={ newTerm ? newTerm : ""}  type="text"  />
                    <IconButton size={"small"}><ClearIcon/></IconButton>
                    <IconButton size={"small"} onClick={ () => addTerm(newTerm)}><CheckIcon/></IconButton>
                </ListItem>
            :
                <ListItem>
                    <Button  variant="contained" color="secondary" className={classes.button} startIcon={<AddIcon />} 
                            onClick={ () => setAdding(true)} >
                        Add Blacklist Term
                    </Button>
                </ListItem>
            }
        </List>
    )
    
}