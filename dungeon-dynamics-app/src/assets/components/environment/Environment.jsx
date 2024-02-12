import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Scene from '../scene/Scene';
import SceneDetails from '../scene/SceneDetails';
import './Environment.css'
// Class component that controls the whole room, and is the highest level of state.

export default function Environment(props) {
    const { scenes, key, environment, onCreatingItem, onDeletingItem, onUpdatingItem, onSetActiveEnvironment, onRemoveActiveEnvironment, onSetEditScene, onRemoveEditScene, editScene, layers, environments, onSetActiveScene, onRemoveActiveScene } = this.props;

    const filteredScenes = scenes.filter(scene => scene.environmentId === environment.id)
    return (

        <div className="environment">

            <input onInput={event => onUpdatingItem(environment.id, "environment", { "name": event.currentTarget.value })} value={environment.name} className="environmentHeader"></input>
            <div className="buttons">

                <button className="icon button" alt="Edit" ><span className="icon">&#9998;</span></button>

                <button onClick={() => onSetActiveEnvironment(environment.id)} className="icon button" alt="Details" ><span className="icon">&#8505;</span></button>

            </div>
            {!editScene ?

                <div className="sceneCard">
                    {filteredScenes.length > 0 ? filteredScenes.map(scene => (
                        <div id={"scene" + scene.id} key={scene.id}>
                            <Scene onSetActiveScene={onSetActiveScene}
                                onRemoveActiveScene={onRemoveActiveScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={scene.id} scene={scene} onSetEditScene={onSetEditScene} onRemoveEditScene={onRemoveEditScene} layers={layers} environments={environments} ></Scene>
                        </div>
                    )) :
                        <div id="noScene">
                            <p className="sceneText">No scenes in this environment yet!</p>
                        </div>

                    }
                </div>

                :

                filteredScenes.map(scene => (
                    scene.id === editScene ?
                        <div className="sceneCard" id={"scene" + scene.id} key={scene.id}>
                            <SceneDetails onSetActiveScene={onSetActiveScene}
                                onRemoveActiveScene={onRemoveActiveScene} environments={environments} onSetEditScene={onSetEditScene} onRemoveEditScene={onRemoveEditScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={scene.id} scene={scene} layers={layers}></SceneDetails>

                        </div>
                        :
                        null

                ))


            }

        </div >

    )
}
