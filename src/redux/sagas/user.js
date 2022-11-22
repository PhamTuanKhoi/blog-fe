import { put, takeEvery } from "redux-saga/effects";
import { signUp } from "../api";
import { addUserSlice } from "../features/userSlice";

export function* createUserSaga(action) {
   yield signUp(action.user);
   yield put(addUserSlice(action.user));
}

export function* watchUsersAsync() {
   yield takeEvery(`create/user`, createUserSaga);
}
