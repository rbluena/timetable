import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const projectsStateSelector = createSelector(
  (state) => state.PROJECTS,
  (projects) => projects
);

const selectProjects = (state) => {
  const { projects: unmapped, result: projectIds, meta } = state.PROJECTS;

  if (projectIds && projectIds.length) {
    const projects = projectIds.map((projectId) => ({
      ...unmapped[projectId],
    }));
    return { projects, meta };
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

const selectProjectMembers = (state) => {
  const { members } = state.PROJECTS;

  if (members) {
    return members;
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

const selectProjectAssignees = (state) => {
  const { members: users, groups } = state.PROJECTS;
  return { users, groups };
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

export const projectMembersSelector = createSelector(
  selectProjectMembers,
  (members) => members
);

export const projectAssigneesSelector = createSelector(
  selectProjectAssignees,
  (assignees) => assignees
);
