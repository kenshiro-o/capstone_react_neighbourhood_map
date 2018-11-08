import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import GoogleMapReact from 'google-map-react';
import Map from './modules/Map/Map';
import { connect } from 'react-redux';
// import PlacesContainer from './modules/Places/PlacesContainer';
// import ListContainer from './modules/List/ListContainer';
import SearchContainer from './modules/Search/SearchContainer';

class App extends Component {
  /*
   Will be storing the coordinates of important landscapes in an array

   Eiffer Tower: 48.8584° N, 2.2945° E
   Notre Dame: 48.8530° N, 2.3499° E
   Jardin Du Luxembourg: 48.8462° N, 2.3372° E
   Musee D'Orsay: 48.8600° N, 2.3266° E
   Louvres Museum: 48.8606° N, 2.3376° E
   Arc de Triomphe: 48.8738° N, 2.2950° E
   Champs Elysees: 48.870502, 2.304897
   Hotel De Ville: 48.856373, 2.353016
   */

  static defaultProps = {
    places: [
      { name: "Eiffel Tower", lat: 48.8584, lng: 2.2945, type: "monument" },
      { name: "Notre-Dame de Paris", lat: 48.8530, lng: 2.3499, type: "monument" },
      { name: "Jardin Du Luxembourg", lat: 48.8462, lng: 2.3372, type: "park" },
      { name: "Musee D'orsay", lat: 48.8600, lng: 2.3266, type: "museum" },
      { name: "Musee Du Louvres", lat: 48.8606, lng: 2.3376, type: "museum" },
      { name: "Hotel De Ville", lat: 48.856373, lng: 2.353016, type: "public building" },
      { name: "Champs Elysees", lat: 48.870502, lng: 2.304897, type: "road" },
      { name: "Arc de Triomphe", lat: 48.8738, lng: 2.2950, type: "monument" }

    ]
  };

  onMapLoad(map) {

  }

  onMapError(e) {
    console.log(`Map load error: ${e}`);
    alert(`Map load error - please try reloading website`);
  }


  onSideMenuClicked(e) {
    const sMenu = document.getElementsByClassName("side-menu")[0];
    sMenu.classList.toggle("visible");

    // slide-right
    const slider = document.getElementsByClassName("side-menu-slider")[0];
    slider.classList.toggle("slide-right");
  }


  render() {
    return (
      <div id="app">
        <nav className="side-menu">
          <div className="side-menu-slider-container">
            <span className="side-menu-slider" onClick={e => this.onSideMenuClicked(e)}>
              {/* <img src="/img/left_arrow_24px.svg" alt="left arrow button to display menu"></img> */}
            </span>

          </div>
          <SearchContainer defaultPlaces={this.props.places}></SearchContainer>
        </nav>

        <Map
          id="myMap"
          apiKey="AIzaSyDA1fk5GeD_mTaamOwe_rgZtAEIgkRltjw"

          options={{
            center: { lat: 48.8566, lng: 2.3522 },
            zoom: 13
          }}

          onMapLoad={this.onMapLoad}
          onMapError={this.onMapError}
        />
      </div>

    );
  }
}


const mapStateToProps = (store) => {
  return {
    map: store.map
  }
}

export default connect(mapStateToProps)(App);
