import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpeakerContext } from 'speaker/SpeakerProvider'
import SpeakerCard from 'speaker/SpeakerCard'

import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({

    nopad: {
        padding: 0,
    },

}))

export default function SpeakerList(props) {

    const classes = useStyles();
    const { speakers, changeInput, changePower, changeVolume } = useContext(SpeakerContext);

    return (
        <List className={classes.nopad} >
            { speakers.map( speaker => 
                <SpeakerCard key={speaker.id} speaker={speaker} changeInput={changeInput} changePower={changePower} changeVolume={changeVolume} />
            )}
        </List>
    )
    
}