import React, { Component } from 'react';
import store from '../../store';
import * as ListActions from './actions';
import { connect } from 'react-redux';

class ListContainer extends Component {
    handlePlaceClicked(e, name) {
        let placeSelected = this.props.places.filter(p => p.name === name)[0];
        if (e.target.classList.contains("place-selected")) {
            // Toggling place selected
            placeSelected = null;
        }

        store.dispatch({
            type: ListActions.PLACE_SELECTED,
            placeSelected: placeSelected
        });
    }


    render() {
        return (
            <ol className="places-list">
                {this.props.places.map((p, i) => {
                    let css = "place-list-item";
                    const { placeSelected } = this.props;
                    if (placeSelected && placeSelected.name === p.name) {
                        css += " place-selected";
                    }
                    return (
                        <li tabIndex="0" className={css} key={p.name} onClick={e => this.handlePlaceClicked(e, p.name)}>{p.name}</li>
                    );
                })}

            </ol>
        );
    }
};

const mapStateToProps = store => {
    return {
        placeSelected: store.placeSelected
    };
};

export default connect(mapStateToProps)(ListContainer);
