import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userslice from "./features/userSlice";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/authSlice";
import postSclice from "./features/postSclice";
import cmtSlice from "./features/cmtSlice";

const sagaMiddleware = createSagaMiddleware();
//persit
const persistConfig = {
   key: "root",
   storage,
   whitelist: ["auth"],
};
//reducer
const reducer = combineReducers({
   user: userslice,
   auth: authSlice,
   post: postSclice,
   cmt: cmtSlice,
});

//persistReducer
const persistedReducer = persistReducer(persistConfig, reducer);
//store
const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
