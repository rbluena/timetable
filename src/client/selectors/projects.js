import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const projectsStateSelector = createSelector(
  (state) => state.PROJECTS,
  (projects) => projects
);

const selectProjects = (state) => {
  const { projects, result, meta } = state.PROJECTS;

  if (result && result.length) {
    return { projects, result, meta };
  }

  return {};
};

const selectProject = (state) => {
  const { project, projectId } = state.PROJECTS;

  if (projectId && project) {
    return project[projectId];
  }
  return {};
};

const selectProjectGroups = (state) => {
  const { groups } = state.PROJECTS;

  if (groups) {
    return groups;
  }

  return {};
};

const selectProjectCategories = (state) => {
  const { categories } = state.PROJECTS;

  if (categories) {
    return categories;
  }

  return {};
};

export const projectsSelector = createSelector(
  selectProjects,
  (projects) => projects
);

export const projectSelector = createSelector(
  selectProject,
  (project) => project
);

export const projectGroupsSelector = createSelector(
  selectProjectGroups,
  (groups) => groups
);

export const projectCategoriesSelector = createSelector(
  selectProjectCategories,
  (groups) => groups
);
