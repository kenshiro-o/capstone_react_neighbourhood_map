import React, { Component } from 'react';
import store from '../../store';
import * as MapActions from './actions';

class Map extends Component {


    onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
            this.props.options
        );
        this.props.onMapLoad(map);

        store.dispatch({
            type: MapActions.MAP_LOAD_SUCCESS,
            map: map
        });
    }

    onScriptError(e) {
        this.props.onMapError(e);
    }

    componentDidMount() {
        const loadScript = this.onScriptLoad.bind(this);
        if (window.google) {
            loadScript();
            return;
        }
        let s = document.createElement("script");
        s.type = "text/javascript";
        s.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}&v=3`

        // Making sure we load the script last, asynchronously
        s.defer = true;
        s.async = true;
        // Insert this script at the very end of the body
        document.body.appendChild(s);
        s.addEventListener("load", e => {
            console.log("Google Maps has been successfully loaded - Now creating the map")
            loadScript();
        });
        s.addEventListener("error", e => {
            console.log("Failed to load Google Maps");
            this.onScriptError(e);
        })
    }


    // Eiffer Tower: 48.8584° N, 2.2945° E
    render() {
        return (
            <main role="main" className="map-container" id={this.props.id} />
        );
    }
}

export default Map;

