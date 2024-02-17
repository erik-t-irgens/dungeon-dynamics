import { useState } from "preact/hooks"
import './CreateItem.css'
export default function CreateItem(props) {
    const { onCreatingItem, scenes, environments } = this.props

    const [formType, setFormType] = useState("layer")

    const handleSubmitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(event.target); // Create a FormData object from the form

        const data = {}; // Object to hold form data

        // Iterate over form elements and add their values to the data object
        for (const [name, value] of formData.entries()) {
            data[name] = value;
            if (formType === "layer") {
                if (name === "baseLayer" || name === "loopable") {
                    data[name] = true
                }
                if (name === "sceneId") {
                    data[name] = [value]
                }
            }

        }
        console.log(formData)
        // Call the onCreatingItem function with the form type and form data
        console.log(formType, data)
        onCreatingItem(data, formType);
    };



    return (

        <div className="createForm">
            <div className="formTabGroup">
                <div onClick={() => setFormType("layer")} className="fileTab">Layer</div>
                <div onClick={() => setFormType("scene")} className="fileTab">Scene</div>
                <div onClick={() => setFormType("environment")} className="fileTab">Environment</div>

            </div>

            {formType === "" ?

                null

                :

                formType === "layer" ?

                    <form onSubmit={handleSubmitForm} className="creationForm" id="layerForm">

                        {/* 	sceneId: int
				baseLayer: false,
				loopable: false, */}
                        <h3>New Layer</h3>
                        <label htmlFor="name">Name</label>
                        <input name={"name"} type="text" placeholder={"Layer Name..."} />

                        <label htmlFor="url">File Path</label>
                        <input type={"text"} name="url" />

                        <label htmlFor="sceneId">Scene</label>
                        <select name="sceneId" >
                            <option value="">Assign an existing Scene...</option>
                            {scenes.map(scene => (
                                <option key={scene.id} value={[scene.id]}>{scene.name}</option>
                            ))}
                        </select>

                        <label htmlFor="baseLayer">Base Layer?</label>
                        <input type="checkbox" name="baseLayer" id="baseLayer" />


                        <label htmlFor="loopable">Loopable??</label>
                        <input type="checkbox" name="loopable" id="loopable" />


                        <button type="submit">Submit</button>
                    </form>

                    :

                    formType === "scene" ?


                        <form onSubmit={handleSubmitForm} className="creationForm" id="sceneForm">
                            <h3>New Scene</h3>
                            <label htmlFor="scene">Name</label>
                            <input name={"name"} type="text" placeholder={"Scene Name..."} />

                            <label htmlFor="environmentId">Environment</label>
                            <select name="environmentId" >
                                <option value="">Assign an existing Environment...</option>
                                {environments.map(environment => (
                                    <option key={environment.id} value={environment.id}>{environment.name}</option>
                                ))}
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                        :
                        formType === "environment" ?


                            <form onSubmit={handleSubmitForm} className="creationForm" id="environmentForm">
                                <h3>New Environment</h3>
                                <label htmlFor="environment">Name</label>
                                <input name={"name"} type="text" placeholder={"Environment Name..."} />

                                <button type="submit">Submit</button>
                            </form>


                            :
                            <p>Error in form type!</p>}

            <div class="inner">



            </div>


        </div>


    )
}
