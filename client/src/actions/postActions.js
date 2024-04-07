import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST,
  GET_PROFILE,
} from "./types";
import { setProfileLoading } from "./profileActions";

//Add Post
export const addPost = (postData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Get Posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("https://oldvehiclesalebackend.onrender.com/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// Get post by handle
export const getPostsByHandle = (handle) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(
      `https://oldvehiclesalebackend.onrender.com/api/posts/handle/${handle}`
    )
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// Get post by price
export const getPostsByPrice = (priceRange) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(
      `https://oldvehiclesalebackend.onrender.com/api/posts/priceRange/${priceRange}`
    )
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`https://oldvehiclesalebackend.onrender.com/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Set Loading State
export const setPostLoading = () => {
  return { type: POST_LOADING };
};
