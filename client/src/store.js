import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

import thunk from "redux-thunk";

const initState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initState,
  compose(applyMiddleware(...middleware), composeWithDevTools())
);

export default store;
