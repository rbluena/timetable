export const [
  setCurrentProject,
  setActiveProject,
  retrieveUserProjectsSuccess,
  createProject,
  createProjectSuccess,
  createProjectFailure,
  updateProject,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFailure,
  addProjectGroup,
  addProjectGroupSuccess,
  addProjectGroupFailure,
  updateProjectGroup,
  updateProjectGroupSuccess,
  updateProjectGroupFailure,
  deleteProjectGroup,
  deleteProjectGroupSuccess,
] = [
  'PROJECTS/CURRENT_PROJECT',
  'PROJECTS/ACTIVE_PROJECT',
  'PROJECTS/RETRIEVE_USER_PROJECTS_SUCCESS',
  'PROJECTS/CREATE_PROJECT',
  'PROJECTS/CREATE_PROJECT_SUCCESS',
  'PROJECTS/CREATE_PROJECT_FAILURE',
  'PROJECTS/UPDATE_PROJECT',
  'PROJECTS/UPDATE_PROJECT_SUCCESS',
  'PROJECTS/UPDATE_PROJECT_FAILURE',
  'PROJECTS/DELETE_PROJECT',
  'PROJECTS/DELETE_PROJECT_SUCCESS',
  'PROJECTS/DELETE_PROJECT_FAILURE',
  'PROJECTS/ADD_PROJECT_GROUP',
  'PROJECTS/ADD_PROJECT_GROUP_SUCCESS',
  'PROJECTS/ADD_PROJECT_GROUP_FAILURE',
  'PROJECTS/UPDATE_PROJECT_GROUP',
  'PROJECTS/UPDATE_PROJECT_GROUP_SUCCESS',
  'PROJECTS/UPDATE_PROJECT_GROUP_FAILURE',
  'PROJECTS/DELETE_PROJECT_GROUP',
  'PROJECTS/DELETE_PROJECT_GROUP_SUCCESS',
];

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
      // state.data[payload._id] = payload;

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
      delete state.data[payload.id];
      return state;
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
      const { entities } = payload;
      const { group, members } = entities;

      return {
        ...state,
        groups: {
          ...state.groups,
          ...group,
        },
        members: {
          ...state.members,
          ...members,
        },
      };
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
