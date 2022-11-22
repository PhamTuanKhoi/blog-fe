import axios from "axios";

const API = axios.create({
   baseURL: `${process.env.REACT_APP_DEV_API}`,
});

export const signUp = (payload) => API.post("/users/signup", payload);
