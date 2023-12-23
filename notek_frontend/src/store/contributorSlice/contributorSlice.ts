import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contributor } from "../../utils/contributor.types";
import { Markdowns } from "../types";

interface InitialState {
    contributors?: Contributor[];
    markdowns?: Markdowns[] | null;
}

const initialState: InitialState = {}

const contributorSlice = createSlice({
    name: "contributor",
    initialState: initialState,
    reducers: {
        setDrafts(state, action : PayloadAction<Markdowns[] | null>) {
            state.markdowns = action.payload;
        },
    }
})

export const { actions : contributorAction, reducer: contributorReducer } = contributorSlice;