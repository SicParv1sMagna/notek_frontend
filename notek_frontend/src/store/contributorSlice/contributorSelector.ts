import { RootState } from "../types";

export const selectDrafts = (state: RootState) => state.contributor.markdowns;

export const selectDraftsAmount = (state: RootState) => state.contributor.markdowns?.length; 

export const selectStartDateQuery = (state: RootState) => state.contributor.startDateQuery;

export const selectEndDateQuery = (state: RootState) => state.contributor.endDateQuery;

export const selectStatusQuery = (state: RootState) => state.contributor.status;

export const selectEmailQuery = (state: RootState) => state.contributor.email;