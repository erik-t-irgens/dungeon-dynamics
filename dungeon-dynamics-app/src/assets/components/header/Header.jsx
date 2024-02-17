
import './Header.css';
import { useEffect, useState } from 'preact/hooks';
export default function Header(props) {

    const [formVisible, setFormVisible] = useState(false);

    const handleOpenForm = () => {
        setFormVisible(!formVisible)
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



    const { onSaveStateToFile } = this.props
    return (

        <div className="header">
            <div class="inner">

                <div className="dropdown-content">
                    <button onClick={(onSaveStateToFile)}>Save to File</button>
                    {/* <form onSubmit={handleSubmit}></form> */}
                    <input label="Import File..." type="file">Import from File</input>

                </div>
                <div className="dropdown-content">

                </div>

            </div>


        </div>


    )
}
