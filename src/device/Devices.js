import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DeviceContext } from 'device/DeviceProvider';
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
        backgroundColor: theme.palette.background.promoted,
    }

}))

export default function Devices(props) {

    const classes = useStyles();
    const { device, devices, pickDevice} = useContext(DeviceContext);

    return (
        <List className={classes.nopad} >
            { devices.map( spotifyDevice =>
                <ListItem button className={ spotifyDevice.id===device.id ? classes.promoted : classes.item} key={spotifyDevice.id} onClick={()=> pickDevice(spotifyDevice.id)}>
                    <Avatar variant="square" className={classes.square}><SpeakerIcon/></Avatar>
                    <ListItemText primary={spotifyDevice.name} />
                </ListItem>
            )}
        </List>
    )
    
}