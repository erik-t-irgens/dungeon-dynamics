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
  { url: '../../../public/audio/66333784.mp3' },
  { url: '../../../public/audio/Grasp-of-Avarice-(Action)-orch.mp3' },
  { url: '../../../public/audio/Grasp-of-Avarice-(Action).mp3' },
  { url: '../../../public/audio/Grasp-of-Avarice-(Ambient).mp3' },
  { url: '../../../public/audio/Grasp-of-Avarice-(High-Action)-Orch.mp3' },
  { url: '../../../public/audio/Grasp-of-Avarice-(High-Action).mp3' },
  { url: '../../../public/audio/01-sepiks-new-brass.mp3' },
  { url: '../../../public/audio/02-sepiks-new-choir.mp3' },
  { url: '../../../public/audio/03-sepiks-new-percussive.mp3' },
  { url: '../../../public/audio/04-sepiks-new-string-and-one-perc.mp3' },
  { url: '../../../public/audio/05-sepiks-new-synth.mp3' },
  { url: '../../../public/audio/06-sepiks-new-woodwinds.mp3' },
]

export const exampleScenes = [
  { name: "scene1", id: "1" },
  { name: "scene2" },
]

export const exampleEnvironments = [
  { name: "environment1" },
  { name: "environment2" },
]