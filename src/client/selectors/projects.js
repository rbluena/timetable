import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const projectsStateSelector = createSelector(
  (state) => state.PROJECTS,
  (projects) => projects
);
