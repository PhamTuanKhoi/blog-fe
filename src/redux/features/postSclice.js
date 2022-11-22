import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
   name: "posts",
   initialState: {
      post: {},
      posts: [],
   },
   reducers: {
      addPostSlice: (state, action) => {
         state.post = action.payload;
         return state;
      },
      listPostSlice: (state, action) => {
         state.posts = action.payload;
         return state;
      },
   },
});

export const { addPostSlice, listPostSlice } = postSlice.actions;
export default postSlice.reducer;
