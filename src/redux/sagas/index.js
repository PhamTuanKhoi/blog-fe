import { all } from "redux-saga/effects";
import { watchPostAsync } from "./post";
import { watchUsersAsync } from "./user";

export function* rootSaga() {
   yield all([watchUsersAsync(), watchPostAsync()]);
}
