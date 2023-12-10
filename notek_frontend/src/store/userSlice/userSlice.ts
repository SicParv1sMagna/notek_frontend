import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Token, Markdowns } from "../types";

interface InitialState {
    user?: User,
    token?: Token,
    markdowns?: Markdowns,
}

const initialState: InitialState = {
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<Record<string, any>>) {
            state.user = {
                email: action.payload.Email,
                name: action.payload.FirstName,
                surname: action.payload.SecondName,
                status: action.payload.Status,
                role: action.payload.Role,
                userId: action.payload.User_ID,
                middlename: action.payload.MiddleName,
            }
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = { token: action.payload };
        },
        deleteToken(state) {
            state.token = undefined;
        }
    }
});

export const { actions: userAction, reducer: userReducer } = userSlice;
