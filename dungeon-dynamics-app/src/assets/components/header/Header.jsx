
import './Header.css';
import { useEffect } from 'preact/hooks';
export default function Header(props) {

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

                <button onClick={(onSaveStateToFile)}>Save...</button>
                <button >Import...</button>

            </div>


        </div>


    )
}
