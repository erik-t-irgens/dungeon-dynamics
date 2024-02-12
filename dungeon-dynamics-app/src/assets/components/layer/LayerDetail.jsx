import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Howl, Howler } from 'howler'
import './Layer.css';
// Class component that controls the whole room, and is the highest level of state.

export default function LayerDetail(props) {
    const { onUpdatingItem, layer, sceneId } = this.props

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

        <div className="layerDetailButtons">

            <button className="deleteButton" onClick={() => onUpdatingItem(layer.id, "layer", { sceneId: layer.sceneId.filter(function (scene) { return scene !== sceneId }) })}>&#x2715;</button>

            <button className="layerButton columnButton" onClick={() => newSound === "Invalid" ? alert("Invalid layer") : newSound.play()}>{props.layer.name}</button>




        </div>


    )
}
