import * as ListActions from '../actions';

const placeSelectedReducer = (state, action) => {
    console.log("*** PLACE SELECTED REDUCER ***");
    if (action.type === ListActions.PLACE_SELECTED) {
        return action.placeSelected;
    }
    return null;
}

export default placeSelectedReducer;
