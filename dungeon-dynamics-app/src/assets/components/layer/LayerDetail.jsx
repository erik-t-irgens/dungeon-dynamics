import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Howl, Howler } from 'howler'
import './Layer.css';
// Class component that controls the whole room, and is the highest level of state.

export default function LayerDetail(props) {
    const { onUpdatingItem, layer, sceneId } = this.props

    const [renameVisible, setRenameVisible] = useState(false)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setRenameVisible(false);
        }
    }

    const handleRemoveLayer = () => {
        onUpdatingItem(layer.id, "layer", { sceneId: layer.sceneId.filter(function (scene) { return scene !== sceneId }) })
        onUpdatingItem(layer.id, "howl", { sceneId: layer.sceneId.filter(function (scene) { return scene !== sceneId }) })
    }


    return (

        <div className="layerDetailButtons">

            <button className="deleteButton" onClick={handleRemoveLayer}>&#x2715;</button>

            <button className="layerButton columnButton" onClick={() => setRenameVisible((renameVisible) => !renameVisible)}>{props.layer.name}</button>
            {renameVisible ?

                <input onKeyDown={handleKeyDown} onInput={event => onUpdatingItem(layer.id, "layer", { "name": event.currentTarget.value })} value={layer.name} className="layerButton"></input>

                : null}




        </div>


    )
}
