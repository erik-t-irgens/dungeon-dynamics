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
			scenes: [],
		}

	}

	componentDidMount = () => {
		// Some logic to get the list of objects
		const layersFromServer = exampleData; // Replace with actual logic to call lists eventually
		const scenesFromServer = exampleScenes;

		// Process each layer object to ensure it has the expected structure
		layersFromServer.map(layer => {
			this.handleCreatingItems(layer, "layer")
		});

		scenesFromServer.map(scene => {
			this.handleCreatingItems(scene, "scene")
		});

	};

	handleCreatingItems = (item, itemType) => {
		// Define default values for missing properties depending on itemType
		let defaultItem;
		// Determine if it is a layer or a scene
		if (itemType === "layer") {
			defaultItem = {
				name: "Layer Name",
				url: "Layer URL",
				sceneId: [],
				baseLayer: false,
				layerNumber: 0,
				active: false,
				loopable: false,
				endEvent: "",
				...item, // Spread the properties of the fetched layer object
			};

			// Check if sceneId is provided, create a new scene if necessary
			defaultItem.sceneId.forEach(sceneId => {
				if (!this.state.scenes.find(scene => scene.id === sceneId)) {
					this.setState(prevState => ({
						scenes: [...prevState.scenes, { name: "Placeholder Scene", id: sceneId }],
					}));
				}
			});
		} else if (itemType === "scene") {
			defaultItem = {
				name: "Scene Name",
				id: generateUUID(),
				...item,
			}
		} else {
			console.error('Unknown itemType:', itemType, " | Item type should refer to which state object is being updated.")
		}

		this.setState(prevState => ({
			[`${itemType}s`]: [...prevState[`${itemType}s`], defaultItem],
		}), () => {
			console.log(this.state)
		});
	}

	handleDeletingItems = (itemId, itemType) => {
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
		const { layers, scenes } = this.state;
		return (
			<div>
				<RoomControl layers={layers} scenes={scenes}></ RoomControl>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
