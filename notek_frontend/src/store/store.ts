import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice/userSlice";
import { markdownReducer } from "./markdownSlice/markdownSlice";
import { contributorReducer } from "./contributorSlice/contributorSlice";

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        markdown: markdownReducer,
        contributor: contributorReducer
    })
})