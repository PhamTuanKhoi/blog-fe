import { put, takeEvery } from "redux-saga/effects";
import { createCmt } from "../api";
import { CREATE_CMT } from "../gobal";
import { addCmtSlice } from "../features/cmtSlice";

export function* createCmtSaga(action) {
   try {
      const { data } = yield createCmt(action.payload);
      yield put(addCmtSlice(data));
      action.toast.success(`Create cmt success`);
   } catch (error) {
      if (error && error.response && error.response.data && error.response.data.message) {
         if (typeof error.response.data.message === "string") {
            action.toast.error(error.response.data.message);
         } else {
            error.response.data.message.forEach((item) => {
               action.toast.error(item);
            });
         }
      }
   }
}

export function* watchCmtAsync() {
   yield takeEvery(CREATE_CMT, createCmtSaga);
}
