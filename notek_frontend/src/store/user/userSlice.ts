import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    email?: string,
    name?: string,
    surname?: string,
    status?: string,
    role?: number,
}

const InitialState : InitialState = {
    email: undefined,
    name: undefined,
    surname: undefined,
    status: undefined,
    role: undefined,
}

const userSlice = createSlice({
    name: "user",
    initialState: InitialState,
    reducers: {
        setUser (state, payload) {
            
        },
        
    }
})

export const { actions: userAction, reducer: userReducer} = userSlice;