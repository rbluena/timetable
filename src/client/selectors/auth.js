/* eslint-disable import/prefer-default-export */
import { decode } from 'jsonwebtoken';
import { createSelector } from 'reselect';

export const selectAuthenticatedUser = (state) => {
  const { token } = state.AUTH;

  if (token && token.length > 0) {
    return decode(token);
  }

  return null;
};

export const authenticatedUserSelector = createSelector(
  selectAuthenticatedUser,
  (global) => global
);

export const authTokenSelector = createSelector(
  (state) => state.AUTH.token,
  (token) => token
);
