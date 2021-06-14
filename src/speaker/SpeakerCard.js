import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
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
        borderRadius: 4,
        padding: 4,
        backgroundColor:  theme.palette.background.lowButton,
    },
    speakerCard: {
        margin: 4,
        padding: 8,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
    }

}))

export default function SpeakerCard(props) {

    const classes = useStyles();
    const [ volume, setVolume] = useState(props.speaker.vol_percent)
    const on = props.speaker.power === "on"
//    const mute = props.speaker.mute === "on"
    const label = props.speaker.name.endsWith(' Speakers') ? props.speaker.name.replace(' Speakers','') : props.speaker.name

    useEffect(() => {
        setVolume(props.speaker.vol_percent)
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

    return (
        <Card className={classes.speakerCard}>
            <div className={classes.labelLine} >
            <Switch checked={on} onChange={ changePower } />
                <Typography className={classes.speakerLabel}>{ label }</Typography>
                <Select value={props.speaker.input_name} onChange={changeInput} disableUnderline className={classes.inputSelect} disabled = { !on } >
                    <MenuItem value={'Jukebox'}>Jukebox</MenuItem>
                    <MenuItem value={'Airplay'}>Airplay</MenuItem>
                </Select>
            </div>
            <div className={classes.volumeLine} >
                <Slider
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
        </Card>
    )
    
}