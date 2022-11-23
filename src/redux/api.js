import axios from "axios";

const API = axios.create({
   baseURL: `http://localhost:3005/`,
});

//user
export const signIn = (payload) => API.post("/users/signin", payload);
export const signUp = (payload) => API.post("/users/signup", payload);
export const getusertoken = (token) => API.get("users/token/" + token);

//blog
export const createBlog = (payload) => API.post("/posts/create", payload);
export const listPost = () => API.get("posts/list/");

//cmt
export const createCmt = (payload) => API.post("/cmt/create", payload);
