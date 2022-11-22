import { put, takeEvery } from "redux-saga/effects";
import { signUp } from "../api";
import { addUserSlice } from "../features/userSlice";
import { CREATE_USER } from "../gobal";

export function* createUserSaga(action) {
   try {
      yield signUp(action.user);
      yield put(addUserSlice(action.user));
      action.toast.success(`Sigup success`);
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

export function* watchUsersAsync() {
   yield takeEvery(CREATE_USER, createUserSaga);
}
