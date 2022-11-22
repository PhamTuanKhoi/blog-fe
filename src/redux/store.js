import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userslice from "./features/userSlice";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();
//persit
const persistConfig = {
   key: "root",
   storage,
   whitelist: ["user"],
};
//reducer
const reducer = combineReducers({
   user: userslice,
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
