import { createSlice } from "@reduxjs/toolkit";

const cmtSlice = createSlice({
   name: "cmt",
   initialState: {
      cmt: {},
      cmts: [],
   },
   reducers: {
      addCmtSlice: (state, action) => {
         state.cmt = action.payload;
         state.cmts.push(action.payload);
         return state;
      },
   },
});

export const { addCmtSlice } = cmtSlice.actions;
export default cmtSlice.reducer;
