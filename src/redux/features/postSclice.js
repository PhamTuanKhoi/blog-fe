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

      titlePostSlice: (state, action) => {
         // console.log(action.payload, "l");
         state.posts = state.posts.filter((i) => i.title === action.payload);
      },
   },
});

export const { addPostSlice, listPostSlice, titlePostSlice } = postSlice.actions;
export default postSlice.reducer;
