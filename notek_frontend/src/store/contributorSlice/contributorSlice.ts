import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contributor } from "../../utils/contributor.types";
import { Markdowns } from "../types";

interface InitialState {
    contributors?: Contributor[];
    markdowns?: Markdowns[] | null;
    startDateQuery: string,
    endDateQuery: string,
    status: string,
}

const initialState: InitialState = {
    startDateQuery: '',
    endDateQuery: '',
    status: '',
}

const contributorSlice = createSlice({
    name: "contributor",
    initialState: initialState,
    reducers: {
        setDrafts(state, action : PayloadAction<Markdowns[] | null>) {
            state.markdowns = action.payload;
        },
        setStartDateQuery(state, action: PayloadAction<string|null>) {
            if (action.payload !== null) {
                state.startDateQuery = action.payload;
            }
        },
        setEndDateQuery(state, action: PayloadAction<string|null>) {
            if (action.payload !== null) {
                state.endDateQuery = action.payload;
            }
        },
        setStatus(state, action: PayloadAction<string|null>) {
            if (action.payload !== null) {
                state.status = action.payload;
            }
        }
    }
})

export const { actions : contributorAction, reducer: contributorReducer } = contributorSlice;