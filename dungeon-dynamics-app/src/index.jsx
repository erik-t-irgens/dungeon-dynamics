import { render, Component } from 'preact';
import RoomControl from "./assets/components/roomcontroller/RoomControl.jsx"

import './style.css';
import { exampleData, exampleScenes } from './utils/stateExample.js';
import { generateUUID } from './utils/uuid.js';

export class App extends Component {

	constructor() {
		super();
		this.state = {
			layers: [],
			scenes: [{ name: "Unassigned Layers", id: "0" }],
			formVisible: false
		}

	}

	componentDidMount = () => {
		// Some logic to get the list of objects
		const layersFromServer = exampleData; // Replace with actual logic to call lists eventually
		const scenesFromServer = exampleScenes;

		// Process each layer object to ensure it has the expected structure
		layersFromServer.map(layer => {
			this.handleCreatingItem(layer, "layer")
		});

		scenesFromServer.map(scene => {
			this.handleCreatingItem(scene, "scene")
		});

	};


	handleCreatingItem = (item, itemType) => {
		let defaultItem;

		if (itemType === "layer") {
			const fileName = item.url.substring(item.url.lastIndexOf('/') + 1).split('.')[0];
			const defaultName = fileName || "Layer Name";

			defaultItem = {
				name: defaultName,
				url: "Layer URL",
				sceneId: item.sceneId || ["0"], // Use provided sceneId if available
				baseLayer: false,
				layerNumber: 0,
				active: false,
				loopable: false,
				endEvent: "",
				id: generateUUID(),
				...item,
			};

		} else if (itemType === "scene") {
			const existingScene = this.state.scenes.find(scene => scene.id === item.id);

			if (existingScene) {
				defaultItem = { ...existingScene, ...item };
			} else {
				defaultItem = {
					name: "Scene Name",
					id: item.id || generateUUID(),
					...item,
				};
			}
		} else {
			console.error('Unknown itemType:', itemType, " | Item type should refer to which state object is being updated.")
			return; // Exit function if itemType is unknown
		}

		// Check if sceneId is provided and if it's a new scene
		// if (itemType === "layer" && defaultItem.sceneId.length > 0) {
		// 	defaultItem.sceneId.forEach(sceneId => {
		// 		if (!this.state.scenes.find(scene => scene.id === sceneId)) {
		// 			this.setState(prevState => ({
		// 				scenes: [...prevState.scenes, { name: "Placeholder Scene", id: sceneId }],
		// 			}));
		// 		}
		// 	});
		// }

		this.setState(prevState => ({
			[`${itemType}s`]: [...prevState[`${itemType}s`], defaultItem],
		}));
	}

	handleDeletingItem = (itemId, itemType) => {
		this.setState((prevState) => {
			let updatedItems;
			if (itemType === "layer") {
				updatedItems = prevState.layers.filter((item) => item.id !== itemId)
			} else if (itemType === "scene") {
				updatedItems = prevState.scenes.filter((item) => item.id !== itemId)
			} else {
				console.error('Unknown itemType:', itemType, " | Item type should refer to which state object is being updated.")
			}

			return {
				[itemType + 's']: updatedItems // Dynamically updates state 
			};
		});
	};

	handleUpdatingItem = (itemId, itemType, updatedProperties) => {
		console.log("LOOK OVER HERE", itemId, itemType, updatedProperties)
		this.setState(prevState => {
			const updatedItems = prevState[`${itemType}s`].map(item => {
				if (item.id === itemId) {
					// Update only the specified properties
					return { ...item, ...updatedProperties };
				}
				return item;
			});

			return {
				[`${itemType}s`]: updatedItems,
			};
		});
	};


	render() {
		const { layers, scenes, formVisible } = this.state;
		return (
			<div>
				<RoomControl onCreatingItem={this.handleCreatingItem} onUpdatingItem={this.handleUpdatingItem} onDeletingItem={this.handleDeletingItem} layers={layers} scenes={scenes}></ RoomControl>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
