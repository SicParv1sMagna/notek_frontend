import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NotesTypes } from "../../utils/notes.types";

interface InitialState {
    markdowns?: NotesTypes[] | null,
    markdown: NotesTypes,
    searchQuery: string,
}

const initialState: InitialState = {
    markdown: {
        Markdown_ID: 0,
        Name: "",
        Content: "",
        Status: "",
        User_ID: 0,
        start_date: ""
    },
    searchQuery: '',
}

const markdownSlice = createSlice({
    name: "markdown",
    initialState: initialState,
    reducers: {
        setAllMarkdowns(state, action: PayloadAction<NotesTypes[] | null>) {
            state.markdowns = action.payload;
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