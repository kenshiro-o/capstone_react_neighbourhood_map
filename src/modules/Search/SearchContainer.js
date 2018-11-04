import React, { Component } from 'react';
import ListConainter from '../List/ListContainer';
import PlacesContainer from '../Places/PlacesContainer';


class SearchContainer extends Component {
    state = {
        query: "",
        matchedPlaces: []
    }

    componentDidMount() {
        this.setState({
            matchedPlaces: this.props.defaultPlaces
        });
    }

    onQueryChange(e) {
        const q = e.target.value;
        console.log(`Query has change ${q}`);

        const { defaultPlaces } = this.props;
        let matchedPlaces = this.props.defaultPlaces;
        if (q) {
            const match = new RegExp(q, "i");
            matchedPlaces = defaultPlaces.filter((p) => match.test(p.name))
        }

        console.log(`Matched Places: ${JSON.stringify(matchedPlaces)}`);
        this.setState({
            query: q,
            matchedPlaces: matchedPlaces
        });

    }

    render() {
        return (
            <div className="search-list-container">
                <div className="search-container">
                    <input className="search-bar" type="text" placeholder="Type place to search"
                        value={this.state.query}
                        onChange={e => this.onQueryChange(e)}
                    />
                </div>

                <div className="list-container">
                    <ListConainter places={this.state.matchedPlaces} />
                </div>

                <PlacesContainer places={this.state.matchedPlaces} />
            </div>
        );
    }
};

export default SearchContainer;
