import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { apiPrefix } from "./constants";

//Register User
export const registerUser = (userData, callback) => (dispatch) => {
  const apiUrl = `${apiPrefix}/api/users/register`;
  axios
    .post(apiUrl, userData)
    .then((res) => {
      callback();
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login User
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${apiPrefix}/api/users/login`, userData)
    .then((res) => {
      //Save to local storage
      const { token } = res.data;
      //Set token to local storage
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));

      () => getUserFromDB();
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login User
export const getUserFromDB = () => (dispatch) => {
  axios
    .get(`${apiPrefix}/api/users/currentUser`)
    .then((res) => {
      console.log(res.data);
      //Save to local storage
      const { user } = res.data;
      //Set current user
      dispatch(setCurrentUser(user));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Set Logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  //Set Current user to {} which change isAuthenticated to false as well
  dispatch(setCurrentUser({}));
};
