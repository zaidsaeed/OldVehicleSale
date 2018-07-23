import axios from "axios";

import {
  ADD_BOOKMARK,
  DELETE_BOOKMARK,
  GET_BOOKMARKS,
  GET_ERRORS
} from "./types";

//Add Post
export const addBookmark = bookmarkData => dispatch => {
  axios
    .post("/api/bookmarks", bookmarkData)
    .then(res =>
      dispatch({
        type: ADD_BOOKMARK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Remove Bookmark
export const removeBookmark = postId => dispatch => {
  axios.get("/api/bookmarks").then(res => {
    const bookmark = res.data.find(bookmark => {
      if (bookmark.post === postId) {
        return bookmark;
      }
    });
    axios
      .delete(`/api/bookmarks/${bookmark._id}`)
      .then(res =>
        dispatch({
          type: DELETE_BOOKMARK,
          id: bookmark._id
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  });
};

//Get Bookmarks
export const getBookmarks = () => dispatch => {
  axios
    .get("/api/bookmarks")
    .then(res =>
      dispatch({
        type: GET_BOOKMARKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOOKMARKS,
        payload: null
      })
    );
};

// //Set Loading State
// export const setPostLoading = () => {
//   return { type: POST_LOADING };
// };
