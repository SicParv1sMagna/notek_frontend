import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
    })
})