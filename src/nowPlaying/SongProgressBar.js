import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


const PositionSlider = withStyles({
    root: {
        marginTop: 4,
        marginBottom: 8,
        height: 2,
        width: "80%",
        alignSelf: "center",
        padding: 0,
    },    
    thumb: {
        height: 4,
        width: 4,
        marginTop: -1,
        marginLeft: 0,
    }
})(Slider);

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}

export default function SongProgressBar(props) {
    
    const [percent, setPercent]=useState(0)
    const [pos, setPos]=useState(undefined)
    const [oldPos, setOldPos]=useState(undefined)

    useInterval(() => {
        if (props.position!==undefined && props.isPlaying) {
            if (oldPos!==props.position) {
                setPos(props.position)
                setOldPos(props.position)
            } else {
                setPos(pos+1)
            }
            var newpercent=Math.round(100*(pos/props.duration))
            if (newpercent>100) { newpercent=100}
            if (newpercent<0) { newpercent=0}
            setPercent(newpercent)
        }
    }, 1000);
    
    const handleChange = (event, value) => {
        var newpos=Math.round(value * (props.duration/100))
        props.playbackControl('seek', newpos)
        setPos(newpos)
        setPercent(value)
    };
    
    
    return (
        <PositionSlider value={percent} onChangeCommitted = {handleChange} />  
    )
}


