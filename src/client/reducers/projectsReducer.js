import { omit } from 'lodash';

export const setCurrentProject = 'PROJECTS/CURRENT_PROJECT';
export const setActiveProject = 'PROJECTS/ACTIVE_PROJECT';
export const retrieveUserProjectsSuccess =
  'PROJECTS/RETRIEVE_USER_PROJECTS_SUCCESS';
export const createProject = 'PROJECTS/CREATE_PROJECT';
export const createProjectSuccess = 'PROJECTS/CREATE_PROJECT_SUCCESS';
export const createProjectFailure = 'PROJECTS/CREATE_PROJECT_FAILURE';
export const updateProject = 'PROJECTS/UPDATE_PROJECT';
export const updateProjectSuccess = 'PROJECTS/UPDATE_PROJECT_SUCCESS';
export const updateProjectFailure = 'PROJECTS/UPDATE_PROJECT_FAILURE';
export const deleteProject = 'PROJECTS/DELETE_PROJECT';
export const deleteProjectSuccess = 'PROJECTS/DELETE_PROJECT_SUCCESS';
export const deleteProjectFailure = 'PROJECTS/DELETE_PROJECT_FAILURE';
export const addProjectGroup = 'PROJECTS/ADD_PROJECT_GROUP';
export const addProjectGroupSuccess = 'PROJECTS/ADD_PROJECT_GROUP_SUCCESS';
export const addProjectGroupFailure = 'PROJECTS/ADD_PROJECT_GROUP_FAILURE';
export const updateProjectGroup = 'PROJECTS/UPDATE_PROJECT_GROUP';
export const updateProjectGroupSuccess =
  'PROJECTS/UPDATE_PROJECT_GROUP_SUCCESS';
export const updateProjectGroupFailure =
  'PROJECTS/UPDATE_PROJECT_GROUP_FAILURE';
export const deleteProjectGroup = 'PROJECTS/DELETE_PROJECT_GROUP';
export const deleteProjectGroupSuccess =
  'PROJECTS/DELETE_PROJECT_GROUP_SUCCESS';

const initialState = {
  fetching: false,
  currentProject: null,
};

export default function projectsReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case setCurrentProject: {
      return {
        ...state,
        ...action.payload.entities,
        projectId: payload.result,
      };
    }

    case retrieveUserProjectsSuccess: {
      return {
        ...state,
        ...action.payload.entities,
        result: action.payload.result,
        meta: action.payload.meta,
      };
    }

    case setActiveProject: {
      const activeProject = state.data[payload];

      if (activeProject) {
        state.activeProject = activeProject;
      } else {
        state.activeProject = null;
      }
      return state;
    }

    case createProject: {
      state.fetching = true;
      return state;
    }

    case createProjectSuccess: {
      state.fetching = false;
      state.data[payload._id] = payload;
      state.activeProject = payload;
      return state;
    }

    case createProjectFailure: {
      state.fetching = false;
      return state;
    }

    case updateProject: {
      state.fetching = true;
      return state;
    }

    case updateProjectSuccess: {
      state.fetching = false;

      return {
        ...state,
        ...action.payload.entities,
      };
    }

    case updateProjectFailure: {
      state.fetching = false;
      return state;
    }

    case deleteProject: {
      state.fetching = true;
      return state;
    }

    case deleteProjectSuccess: {
      state.fetching = false;
      delete state.projects[payload];

      return {
        ...state,
        result: state.result.filter((item) => item !== payload),
      };
    }

    case deleteProjectFailure: {
      state.fetching = false;
      return state;
    }

    case addProjectGroupSuccess: {
      state.fetching = false;
      const { group, projectId } = payload;

      if (state.groups) {
        state.groups[group._id] = group;
      } else {
        state.groups = { [group._id]: group };
      }

      state.project[projectId].groups = Object.keys(state.groups);
      return state;
    }

    case updateProjectGroupSuccess: {
      state.fetching = false;
      const { group, groupId } = payload;
      state.groups[groupId] = group[groupId];

      return state;
    }

    case deleteProjectGroupSuccess: {
      const { projectId, groupId } = payload;
      state.fetching = false;
      delete state.groups[groupId];

      if (state.project) {
        state.project[projectId].groups = Object.keys(state.groups);
      }
      return state;
    }

    default:
      return state;
  }
}
