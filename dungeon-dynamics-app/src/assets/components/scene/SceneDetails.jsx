import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import LayerDetail from '../layerdisplay/layer/LayerDetail';
import './Scene.css'
// Class component that controls the whole room, and is the highest level of state.

export default function SceneDetails(props) {
    const { layers, key, scene, onCreatingItem, onDeletingItem, onUpdatingItem, onSetActiveScene, onRemoveActiveScene } = this.props;

    const filteredLayers = layers.filter(layer => layer.sceneId.includes(scene.id))
    return (

        <div className="scene details">

            <input onInput={event => onUpdatingItem(scene.id, "scene", { "name": event.currentTarget.value })} value={scene.name} className="sceneHeader"></input>
            <div className="buttons">

                <button className="icon button" alt="Edit" ><span className="icon">&#9998;</span></button>

                <button onClick={onRemoveActiveScene} className="icon button" alt="Details" ><span className="icon">&#215;</span></button>

            </div>

            <div className="layer">
                {filteredLayers.length > 0 ? filteredLayers.map(layer => (
                    <div id={"layer" + layer.id} key={layer.id}>
                        <LayerDetail onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={layer.id} layer={layer} ></LayerDetail>
                    </div>
                )) :
                    <div id="noLayer">
                        <p className="layerText">No layers in this scene yet!</p>
                    </div>

                }
            </div>

        </div >

    )
}
