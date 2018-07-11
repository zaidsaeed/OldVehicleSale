import { combineReducers } from "redux";

import authReducer from "./authReducer";

import errorReducer from "./errorReducer";

import postReducer from "./postReducer";

import bookmarkReducer from "./bookmarkReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postReducer,
  bookmarks: bookmarkReducer
});
