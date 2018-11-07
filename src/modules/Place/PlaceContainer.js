import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import WikipediaAPI from '../../API/WikipediaAPI';
import * as ListActions from '../List/actions';

class PlaceContainer extends Component {
    state = {
        marker: null,
        infoWindow: null,
        placeInfo: null,
        tick: false
    };

    componentDidMount() {
        // Rebuild the marker in case we are remounting the component
        // Clearly this is not the most efficient method (could keep toggled state)
        // But it will do for this occasion as we are not too concerned with performance
        if (this.props.map) {
            this.createMarker();
            this.buildPlaceInfo();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Do not re-create the marker
        if (this.props.map !== prevProps.map && !this.state.marker) {
            this.createMarker();
            this.buildPlaceInfo();
            return;
        }

        if (this.state.placeInfo && this.state.marker) {
            if (!this.state.infoWindow) {
                // Only build the infowindow if it is not present
                this.createInfoWindow();
            }
        }

        const { placeSelected, name } = this.props;
        if (this.state.marker && prevProps.placeSelected !== placeSelected) {
            // Only animate the marker in case our place has been selected
            if (placeSelected && placeSelected.name === name) {
                this.showInfoWindow();
                this.state.marker.setAnimation(window.google.maps.Animation.BOUNCE);
                this.setState({
                    tick: true
                });
            }
            if (prevProps.placeSelected && prevProps.placeSelected.name === name) {
                this.state.marker.setAnimation(null);
                this.closeInfoWindow();
                this.setState({
                    tick: true
                });
            }
        }
    }

    createMarker() {
        if (!this.state.marker) {
            let marker = new window.google.maps.Marker({
                position: { lat: this.props.lat, lng: this.props.lng },
                title: this.props.name,
                map: this.props.map
            });
            this.setState({ marker: marker });
        }
    }

    closeInfoWindow() {
        if (this.state.infoWindow) {
            this.state.infoWindow.close();
        }
    }

    showInfoWindow() {
        if (!this.state.infoWindow) {
            return;
        }
        this.state.infoWindow.open(this.props.map, this.state.marker);
    }

    createInfoWindow() {
        const wApi = new WikipediaAPI("en");
        const setState = this.setState.bind(this);
        const buildContent = this.buildInfoWindowContent.bind(this);
        const showInfoWindow = this.showInfoWindow.bind(this);
        const { name } = this.props;
        const { marker, placeInfo } = this.state;
        wApi.search(this.props.name)
            .then(results => {
                if (!results && results.length === 0) {
                    return;
                }
                return wApi.getPageSummary(results[0].title);
            }).then(summary => {
                const iw = new window.google.maps.InfoWindow({
                    content: placeInfo
                });
                marker.addListener("click", () => {
                    // Force a new common state update so that all components
                    // (including parent and adjacent ones) get the latest update
                    store.dispatch({
                        placeSelected: { name: name },
                        type: ListActions.PLACE_SELECTED
                    });
                });
                setState({ infoWindow: iw });
            })
    }

    buildInfoWindowContent(summary) {
        let content = `<div class="place-info-container">
            <h2 class="place-title">${summary.title}</h2>
            <div class="place-content-container">
                <div class="place-summary">

                <p>${summary.extract}</p>

                <p>
                More information available on <a href=${summary["content_urls"]["desktop"]["page"]} target="_blank">Wikipedia</a>.
                </p>


                </div>
                <div class="place-image-container">
                    <img class="place-image" src=${summary.thumbnail.source} alt="photo of ${summary.title}" >
                </div>
            </div>
        </div>`;
        return content;
    }

    buildPlaceInfo() {
        const wApi = new WikipediaAPI("en");
        const buildContent = this.buildInfoWindowContent.bind(this);
        const setState = this.setState.bind(this);
        wApi.search(this.props.name)
            .then(results => {
                if (!results && results.length === 0) {
                    return;
                }
                return wApi.getPageSummary(results[0].title);
            }).then(summary => {
                setState({ placeInfo: buildContent(summary) });
            });
    }


    componentWillUnmount() {
        // As the component will be phased out, we would like it not to display on the map anymore
        if (!this.state.marker) {
            return;
        }
        this.state.marker.setMap(null);
    }


    render() {
        return (
            null
        );
    }
};

const mapStateToProps = store => {
    return {
        map: store.map,
        placeSelected: store.placeSelected
    };
};

export default connect(mapStateToProps)(PlaceContainer);
