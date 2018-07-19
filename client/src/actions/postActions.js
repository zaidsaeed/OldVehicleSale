import axios from "axios";

import {
    ADD_POST,
    GET_ERRORS,
    POST_LOADING,
    GET_POSTS,
    DELETE_POST, GET_PROFILE
} from "./types";
import {setProfileLoading} from "./profileActions";

//Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
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
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get("/api/posts")
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};

// Get post by handle
export const getPostsByHandle = (handle) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: "Hi"
            })
        );
};

export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set Loading State
export const setPostLoading = () => {
  return { type: POST_LOADING };
};
