import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Howl, Howler } from 'howler'
import './Layer.css';
// Class component that controls the whole room, and is the highest level of state.

export default function Layer(props) {
    const { layer, onUpdatingItem } = this.props

    const [renameVisible, setRenameVisible] = useState(false)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setRenameVisible(false);
        }
    }

    return (

        <div className="layerDetailButtons">

            <button className="layerButton" onClick={() => setRenameVisible((renameVisible) => !renameVisible)}>{props.layer.name}</button>
            {renameVisible ?

                <input onKeyDown={handleKeyDown} onInput={event => onUpdatingItem(layer.id, "layer", { "name": event.currentTarget.value })} value={layer.name} className="layerButton"></input>

                : null}

            {/* <button className="loopButton" onClick={() => props.onUpdatingItem(props.layer.id, "layer", { loopable: !props.layer.loopable })}></button> */}
        </div>


    )
}
