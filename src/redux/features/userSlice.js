import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: "users",
   initialState: {
      username: "",
      password: "",
      name: "",
      dob: "",
      created_at: 0,
   },
   reducers: {
      addUserSlice: (state, action) => {
         state = action.payload;
         return state;
      },
   },
});

export const { addUserSlice } = userSlice.actions;
export default userSlice.reducer;
