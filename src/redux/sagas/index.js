import { all } from "redux-saga/effects";
import { watchCmtAsync } from "./cmt";
import { watchPostAsync } from "./post";
import { watchUsersAsync } from "./user";

export function* rootSaga() {
   yield all([watchUsersAsync(), watchPostAsync(), watchCmtAsync()]);
}
