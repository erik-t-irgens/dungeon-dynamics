
import CreateItem from '../forms/CreateItem';
import './Header.css';
import { useEffect, useState } from 'preact/hooks';
export default function Header(props) {

    const [formVisible, setFormVisible] = useState(false);
    const [fileButtonsVisible, setFileButtonsVisible] = useState(false);
    const handleOpenForm = () => {
        setFormVisible(!formVisible)
    }

    const handleShowFileButtons = () => {
        setFileButtonsVisible(!fileButtonsVisible)
    }


    useEffect(() => {
        const preventUnload = (event) => {
            // NOTE: This message isn't used in modern browsers, but is required
            const message = 'Sure you want to leave?';
            event.preventDefault();
            event.returnValue = message;

            this.props.onSaveStateToLocalStorage();
        };

        window.addEventListener('beforeunload', preventUnload);

        return () => {
            window.removeEventListener('beforeunload', preventUnload);
        };
    }, []);



    const { onSaveStateToFile, scenes, environments, onCreatingItem } = this.props
    return (

        // onCreatingItem, scenes, environments
        <div className="header">
            <div class="inner">
                <div className="buttonContainer">
                    <button onClick={handleShowFileButtons} className="dropdownButton">File Actions</button>
                    <button onClick={handleOpenForm} className="dropdownButton">Create...</button>

                    {fileButtonsVisible ? <div className="dropdown-content">
                        <button onClick={(onSaveStateToFile)}>Save to File</button>
                        {/* <form onSubmit={handleSubmit}></form> */}
                        <input label="Import File..." type="file">Import from File</input>

                    </div> : null}

                    <div className="dropdown-content">

                    </div>
                </div>

                {formVisible ? <CreateItem onOpenForm={handleOpenForm} onCreatingItem={onCreatingItem} scenes={scenes} environments={environments}></CreateItem> : null}



            </div>


        </div>


    )
}
