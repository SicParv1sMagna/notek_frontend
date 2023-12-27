import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NotesTypes } from "../../utils/notes.types";

interface InitialState {
    markdowns?: NotesTypes[] | null,
    markdown: NotesTypes,
    searchQuery: string,
    contributorID: number
}

const initialState: InitialState = {
    markdown: {
        Markdown_ID: 0,
        Name: "",
        Content: "",
        Status: "",
        User_ID: 0,
        start_date: "",
        PhotoURL: '',
    },
    searchQuery: '',
    contributorID: 0,
}

const markdownSlice = createSlice({
    name: "markdown",
    initialState: initialState,
    reducers: {
        setUpdatedMarkdowns(state, action: PayloadAction<any[] | null>) {
            state.markdowns = action.payload;
        },
        setAllMarkdowns(state, action: PayloadAction<any | null>) {
            state.markdowns = action.payload.Markdowns;
            state.contributorID = action.payload.Contributor_id; 
            console.log(action.payload.Contributor_id)
        },
        addMarkdown(state, action: PayloadAction<NotesTypes>) {
            state.markdowns?.push(action.payload);
        },
        setMarkdown(state, action: PayloadAction<NotesTypes>) {
            state.markdown = action.payload;
        },
        setSearchQuery(state, action: PayloadAction<string | null>) {
            if (action.payload !== null) {
                state.searchQuery = action.payload;
            }
        }
    }
})

export const { actions: markdownAction, reducer: markdownReducer } = markdownSlice;