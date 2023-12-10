import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contributor } from "../../utils/contributor.types";

interface InitialState {
    contributors?: Contributor[];
}

const initialState: InitialState = {}

const contributorSlice = createSlice({
    name: "contributor",
    initialState: initialState,
    reducers: {
        setContributorsByMarkdown(state, action: PayloadAction<Record<string, any>>) {
            
        }
    }
})
