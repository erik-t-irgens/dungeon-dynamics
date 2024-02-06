import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Layer from '../layerdisplay/layer/layer';
import Scene from '../scene/Scene';
import SceneDetails from '../scene/SceneDetails';
import './RoomControl.css';

// Class component that controls the whole room, and is the highest level of state.

export default class RoomControl extends Component {

    constructor() {
        super();
        this.state = {
            activeScene: ""
        }
    }

    handleSetActiveScene = (sceneId) => {
        this.setState(prevState => ({
            activeScene: prevState.activeScene === "" ? sceneId : prevState.activeScene
        }));
    }

    handleRemoveActiveScene = () => {
        this.setState(prevState => ({
            activeScene: prevState.activeScene !== "" ? "" : prevState.activeScene
        }));
    }

    render() {
        const { layers, scenes, onDeletingItem, onCreatingItem, onUpdatingItem } = this.props;
        const { activeScene } = this.state;
        console.log("Scenes", scenes)
        return (
            <div id="roomControl">
                {!activeScene ?

                    scenes.map(scene => (
                        <div id={"scene" + scene.id} key={scene.id}>
                            <Scene onSetActiveScene={this.handleSetActiveScene} onRemoveActiveScene={this.handleRemoveActiveScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={scene.id} scene={scene} layers={layers.filter(layer => layer.sceneId.includes(scene.id))}></Scene>

                        </div>

                    ))

                    :

                    scenes.map(scene => (
                        scene.id === activeScene ?
                            <div id={"scene" + scene.id} key={scene.id}>
                                <SceneDetails onSetActiveScene={this.handleSetActiveScene} onRemoveActiveScene={this.handleRemoveActiveScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={scene.id} scene={scene} layers={layers.filter(layer => layer.sceneId.includes(scene.id))}></SceneDetails>

                            </div>
                            :
                            null

                    ))


                }
            </div >
        )
    }
}
