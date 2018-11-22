import React, { Component } from 'react';
import store from '../../store';
import * as MapActions from './actions';

class Map extends Component {
    state = {
        mapError: false
    };

    onScriptLoad() {
        const mapElement = document.getElementById(this.props.id);
        const handleErrorFn = this.onScriptError.bind(this);
        const callback = function (mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (const an of mutation.addedNodes) {
                        if (an.classList && an.classList.contains("gm-err-container")) {
                            handleErrorFn();
                        }
                    }
                }
            }
        };
        const mu = new MutationObserver(callback);
        const config = { attributes: false, childList: true, subtree: true };
        mu.observe(mapElement, config);

        setTimeout(() => {
            // We should not need to listen to mutation updates after 10 seconds
            mu.disconnect();
        }, 15000)


        const map = new window.google.maps.Map(
            mapElement,
            this.props.options
        );

        this.props.onMapLoad(map);
        store.dispatch({
            type: MapActions.MAP_LOAD_SUCCESS,
            map: map
        });
    }

    onScriptError(e) {
        const mapElement = document.getElementById(this.props.id);
        const errorGM = mapElement.getElementsByClassName("gm-err-container")
        if (errorGM.length > 0) {
            // Really ugly way of removing google maps error screen
            // Sadly I have not found something more elegant!
            mapElement.innerHTML = '';
            this.setState({ mapError: true });
            return;
        }
        // this.props.onMapError(e);
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
        // s.src = `https://maps.googleapis.com/maps/api/js?key=FAKE_KEY&v=3`

        // Making sure we load the script last, asynchronously
        s.defer = true;
        s.async = true;

        s.addEventListener("load", e => {
            console.log("Google Maps has been successfully loaded - Now creating the map")
            loadScript();
        });
        s.addEventListener("error", e => {
            console.log("Failed to load Google Maps");
            this.onScriptError(e);
        })

        // Insert this script at the very end of the body
        document.body.appendChild(s);
    }


    // Eiffer Tower: 48.8584° N, 2.2945° E
    render() {
        if (this.state.mapError) {
            return (
                <main role="main" className="map-container" id={this.props.id}
                    aria-live="assertive"
                >
                    <div className="map-error-msg-container">
                        <h1 className="map-error-msg">Error Loading Google Maps. Please check your API key.</h1>
                    </div>
                </main>
            );
        } else {
            return (
                <main role="main" className="map-container" id={this.props.id} aria-live="assertive">

                </main>
            );
        }
    }
}

export default Map;

