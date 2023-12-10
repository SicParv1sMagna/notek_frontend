import { NotesTypes } from "../utils/notes.types";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface User {
    email?: string,
    name?: string,
    surname?: string,
    status?: string,
    role?: number,
    userId?: number,
    middlename?: string,
}

export interface Token {
    token?: string,
}

export interface Markdowns {
    markdowns: NotesTypes[];
}