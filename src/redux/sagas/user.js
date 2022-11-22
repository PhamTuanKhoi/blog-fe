import { put, takeEvery } from "redux-saga/effects";
import { getusertoken, signIn, signUp } from "../api";
import { signinSclice } from "../features/authSlice";
import { addUserSlice, userSclice, userTokenSclice } from "../features/userSlice";
import { CREATE_USER, GET_USER_TOKEN, SIGNIN } from "../gobal";

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
      const { data } = yield signIn(action.user);
      yield put(signinSclice(data));
      yield put(userSclice(data.user));
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

export function* userbyTokenSaga(action) {
   try {
      const { data } = yield getusertoken(action.token);
      console.log(data);
      //  yield userTokenSclice(action.token);
      // yield put(userTokenSclice(data));
   } catch (error) {
      console.log(error);
   }
}

export function* watchUsersAsync() {
   yield takeEvery(CREATE_USER, createUserSaga);
   yield takeEvery(SIGNIN, signinSaga);
   yield takeEvery(GET_USER_TOKEN, userbyTokenSaga);
}
