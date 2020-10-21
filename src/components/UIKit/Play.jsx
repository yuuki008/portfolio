import React, { useEffect } from 'react'
import { Player, ControlBar } from "video-react";
import Button from '@material-ui/core/Button'
import { play } from 'video-react/lib/actions/player';

const Play = ({video}) => {
    return (
        <Player
            fluid={false}
            width={'600px'}
            autoPlay={true}
            rates={8}
        >
            <ControlBar autoHide={false}/>
            <source
            src={video}
            type="video/mp4"
            />
        </Player>
    )
}

export default Play
