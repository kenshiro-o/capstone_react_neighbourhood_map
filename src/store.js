import { createStore, combineReducers } from 'redux'
import mapReducer from "./modules/Map/reducers"
import placeSelectedReducer from "./modules/List/reducers"


const reducers = combineReducers({
    map: mapReducer,
    placeSelected: placeSelectedReducer
});

const store = createStore(reducers);
export default store
