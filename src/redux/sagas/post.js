import { put, takeEvery } from "redux-saga/effects";
import { createBlog, listPost } from "../api";
import { CREATE_POST, LIST_POST } from "../gobal";
import { addPostSlice, listPostSlice } from "../features/postSclice";

export function* createPostSaga(action) {
   try {
      const { data } = yield createBlog(action.payload);
      yield put(addPostSlice(data));
      action.toast.success(`Create Blogs success`);
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

export function* listPostSaga(action) {
   try {
      const { data } = yield listPost();
      yield put(listPostSlice(data));
   } catch (error) {
      console.log(error);
   }
}

export function* watchPostAsync() {
   yield takeEvery(CREATE_POST, createPostSaga);
   yield takeEvery(LIST_POST, listPostSaga);
}
