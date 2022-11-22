import { put, takeEvery } from "redux-saga/effects";
import { signIn, signUp } from "../api";
import { addUserSlice, signinSclice } from "../features/userSlice";
import { CREATE_USER, SIGNIN } from "../gobal";

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

export function* signinSaga(action) {
   try {
      yield signIn(action.user);
      yield put(signinSclice(action.user));
      action.toast.success(`Sigin success`);
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
   yield takeEvery(SIGNIN, signinSaga);
}
