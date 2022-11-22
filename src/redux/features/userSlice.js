import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: "users",
   initialState: {
      user: {},
      token: "",
   },
   reducers: {
      addUserSlice: (state, action) => {
         state.user = action.payload;
         return state;
      },

      signinSclice: (state, action) => {
         state = action.payload.token;
         return state;
      },
   },
});

export const { addUserSlice, signinSclice } = userSlice.actions;
export default userSlice.reducer;
