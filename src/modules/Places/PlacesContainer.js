import React, { Component } from 'react';
import PlaceContainer from '../Place/PlaceContainer';
import { connect } from 'react-redux';

class PlacesContainer extends Component {

    render() {
        return (
            <div className="places-container">
                {this.props.places.map((p) => {
                    return (<PlaceContainer key={p.name} lat={p.lat} lng={p.lng} name={p.name} />);
                })}
            </div>
        );
    }
};

const mapStateToProps = store => {
    return { map: store.map }
};

export default connect(mapStateToProps)(PlacesContainer);

