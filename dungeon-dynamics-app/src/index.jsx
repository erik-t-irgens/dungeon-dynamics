import { render, Component } from 'preact';
import RoomControl from "./assets/components/roomcontroller/RoomControl.jsx"
import Header from './assets/components/header/Header.jsx';
import './style.css';
import { exampleData, exampleScenes, exampleEnvironments } from './utils/stateExample.js';
import { generateUUID } from './utils/uuid.js';
import CreateItem from './assets/components/forms/CreateItem.jsx';

export class App extends Component {

	constructor() {
		super();
		this.state = {
			layers: [],
			scenes: [
				// { name: "Unassigned Layers", id: "0", environmentId: "0" }
			],
			environments: [
				// { name: "Unassigned Scenes", id: "0" }
			],
			formVisible: false,
			howlGroup: [],
			masterVolume: 1
		}

	}
	handleSaveStateToFile = () => {
		console.log("Saving to file...");
		let stringableState = {};
		let stringableLayers = this.state.layers.map((layer) => {
			const { howl, ...stringableLayer } = layer;
			return stringableLayer;
		});
		stringableState["layers"] = stringableLayers;
		stringableState["scenes"] = this.state.scenes;
		stringableState["environments"] = this.state.environments;
		const stringifiedState = JSON.stringify(stringableState);

		const element = document.createElement("a");
		const textFile = new Blob([stringifiedState], { type: "text/plain" }); //pass data from localStorage API to blob
		element.href = URL.createObjectURL(textFile);
		element.download = "userFile.txt";

		// Simulate click event on anchor element
		element.style.display = "none"; // Hide the element
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element); // Remove the element after click
	};

	handleSaveStateToLocalStorage = () => {
		//Stringify our state into separate variables if possible
		// console.log("SAVING TO LOCAL STORAGE...")
		let stringableState = {}
		let stringableLayers = this.state.layers.map(layer => {
			const { howl, ...stringableLayer } = layer;
			return stringableLayer
		})
		stringableState["layers"] = stringableLayers;
		stringableState["scenes"] = this.state.scenes;
		stringableState["environments"] = this.state.environments;
		const stringifiedState = JSON.stringify(stringableState)
		localStorage.setItem("state", stringifiedState);

	}

	componentDidMount = () => {
		let layersFromServer = exampleData; // Replace with actual logic to call lists eventually
		let scenesFromServer = [
			{ name: "Unassigned Layers", id: "0", environmentId: "0" }
		];
		let environmentsFromServer = [{ name: "Unassigned Scenes", id: "0" }];
		if (localStorage.getItem("state") !== null) {
			let loadedLocalStorage = JSON.parse(localStorage.getItem("state"))
			layersFromServer = loadedLocalStorage.layers;
			scenesFromServer = loadedLocalStorage.scenes;
			environmentsFromServer = loadedLocalStorage.environments;
		}
		// Some logic to get the list of objects


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
		// console.log("PLAYING!")
		howlGroup.forEach(howl => {
			console.log(howl.howl)
			howl.howl.play()
		})
	}

	handleHowlGroupStop = (howlGroup) => {
		// console.log("PLAYING!")
		howlGroup.forEach(howl => {
			// console.log(howl.howl)
			howl.howl.stop()
		})
	}

	handleHowlGroupVolume = (howlGroup, volume) => { // volume must be 0.0 - 1.0
		howlGroup.forEach(howl => {
			// console.log(howl.howl)
			howl.howl.volume(volume)
		})
	}

	handleCreatingItem = (item, itemType) => {
		let defaultItem;

		if (itemType === "layer") {
			const fileName = item.url.substring(item.url.lastIndexOf('/') + 1).split('.')[0];
			const defaultName = fileName || "Layer Name";
			let randomId = generateUUID()

			defaultItem = {
				name: defaultName,
				url: "Layer URL",
				sceneId: item.sceneId || ["0"], // Use provided sceneId if available
				baseLayer: false,
				layerNumber: 0,
				active: false,
				loopable: false,
				endEvent: "",
				id: randomId,
				howl: new Howl({ src: item.url }),
				...item,
			};

			this.setState(prevState => ({
				howlGroup: [...prevState.howlGroup, { id: defaultItem.id, sceneId: [defaultItem.sceneId], howl: new Howl({ src: [defaultItem.url] }) }]
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
				<Header onSaveStateToLocalStorage={this.handleSaveStateToLocalStorage} onSaveStateToFile={this.handleSaveStateToFile}></Header>
				{formVisible ? <CreateItem></CreateItem> : null}
				<div id="adminPage">
					<RoomControl howlGroup={howlGroup} onHowlGroupPlay={this.handleHowlGroupPlay}
						onHowlGroupStop={this.handleHowlGroupStop} onHowlGroupVolume={this.handleHowlGroupVolume} onCreatingItem={this.handleCreatingItem} onUpdatingItem={this.handleUpdatingItem} onDeletingItem={this.handleDeletingItem} layers={layers} scenes={scenes} environments={environments}></ RoomControl>
				</div>
				<div id="userPage"></div>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
