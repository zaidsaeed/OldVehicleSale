import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

import thunk from "redux-thunk";

const initState = {};

const middleware = [thunk];

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION
  ? window.REDUX_DEVTOOLS_EXTENSION()
  : (f) => f;

const store = createStore(
  rootReducer,
  initState,
  compose(applyMiddleware(...middleware), composeWithDevTools(composeEnhancers))
);

export default store;
