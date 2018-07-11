import axios from "axios";

import { ADD_BOOKMARK, DELETE_BOOKMARK, GET_ERRORS } from "./types";

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

//Get Posts
// export const getBookmarks = () => dispatch => {
//   dispatch(setPostLoading());
//   axios
//     .get("/api/bookmarks")
//     .then(res =>
//       dispatch({
//         type: GET_BOOK,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_POSTS,
//         payload: null
//       })
//     );
// };

// //Set Loading State
// export const setPostLoading = () => {
//   return { type: POST_LOADING };
// };
