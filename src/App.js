import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import GoogleMapReact from 'google-map-react';
import Map from './modules/Map/Map';
import { connect } from 'react-redux';
// import PlacesContainer from './modules/Places/PlacesContainer';
// import ListContainer from './modules/List/ListContainer';
import SearchContainer from './modules/Search/SearchContainer';
import * as constants from './constants';

class App extends Component {

  static defaultProps = {
    places: constants.places
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

    const sMenuVisible = sMenu.classList.contains("visible");
    if (sMenuVisible) {
      slider.setAttribute("aria-checked", "true");
    } else {
      slider.setAttribute("aria-checked", "false");
    }
  }


  render() {
    return (
      <div id="app">
        <nav className="side-menu" role="navigation" aria-label="Place Selector Navigation">
          <div className="side-menu-slider-container">
            <span className="side-menu-slider" role="switch" aria-checked="false"
              onClick={e => this.onSideMenuClicked(e)} >
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
