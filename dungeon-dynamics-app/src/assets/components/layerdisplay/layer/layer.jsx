import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Howl, Howler } from 'howler'
// Class component that controls the whole room, and is the highest level of state.

export default function Layer(props) {

    let newSound;

    if (props.layer) {
        newSound = new Howl({
            src: [props.layer.url]
        });
    } else {
        newSound = new Howl({
            src: 'text.mp3'
        })
    }

    console.log("this is layer: " + newSound)

    return (

        <div>
            <button onClick={() => newSound.play()}>{props.layer.name}</button>
        </div>


    )
}
