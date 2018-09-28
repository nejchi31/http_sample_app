import { createStore, combineReducers, applyMiddleware } from 'redux';

//import the root reducer
import reducerRoot from'./reducers/index_reducer.js';

import thunk from 'redux-thunk';


const store = createStore(
 reducerRoot,
 applyMiddleware(thunk)
)
export default store;
