import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Layer from '../layerdisplay/layer/layer';
import './Scene.css'
// Class component that controls the whole room, and is the highest level of state.

export default function Scene(props) {
    const { layers, key, scene, onCreatingItem, onDeletingItem, onUpdatingItem, onSetActiveScene, onRemoveActiveScene } = this.props;

    const filteredLayers = layers.filter(layer => layer.sceneId.includes(scene.id))
    return (

        <div className="scene">

            <input onInput={event => onUpdatingItem(scene.id, "scene", { "name": event.currentTarget.value })} value={scene.name} className="sceneHeader"></input>
            <div className="buttons">

                <button className="icon button" alt="Edit" ><span className="icon">&#9998;</span></button>

                <button onClick={() => onSetActiveScene(scene.id)} className="icon button" alt="Details" ><span className="icon">&#8505;</span></button>

            </div>

            <div className="layer">
                {filteredLayers.length > 0 ? filteredLayers.map(layer => (
                    <div id={"layer" + layer.id} key={layer.id}>
                        <Layer onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={layer.id} layer={layer} ></Layer>
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
