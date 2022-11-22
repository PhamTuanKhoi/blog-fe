import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: "users",
   initialState: {
      user: {},
   },
   reducers: {
      addUserSlice: (state, action) => {
         state.user = action.payload;
         return state;
      },

      userSclice: (state, action) => {
         state.user = action.payload;
         return state;
      },

      userTokenSclice: (state, action) => {
         state.user = action.payload;
         return state.user;
      },
   },
});

export const { addUserSlice, userSclice, userTokenSclice } = userSlice.actions;
export default userSlice.reducer;
