import React, { Component } from 'react';
import store from '../../store';
import * as ListActions from './actions';
import { connect } from 'react-redux';

class ListContainer extends Component {
    handlePlaceClicked(e, name) {
        console.log("Place has been clicked " + name);
        let placeSelected = this.props.places.filter(p => p.name === name)[0];
        if (e.target.classList.contains("place-selected")) {
            // Toggling place selected
            placeSelected = null;
        }

        store.dispatch({
            type: ListActions.PLACE_SELECTED,
            placeSelected: placeSelected
        });

        // const api = new WikipediaAPI("en");
        // api.search("Eiffel Tower")
        //     .then(d => {
        //         // TODO iterate through the results and fetch the summary of the most likely one
        //     })

        // api.getPageSummary("Eiffel Tower").then(d => {
        //     console.log(`Summary = ${JSON.stringify(d)}`);
        // });
    }


    render() {
        return (
            <ol className="places-list">
                {this.props.places.map(p => {
                    let css = "place-list-item";
                    const { placeSelected } = this.props;
                    if (placeSelected && placeSelected.name === p.name) {
                        css += " place-selected";
                    }
                    return (
                        <li className={css} key={p.name} onClick={e => this.handlePlaceClicked(e, p.name)}>{p.name}</li>
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
