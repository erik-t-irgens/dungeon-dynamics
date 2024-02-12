import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Howl, Howler } from 'howler'
import './Layer.css';
// Class component that controls the whole room, and is the highest level of state.

export default function Layer(props) {

    let newSound;



    useEffect(() => {
        if (props.layer) {
            newSound = new Howl({
                src: [props.layer.url],
                loop: props.layer.loopable,
            });
        } else {
            newSound = "Invalid"
        }
        // newSound.loop(!props.layer.loopable)
        console.log("NEW SOUND ", newSound)
    });

    console.log("this is layer: " + newSound)

    return (

        <div className="">
            <button className="layerButton" onClick={() => newSound === "Invalid" ? alert("Invalid layer") : newSound.play()}>{props.layer.name}</button>
            {/* <button className="loopButton" onClick={() => props.onUpdatingItem(props.layer.id, "layer", { loopable: !props.layer.loopable })}></button> */}
        </div>


    )
}
