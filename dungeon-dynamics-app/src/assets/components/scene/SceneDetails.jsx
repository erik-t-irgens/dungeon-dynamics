import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import LayerDetail from '../layer/LayerDetail';
import './Scene.css'
// Class component that controls the whole room, and is the highest level of state.

export default function SceneDetails(props) {
    const { layers, key, scene, onCreatingItem, onDeletingItem, onUpdatingItem, onSetEditScene, environments, onRemoveEditScene } = this.props;

    const filteredLayers = layers.filter(layer => layer.sceneId.includes(scene.id))
    const layersNotIncluded = layers.filter(layer => !layer.sceneId.includes(scene.id))

    const handleDropDown = (event) => {
        onUpdatingItem(scene.id, "scene", { environmentId: event.target.value })
    }
    return (

        <div className="scene details">

            <input onInput={event => onUpdatingItem(scene.id, "scene", { "name": event.currentTarget.value })} value={scene.name} className="sceneHeader"></input>
            <select value={scene.environmentId} onChange={handleDropDown}>
                {environments.map((environment) => (
                    <option key={environment} value={environment.id}>{environment.name}

                    </option>
                ))}
            </select>
            <div className="buttons">

                <button className="icon button" alt="Edit" ><span className="icon">&#9998;</span></button>

                <button onClick={onRemoveEditScene} className="icon button" alt="Details" ><span className="icon">&#215;</span></button>

            </div>

            <div className="layer">
                {filteredLayers.length > 0 ? filteredLayers.map(layer => (
                    <div id={"layer" + layer.id} key={layer.id}>
                        <LayerDetail onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={layer.id} sceneId={scene.id} layer={layer} ></LayerDetail>
                    </div>
                )) :
                    <div id="noLayer">
                        <p className="layerText">No layers yet!</p>
                    </div>

                }
                {layersNotIncluded.length > 0 ? <div><p>Add Layers?</p>
                    <div class="layerAddBox">
                        {layersNotIncluded.map((layer) => (
                            <button className="addLayerButton" onClick={() => onUpdatingItem(layer.id, "layer", { sceneId: [...layer.sceneId, scene.id] })} key={layer}>{layer.name || "layer"}
                            </button>
                        ))}
                    </div></div> : <p>No Layers To Add</p>}

            </div>

        </div >

    )
}
