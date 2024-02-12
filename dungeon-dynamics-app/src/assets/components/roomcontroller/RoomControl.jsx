import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Layer from '../layerdisplay/layer/layer';
import Scene from '../scene/Scene';
import SceneDetails from '../scene/SceneDetails';
import './RoomControl.css';
import EnvironmentDetails from '../environment/EnvironmentDetail';
import Environment from '../environment/Environment';

// Class component that controls the whole room, and is the highest level of state.

export default class RoomControl extends Component {

    constructor() {
        super();
        this.state = {
            activeScene: "",
            activeEnvironment: ""
        }
    }

    handleSetActiveEnvironment = (environmentId) => {
        this.setState(prevState => ({
            activeEnvironment: prevState.activeEnvironment === "" ? environmentId : prevState.activeEnvironment
        }));
    }

    handleRemoveActiveEnvironment = () => {
        console.log("ACTIVE ENVIRONMNET", this.state.activeEnvironment)
        this.setState(prevState => ({
            activeEnvironment: prevState.activeEnvironment != "" ? "" : prevState.activeEnvironment
        }));
    }

    handleSetActiveScene = (sceneId, environmentId) => {
        this.setState(prevState => ({
            activeScene: prevState.activeScene === "" ? sceneId : prevState.activeScene,
            // activeEnvironment: prevState.activeEnvironment != "" ? prevState.activeEnvironment : environmentId
        }));
    }

    handleRemoveActiveScene = () => {
        this.setState(prevState => ({
            activeScene: prevState.activeScene !== "" ? "" : prevState.activeScene
        }));
    }

    render() {
        const { layers, scenes, onDeletingItem, onCreatingItem, onUpdatingItem, environments } = this.props;
        const { activeScene, activeEnvironment } = this.state;
        console.log("Scenes", scenes)
        return (
            <div id="roomControl">
                {!activeEnvironment ?

                    environments.map(environment => (
                        <div id={"environment" + environment.id} key={environment.id}>
                            <Environment environments={environments} onSetActiveEnvironment={this.handleSetActiveEnvironment} onRemoveActiveEnvironment={this.handleRemoveActiveEnvironment} onSetActiveScene={this.handleSetActiveScene} onRemoveActiveScene={this.handleRemoveActiveScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={environment.id} environment={environment} layers={layers} scenes={scenes} activeScene={activeScene}></Environment>

                        </div>

                    ))

                    :

                    environments.map(environment => (
                        environment.id === activeEnvironment ?
                            <div id={"environment" + environment.id} key={environment.id}>
                                <EnvironmentDetails environments={environments} onSetActiveEnvironment={this.handleSetActiveEnvironment} onRemoveActiveEnvironment={this.handleRemoveActiveEnvironment} onSetActiveScene={this.handleSetActiveScene} onRemoveActiveScene={this.handleRemoveActiveScene} onCreatingItem={onCreatingItem} onUpdatingItem={onUpdatingItem} onDeletingItem={onDeletingItem} key={environment.id} environment={environment} layers={layers} scenes={scenes} activeScene={activeScene}></EnvironmentDetails>

                            </div>
                            :
                            null

                    ))


                }
            </div >
        )
    }
}
