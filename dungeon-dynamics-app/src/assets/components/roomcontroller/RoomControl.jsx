import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
// import Layer from '../layer/Layer';
import Scene from '../scene/Scene';
import SceneDetails from '../scene/SceneDetails';
import './RoomControl.css';
import EnvironmentDetails from '../environment/EnvironmentDetail';
import Environment from '../environment/Environment';
import ScenePlayer from '../scene/ScenePlayer';

// Class component that controls the whole room, and is the highest level of state.

export default class RoomControl extends Component {

    constructor() {
        super();
        this.state = {
            editScene: "",
            activeEnvironment: "",
            activeScene: "",
            masterVolume: 1
        }
    }





    handleSetActiveScene = (environmentId) => {
        this.setState(prevState => ({
            activeScene: prevState.activeScene === "" ? environmentId : prevState.activeScene
        }));
    }

    handleRemoveActiveScene = () => {
        this.setState(prevState => ({
            activeScene: prevState.activeScene != "" ? "" : prevState.activeScene
        }));
    }

    handleSetActiveEnvironment = (environmentId) => {
        this.setState(prevState => ({
            activeEnvironment: prevState.activeEnvironment === "" ? environmentId : prevState.activeEnvironment
        }));
    }

    handleRemoveActiveEnvironment = () => {
        this.setState(prevState => ({
            activeEnvironment: prevState.activeEnvironment != "" ? "" : prevState.activeEnvironment
        }));
    }

    handleSetEditScene = (sceneId, environmentId) => {
        this.setState(prevState => ({
            editScene: prevState.editScene === "" ? sceneId : prevState.editScene,
            // activeEnvironment: prevState.activeEnvironment != "" ? prevState.activeEnvironment : environmentId
        }));
    }

    handleRemoveEditScene = () => {
        this.setState(prevState => ({
            editScene: prevState.editScene !== "" ? "" : prevState.editScene
        }));
    }

    render() {
        const { layers, scenes, onDeletingItem, onCreatingItem, onUpdatingItem, environments, onHowlGroupPlay, onHowlGroupStop, onHowlGroupVolume, howlGroup } = this.props;
        const { editScene, activeEnvironment, activeScene, masterVolume } = this.state;
        console.log("Scenes", scenes)
        return (
            <div id="roomControl">
                <div className="left-column">
                    {!activeScene ?

                        <div><p>No active scene...</p></div>
                        :
                        scenes.map(scene => (
                            scene.id === activeScene ?
                                <div id={"scene" + scene.id} key={scene.id}>
                                    <ScenePlayer
                                        howlGroup={howlGroup}
                                        masterVolume={masterVolume}
                                        onHowlGroupPlay={onHowlGroupPlay}
                                        onHowlGroupStop={onHowlGroupStop}
                                        onHowlGroupVolume={onHowlGroupVolume}
                                        scenes={scenes}
                                        onSetActiveScene={this.handleSetActiveScene}
                                        onRemoveActiveScene={this.handleRemoveActiveScene}
                                        onSetActiveEnvironment={this.handleSetActiveEnvironment}
                                        onRemoveActiveEnvironment={this.handleRemoveActiveEnvironment}
                                        onSetEditScene={this.handleSetEditScene}
                                        onRemoveEditScene={this.handleRemoveEditScene}
                                        onCreatingItem={onCreatingItem}
                                        onUpdatingItem={onUpdatingItem}
                                        onDeletingItem={onDeletingItem}
                                        key={scene.id}
                                        scene={scene}
                                        layers={layers}
                                        editScene={editScene}
                                    ></ScenePlayer>

                                </div> : null))
                        // Display Scene Controller that shows all layers and player buttons!
                    }

                </div>
                <div className="right-column">
                    {!activeEnvironment ?

                        environments.map(environment => (
                            <div id={"environment" + environment.id} key={environment.id}>
                                <Environment onSetActiveScene={this.handleSetActiveScene}
                                    onRemoveActiveScene={this.handleRemoveActiveScene} environments={environments} onSetActiveEnvironment={this.handleSetActiveEnvironment} onRemoveActiveEnvironment={this.handleRemoveActiveEnvironment} onSetEditScene={this.handleSetEditScene} onRemoveEditScene={this.handleRemoveEditScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={environment.id} environment={environment} layers={layers} scenes={scenes} editScene={editScene}></Environment>

                            </div>

                        ))

                        :

                        environments.map(environment => (
                            environment.id === activeEnvironment ?
                                <div id={"environment" + environment.id} key={environment.id}>
                                    <EnvironmentDetails onSetActiveScene={this.handleSetActiveScene}
                                        onRemoveActiveScene={this.handleRemoveActiveScene} environments={environments} onSetActiveEnvironment={this.handleSetActiveEnvironment} onRemoveActiveEnvironment={this.handleRemoveActiveEnvironment} onSetEditScene={this.handleSetEditScene} onRemoveEditScene={this.handleRemoveEditScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={environment.id} environment={environment} layers={layers} scenes={scenes} editScene={editScene}></EnvironmentDetails>

                                </div>
                                :
                                null

                        ))


                    }
                </div>

            </div >
        )
    }
}
