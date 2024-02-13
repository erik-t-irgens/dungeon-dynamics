import { useState } from "preact/hooks"
export default function CreateItem(props) {
    const { onCreatingItem } = this.props

    const [formType, setFormType] = useState("")
    return (

        <div className="createForm">

            {formType === "" ?

                null

                :

                formType === "layer" ?

                    <form id="layerForm"></form>

                    :

                    formType === "scene" ?

                        <form id="sceneForm"></form>
                        :
                        formType === "environment" ?

                            <form id="environmentForm"></form>
                            :
                            <p>Error in form type!</p>}

            <div class="inner">



            </div>


        </div>


    )
}
