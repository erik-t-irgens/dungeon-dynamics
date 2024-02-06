import { h, render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Layer from '../layerdisplay/layer/layer';

// Class component that controls the whole room, and is the highest level of state.

export default class RoomControl extends Component {

    constructor() {
        super();
    }


    render() {
        const { layers } = this.props;
        return (
            <div>
                {layers.map(layer => (
                    <div key={layer.id}>
                        <Layer key={layer.id} layer={layer} ></Layer>
                    </div>
                ))}
            </div >
        )
    }
}
