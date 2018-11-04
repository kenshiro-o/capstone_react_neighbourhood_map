import * as MapActions from "../actions";
import { combineReducers } from 'redux';

const mapReducer = (state = null, action) => {
    if (action.type === MapActions.MAP_LOAD_SUCCESS) {
        return action.map;
    }
    return state;
}

export default mapReducer;
