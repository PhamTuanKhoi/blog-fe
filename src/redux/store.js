import { configureStore } from "@reduxjs/toolkit";
import userslice from "./features/userSlice";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
   reducer: {
      user: userslice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
