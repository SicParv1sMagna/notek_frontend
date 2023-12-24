import { NotesTypes } from "../../utils/notes.types";
import { RootState } from "../types";

export const selectMarkdowns = (state: RootState) => state.markdown.markdowns;

export const selectMarkdown = (state: RootState) : NotesTypes => state.markdown.markdown;

export const selectMarkdownContent = (state: RootState) : string => state.markdown.markdown.Content;

export const selectSearchQuery = (state: RootState) : string => state.markdown.searchQuery;

export const selectContributorId = (state: RootState) : number => state.markdown.contributorID;