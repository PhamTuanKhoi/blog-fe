import axios from "axios";

const API = axios.create({
   baseURL: `http://localhost:3001/`,
});

console.log({ API });

export const signUp = (payload) => API.post("/users/signup", payload);
