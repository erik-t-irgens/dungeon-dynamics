import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import LayerDetail from '../layer/LayerDetail';
import './Scene.css'
// Class component that controls the whole room, and is the highest level of state.

export default function ScenePlayer(props) {
    const { layers, key, scene, onCreatingItem, onDeletingItem, onUpdatingItem, onSetEditScene, onRemoveEditScene, onRemoveActiveScene } = this.props;

    const filteredLayers = layers.filter(layer => layer.sceneId.includes(scene.id))
    const layersNotIncluded = layers.filter(layer => !layer.sceneId.includes(scene.id))


    return (

        <div className="scene player">

            <input onInput={event => onUpdatingItem(scene.id, "scene", { "name": event.currentTarget.value })} value={scene.name} className="sceneHeader"></input>
            <div className="buttons">



                <button onClick={onRemoveActiveScene} className="icon button" alt="Player" ><span className="icon">&#215;</span></button>

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
