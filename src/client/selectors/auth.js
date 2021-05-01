/* eslint-disable import/prefer-default-export */
import { decode } from 'jsonwebtoken';
import { createSelector } from 'reselect';
import { selectProject } from './projects';

export const selectAuthenticatedUser = (state) => {
  const { token } = state.AUTH;

  if (token && token.length > 0) {
    return decode(token);
  }

  return null;
};

const selectIsUserProjectMember = (state) => {
  const { team } = selectProject(state);
  const user = selectAuthenticatedUser(state);
  let projectMember = false;

  if (user && team) {
    projectMember = team.includes(user._id);
  }

  return projectMember;
};

const selectIsUserProjectOwner = (state) => {
  const { isUserOwner } = selectProject(state);
  let isOwner = false;

  if (isUserOwner) {
    isOwner = true;
  }

  return isOwner;
};

export const isUserProjectMemberSelector = createSelector(
  selectIsUserProjectMember,
  (isMember) => isMember
);

export const isUserProjectOwnerSelector = createSelector(
  selectIsUserProjectOwner,
  (isOwner) => isOwner
);

export const authenticatedUserSelector = createSelector(
  selectAuthenticatedUser,
  (global) => global
);

export const authTokenSelector = createSelector(
  (state) => state.AUTH.token,
  (token) => token
);
