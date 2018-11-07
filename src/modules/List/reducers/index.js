import * as ListActions from '../actions';

const placeSelectedReducer = (state = null, action) => {
    if (action.type === ListActions.PLACE_SELECTED) {
        return action.placeSelected;
    }
    return state;
}

export default placeSelectedReducer;
