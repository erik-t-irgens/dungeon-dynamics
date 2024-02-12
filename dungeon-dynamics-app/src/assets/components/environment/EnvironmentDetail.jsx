import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import SceneDetails from '../scene/SceneDetails';
import Scene from '../scene/Scene';
import './Environment.css'
// Class component that controls the whole room, and is the highest level of state.

export default function EnvironmentDetails(props) {
    const { scenes, key, environment, onCreatingItem, onDeletingItem, onUpdatingItem, onSetActiveEnvironment, onRemoveActiveEnvironment, onSetActiveScene, onRemoveActiveScene, activeScene, layers, environments } = this.props;

    const filteredScenes = scenes.filter(scene => scene.environmentId === environment.id)
    return (

        <div className="environment details envdetails">

            <input onInput={event => onUpdatingItem(environment.id, "environment", { "name": event.currentTarget.value })} value={environment.name} className="environmentHeader"></input>
            <div className="buttons">

                <button className="icon button" alt="Edit" ><span className="icon">&#9998;</span></button>

                <button onClick={onRemoveActiveEnvironment} className="icon button" alt="Details" ><span className="icon">&#215;</span></button>

            </div>
            {!activeScene ?

                <div className="sceneCard">
                    {filteredScenes.length > 0 ? filteredScenes.map(scene => (
                        <div id={"scene" + scene.id} key={scene.id}>
                            <Scene environments={environments} onSetActiveScene={onSetActiveScene} onRemoveActiveScene={onRemoveActiveScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={scene.id} scene={scene} layers={layers}></Scene>

                        </div>
                    )) :
                        <div id="noScene">
                            <p className="sceneText">No scenes in this environment yet!</p>
                        </div>

                    }
                </div>
                :
                filteredScenes.map(scene => (
                    scene.id === activeScene ?
                        <div id={"scene" + scene.id} key={scene.id}>
                            <SceneDetails environments={environments} onSetActiveScene={onSetActiveScene} onRemoveActiveScene={onRemoveActiveScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={scene.id} scene={scene} layers={layers}></SceneDetails>

                        </div>
                        :
                        null

                ))
            }









        </div >

    )
}
