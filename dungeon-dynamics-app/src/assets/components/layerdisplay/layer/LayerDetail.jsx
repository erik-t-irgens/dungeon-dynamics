import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Howl, Howler } from 'howler'
import './Layer.css';
// Class component that controls the whole room, and is the highest level of state.

export default function LayerDetail(props) {

    let newSound;

    if (props.layer) {
        newSound = new Howl({
            src: [props.layer.url]
        });
    } else {
        newSound = "Invalid"
    }

    console.log("this is layer: " + newSound)

    return (

        <div className="">
            <button className="layerButton" onClick={() => newSound === "Invalid" ? alert("Invalid layer") : newSound.play()}>{props.layer.name}</button>
        </div>


    )
}
