// In your userSlice.ts or a separate file
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

export const selectToken = (state: RootState) => state.user.token;

export const selectIsAuthenticated = createSelector(
  [selectToken],
  (token) => !!token
);

export const selectUser = (state: RootState) => state.user.user;