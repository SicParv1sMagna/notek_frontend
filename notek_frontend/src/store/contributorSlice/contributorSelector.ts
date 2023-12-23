import { RootState } from "../types";

export const selectDrafts = (state: RootState) => state.contributor.markdowns;

export const selectDraftsAmount = (state: RootState) => state.contributor.markdowns?.length; 