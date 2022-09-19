import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";


const persistConfig = {
    key: "users",
    version: 1,
    storage,
};

const reducer = combineReducers({
    todoHandle: todoSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
    reducer: persistedReducer,
})