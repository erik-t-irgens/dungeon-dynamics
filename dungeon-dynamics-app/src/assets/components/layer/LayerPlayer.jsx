import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Howl, Howler } from 'howler'
import './Layer.css';
// Class component that controls the whole room, and is the highest level of state.

export default function LayerPlayer(props) {
    const { onUpdatingItem, layer, sceneId, setHowlGroup, howl, newSound } = this.props

    const [volume, setVolume] = useState(1.0);
    const handleChange = (event) => {
        // let timer = 10000
        // setInterval
        let prevState = volume;
        layer.howl.fade(prevState, event.currentTarget.value, 100000)
        setVolume(prevState => event.currentTarget.value)
    }




    // console.log("this is layer: " + newSound)

    return (

        <div className="layerDetailButtons">
            <button onClick={() => layer.howl.play()}>Play</button>
            <label>{props.layer.name}</label>
            <input type="range" min="0" max="1" step=".01" value={volume} onChange={handleChange} className="layerButton columnButton" >{props.layer.name}</input>
            <label>{Math.floor(volume * 100) + "%"}</label>
        </div>


    )
}
