import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",
   initialState: {
      token: "",
      user: {},
   },
   reducers: {
      signinSclice: (state, action) => {
         state = action.payload;
         return state;
      },
   },
});

export const { signinSclice } = authSlice.actions;
export default authSlice.reducer;
