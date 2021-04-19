import { get } from 'lodash';
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
  const { groups: groupIds } = selectProject(state);

  if (groupIds && groupIds.length) {
    return groupIds.map((groupId) => ({ ...groups[groupId] }));
  }

  return [];
};

const selectProjectMembers = (state) => {
  const { members } = state.PROJECTS;

  if (members) {
    return members;
  }

  return {};
};
/**
 * Selecting team members for the project.
 * @param {Object} state
 */
const selectProjectTeam = (state) => {
  const team = get(state.PROJECTS, 'team');
  const teamIds = get(state.PROJECTS.project, 'team');

  if (teamIds && teamIds.length) {
    return teamIds.map((teamId) => ({ ...team[teamId] }));
  }

  return [];
};

export const selectProjectCategories = (state) => {
  const { categories } = state.PROJECTS;

  if (categories) {
    return categories;
  }

  return {};
};

const selectProjectAssignees = (state) => {
  const project = selectProject(state);
  const { team, groups } = state.PROJECTS;

  let users = [];
  let mappedGroups = [];

  if (project && project.groups && project.groups.length) {
    mappedGroups = project.groups.map((groupId) => ({ ...groups[groupId] }));
  }

  if (project && project.team && project.team.length) {
    users = project.team.map((userId) => ({ ...team[userId] }));
  }

  return { users, groups: mappedGroups };
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

export const projectTeamSelector = createSelector(
  selectProjectTeam,
  (team) => team
);

export const projectMembersSelector = createSelector(
  selectProjectMembers,
  (members) => members
);

export const projectAssigneesSelector = createSelector(
  selectProjectAssignees,
  (assignees) => assignees
);
