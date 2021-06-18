import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import { DeviceContext } from 'device/DeviceProvider';
import { LayoutContext } from 'layout/LayoutProvider';
import { NetworkContext } from 'network/NetworkProvider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SpeakerIcon from '@material-ui/icons/Speaker';

const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },
    square: {
        backgroundColor: "rgba(0,0,0, 0)",
        color: "#777",
        marginRight: 16,
    },
    bigButton: {
        width: "100%",
        backgroundColor: theme.palette.background.lowButton,
    },
    promoted: {
        backgroundColor: theme.palette.background.paper,
    }
}))

export default function Devices(props) {

    const classes = useStyles();
    const { setListMode } = useContext(LayoutContext);
 //   const { device, devices, pickDevice} = useContext(DeviceContext);
    const [ devices, setDevices]=useState([])
    const { getJSON } = useContext(NetworkContext);

    useEffect(() => {
        getJSON('devices').then(result=>{ console.log('devs',result); setDevices(result)} )
        // eslint-disable-next-line 
    }, []);

    function pickDevice(device) {
        console.log('setting device', device)
        getJSON('set_device/'+device).then(result=>console.log(result))
        setListMode('queue')
    }

    return (
        <List className={classes.nopad} >
            { devices.map( spotifyDevice =>
                <ListItem button className={ spotifyDevice.is_active ? classes.promoted : classes.item} key={spotifyDevice.id} onClick={()=> pickDevice(spotifyDevice.id)}>
                    <Avatar variant="square" className={classes.square}><SpeakerIcon/></Avatar>
                    <ListItemText primary={spotifyDevice.name} />
                </ListItem>
            )}
        </List>
    )
    
}