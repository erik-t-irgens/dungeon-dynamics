const layers = [
    {
        name: "string",
        url: "link or path to audio file",
        sceneId: ["uuid", "..."], // multiple uuid can be stored if part of multiple scenes
        baseLayer: false, // true or false, determines if this is the constant layer if applicable
        layerNumber: 0, // Int 0-n listing priority of layer adding from lowest to highest value, if -1 no layers priority is involved
        active: false, // if the layer is currently playing
        loopable: false, // is the track meant to loop? 
        endEvent: "", // determines what will happen when the media ends. Func type, most likely.



    }
]

const scenes = [
    {
        name: "string",
        id: "uuid string"
    }
]


export const exampleData = [
    { url: '../../../public/audio/37488118.mp3' },
    { url: '../../../public/audio/66333784.mp3' }
]

export const exampleScenes = [
    { name: "scene1", id: "1" },
    { name: "scene2" },
]

export const exampleEnvironments = [
    { name: "environment1" },
    { name: "environment2" },
]