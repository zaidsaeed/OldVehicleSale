export const LOCAL_API_URL = "http://localhost:5000";

export const RENDER_API_URL = "https://oldvehiclesalebackend.onrender.com";

export const apiPrefix =
  process.env.REACT_APP_API_URL === "LOCALHOST"
    ? LOCAL_API_URL
    : RENDER_API_URL;
