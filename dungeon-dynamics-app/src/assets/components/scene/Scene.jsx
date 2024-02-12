import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Layer from '../layerdisplay/layer/layer';
import './Scene.css'
// Class component that controls the whole room, and is the highest level of state.

export default function Scene(props) {
    const { layers, key, scene, onCreatingItem, onDeletingItem, onUpdatingItem, onSetActiveScene, onRemoveActiveScene, environments } = this.props;

    const filteredLayers = layers.filter(layer => layer.sceneId.includes(scene.id))
    const handleDropDown = (event) => {
        onUpdatingItem(scene.id, "scene", { environmentId: event.target.value })
    }
    return (

        <div className="scene">

            <input onInput={event => onUpdatingItem(scene.id, "scene", { "name": event.currentTarget.value })} value={scene.name} className="sceneHeader"></input>
            <select value={scene.environmentId} onChange={handleDropDown}>
                {environments.map((environment) => (
                    <option key={environment} value={environment.id}>{environment.name}

                    </option>
                ))}
            </select>
            <div className="buttons">



                <button onClick={() => onSetActiveScene(scene.id)} className="icon button" alt="Edit" ><span className="icon">&#9998;</span></button>

            </div>

            <div className="layer">
                {filteredLayers.length > 0 ? filteredLayers.map(layer => (
                    <div id={"layer" + layer.id} key={layer.id}>
                        <Layer onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={layer.id} layer={layer} ></Layer>
                    </div>
                )) :
                    <div id="noLayer">
                        <p className="layerText">No Layers</p>
                    </div>

                }
            </div>

        </div >

    )
}
