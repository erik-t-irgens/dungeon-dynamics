import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Howl, Howler } from 'howler'
import './Layer.css';
// Class component that controls the whole room, and is the highest level of state.

export default function LayerPlayer(props) {
    const { onUpdatingItem, layer, sceneId, setHowlGroup, howl, newSound } = this.props

    const [volume, setVolume] = useState(100);
    const handleChange = (event) => {
        setVolume(volume => event.currentTarget.value)
    }




    console.log("this is layer: " + newSound)

    return (

        <div className="layerDetailButtons">
            <button onClick={() => newSound.play()}>Play</button>
            <label>{props.layer.name}</label>
            <input type="range" min="0" max="100" value={volume} onChange={handleChange} className="layerButton columnButton" >{props.layer.name}</input>
            <label>{volume + "%"}</label>
        </div>


    )
}
