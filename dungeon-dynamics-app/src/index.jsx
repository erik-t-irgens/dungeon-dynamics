import { render, Component } from 'preact';
import RoomControl from "./assets/components/roomcontroller/RoomControl.jsx"

import './style.css';
import { exampleData, exampleScenes, exampleEnvironments } from './utils/stateExample.js';
import { generateUUID } from './utils/uuid.js';

export class App extends Component {

	constructor() {
		super();
		this.state = {
			layers: [],
			scenes: [{ name: "Unassigned Layers", id: "0", environmentId: "0" }],
			environments: [{ name: "Unassigned Scenes", id: "0" }],
			formVisible: false,
			howlGroup: [],
			masterVolume: 1
		}

	}

	componentDidMount = () => {
		// Some logic to get the list of objects
		const layersFromServer = exampleData; // Replace with actual logic to call lists eventually
		const scenesFromServer = exampleScenes;
		const environmentsFromServer = exampleEnvironments;

		// Process each layer object to ensure it has the expected structure
		layersFromServer.map(layer => {
			this.handleCreatingItem(layer, "layer")
		});

		scenesFromServer.map(scene => {
			this.handleCreatingItem(scene, "scene")
		});

		environmentsFromServer.map(environment => {
			this.handleCreatingItem(environment, "environment")
		});
	};

	handleHowlGroupPlay = (howlGroup) => {
		console.log("PLAYING!")
		howlGroup.forEach(howl => {
			console.log(howl.howl)
			howl.howl.play()
		})
	}

	handleHowlGroupVolumne = (volume) => { // volume must be 0.0 - 1.0
		this.setState(prevState => ({
			masterVolume: volume
		}));
		Howler.volume(this.state.masterVolume)
	}

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

			this.setState(prevState => ({
				howlGroup: [...prevState.howlGroup, { id: defaultItem.id, sceneId: defaultItem.sceneId, howl: new Howl({ src: [defaultItem.url] }) }]
			}))

		} else if (itemType === "scene") {
			const existingScene = this.state.scenes.find(scene => scene.id === item.id);

			if (existingScene) {
				defaultItem = { ...existingScene, ...item };
			} else {
				defaultItem = {
					name: "Scene Name",
					id: item.id || generateUUID(),
					environmentId: item.environmentId || "0", // Use provided sceneId if available
					...item,
				};
			}
		} else if (itemType === "environment") {
			const existingEnvironment = this.state.environments.find(environment => environment.id === item.id);

			if (existingEnvironment) {
				defaultItem = { ...existingEnvironment, ...item };
			} else {
				defaultItem = {
					name: "Environment Name",
					id: item.id || generateUUID(),
					// environmentId: item.environmentId || "0", // Use provided environmentId if 
					...item,
				};
			}
		} else {
			console.error('Unknown itemType:', itemType, " | Item type should refer to which state object is being updated.")
			return; // Exit function if itemType is unknown
		}

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
		const { layers, scenes, formVisible, environments, howlGroup } = this.state;
		return (
			<div>
				<div id="adminPage">
					<RoomControl howlGroup={howlGroup} onHowlGroupPlay={this.handleHowlGroupPlay} onHowl={this.handleHowlGroupVolumne} onCreatingItem={this.handleCreatingItem} onUpdatingItem={this.handleUpdatingItem} onDeletingItem={this.handleDeletingItem} layers={layers} scenes={scenes} environments={environments}></ RoomControl>
				</div>
				<div id="userPage"></div>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
