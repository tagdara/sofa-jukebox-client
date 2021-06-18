import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'user/UserProvider';

import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },
    square: {
        marginRight: 16,
        backgroundColor: "rgba(0,0,0,0)",
        color: theme.palette.background.lowButton,
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
    labelLine: {
        width: "100%",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0 6px 0 0",
        display: "flex",
    },
    volumeLine: {
        width: "100%",
        boxSizing: "border-box",
        padding: "0 10px 0 10px",
        display: "flex",
    },
    labelSlider: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    speakerLabel: {
        padding: "0 0 0 8px",
        margin: 0,
        flexGrow: 1,
    },
    inputSelect: {
        padding: "8px !important",
        paddingRight: "32px !important",
        borderRadius: "4px !important",
//        padding: 2,
//        marginLeft: 4,
//        backgroundColor:  theme.palette.background.lowButton,
    },
    speakerCard: {
        margin: 4,
        padding: 8,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
    },
    onSpeakerBlock: {
        margin: 4,
        marginBottom: 16,
        padding: "0 8px 8px 8px",
        borderLeft: 4,
        borderLeftColor: theme.palette.primary.main,
        borderLeftStyle: "solid",
        display: "flex",
        flexDirection: "column",
    },
    offSpeakerBlock: {
        margin: 4,
        marginBottom: 16,
        padding: "0 8px",
        borderLeft: 4,
        borderLeftColor: theme.palette.background.paper,
        borderLeftStyle: "solid",
        display: "flex",
        flexDirection: "column",
    },
    sliderRoot: {
        padding: "12px 0",
    },
    sliderRootMax: {
        color: theme.palette.admin.main,
        padding: "12px 0",
    }
}))

export default function SpeakerCard(props) {

    const classes = useStyles();
    const { isAdmin } = useContext(UserContext)
    const [ volume, setVolume ] = useState(props.speaker.vol_percent)
    const [ maxVolume, setMaxVolume ] = useState(props.speaker.max_volume_percent)
    const [ showMax, setShowMax ] = useState(false)
    const on = props.speaker.power === "on"
//    const mute = props.speaker.mute === "on"
    const label = props.speaker.name.endsWith(' Speakers') ? props.speaker.name.replace(' Speakers','') : props.speaker.name

    useEffect(() => {
        setVolume(props.speaker.vol_percent)
        setMaxVolume(props.speaker.max_volume_percent)
    // eslint-disable-next-line 
    }, [ props.speaker ]);

    function changePower(event) {
        console.log('event.target', event.target.value)
        if (!on) {
            props.changePower(props.speaker.id, 'on')
        } else {
            props.changePower(props.speaker.id, 'off')
        }
    }

    function changeInput(event) {
        console.log('input event.target', event.target.value)
        var inputValue = event.target.value
        props.changeInput(props.speaker.id, inputValue)
    }

    function changeVolume(event, volumeValue) {
        setVolume(volumeValue)
        console.log('volume event.target', event.target.value)
        //var volumeValue = event.target.value
        props.changeVolume(props.speaker.id, volumeValue)
    }

    function changeDisplayVolume(event, volumeValue) {
        setVolume(volumeValue)
    }


    function changeMaxVolume(event, volumeValue) {
        setMaxVolume(volumeValue)
        console.log('MAX volume event.target', volumeValue)
        //var volumeValue = event.target.value
        props.changeMaxVolume(props.speaker.id, volumeValue)
    }

    function changeDisplayMaxVolume(event, volumeValue) {
        console.log('displaymax', volumeValue)
        setMaxVolume(volumeValue)
    }

    function toggleShowMax() {
        if (!isAdmin()) { return false}
        setShowMax(!showMax)
    }

    return (
        <div className={ on ? classes.onSpeakerBlock : classes.offSpeakerBlock}>
            <div className={classes.labelLine} >
            <Switch checked={on} onChange={ changePower } />
                <Typography className={classes.speakerLabel} onClick={ () => toggleShowMax() }>{ label }</Typography>
                { (!showMax && on) && 
                <Select variant="filled" classes={{ select : classes.inputSelect}} value={props.speaker.input_name} onChange={changeInput} disableUnderline className={classes.ixnputSelect} disabled = { !on } >
                    <MenuItem value={'Jukebox'}>Jukebox</MenuItem>
                    <MenuItem value={'Airplay'}>Airplay</MenuItem>
                </Select>
                }
                { showMax && <Typography onClick={ () => toggleShowMax() }>Set Max</Typography> }
            </div>
            { (!showMax && on) && 
            <div className={classes.volumeLine} >
                <Slider
                    classes={{ root: classes.sliderRoot }}
                    onChange={ changeDisplayVolume }
                    onChangeCommitted = { changeVolume }
                    value={ volume }
                    valueLabelDisplay="auto"
                    step={props.speaker.max_volume_percent ? props.speaker.max_volume_percent / 10 : 10 }
                    marks
                    min={0}
                    max={props.speaker.max_volume_percent ? props.speaker.max_volume_percent : 100}
                    disabled = { !on }
                />
            </div>
            }
            { (isAdmin() && showMax) && 
            <div className={classes.volumeLine} >
                <Slider
                    classes={{ root: classes.sliderRootMax }}
                    onChange={ changeDisplayMaxVolume }
                    onChangeCommitted = { changeMaxVolume }
                    value={ maxVolume }
                    valueLabelDisplay="auto"
                    step={10 }
                    min={0}
                    max={100}
                    marks
                />
            </div>
            }
        </div>
    )
    
}