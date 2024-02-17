import { h, render, Component } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Howl, Howler } from 'howler'
import './Layer.css';
// Class component that controls the whole room, and is the highest level of state.

export default function LayerPlayer(props) {
    const { onUpdatingItem, layer, sceneId, setHowlGroup, howl, newSound } = this.props

    const [volume, setVolume] = useState(1);
    const isDragging = useRef(false);

    const handleVolumeChange = (event) => {
        const rect = event.target.getBoundingClientRect();
        const newVolume = Math.max(0, Math.min(1, event.offsetX / rect.width));
        layer.howl.fade(volume, newVolume, 100000);
        setVolume(newVolume);

    };

    const handleMouseDown = (event) => {
        isDragging.current = true;
        handleVolumeChange(event);
    };

    const handleMouseMove = (event) => {

        if (isDragging.current) {
            console.log(event)
            handleVolumeChange(event);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Functional version of setVolume used to use the most up to date version of state
    const handleRaiseVolume = () => {
        setVolume(prevVolume => {
            const newVolume = prevVolume + 0.01 < 1.0 ? prevVolume + 0.01 : 1;
            layer.howl.fade(prevVolume, newVolume, 1000);
            return newVolume;
        });
    }

    const handleLowerVolume = () => {
        setVolume(prevVolume => {
            const newVolume = prevVolume - 0.01 > 0 ? prevVolume - 0.01 : 0;
            layer.howl.fade(prevVolume, newVolume, 1000);
            return newVolume;
        });
    }

    // console.log("this is layer: " + newSound)

    return (

        <div className="layerDetailButtons">
            <button onClick={() => layer.howl.play()}>&#9658;</button>
            <label className="layerNameVolume">{props.layer.name}</label>
            <div class="volumeIndicator" onClick={handleVolumeChange}
                onMouseDown={handleMouseDown}>
                <div class="volumeBar" style={{ width: volume * 100 + "%" }}></div>
            </div>
            <label class="volumePercentage">{Math.floor(volume * 100) + "%"}</label>
            <div class="volumeButtons">
                <button onClick={handleLowerVolume} class="volumeDown">&#45;</button>
                <button onClick={handleRaiseVolume} class="volumeUp">&#43;</button>
            </div>
        </div>


    )
}
