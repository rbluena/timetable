import { decode } from 'jsonwebtoken';

import {
  createProjectService,
  updateProjectService,
  deleteProjectService,
  addProjectGroupService,
  updateProjectGroupService,
  deleteProjectGroupService,
  addUserToGroupService,
  removeUserFromGroupService,
} from '@app/services';

import { setNotificationAction, signUserOutAction } from '@app/actions';

import {
  createProject,
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
  deleteProjectGroupSuccess,
} from '@app/reducers/projectsReducer';

import { getNormalizedProject, getNormalizedGroup } from './schema';

export function createProjectAction(projectData) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: createProject });

      const { token } = getState().AUTH;
      const user = decode(token);

      const { data } = await createProjectService(token, {
        owner: user._id,
        ...projectData,
      });

      window.location.href = `/projects/${data._id}`;
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        // Sign user out if not authenticated
        dispatch(signUserOutAction());
      }
      dispatch({
        type: createProjectFailure,
      });
    }
  };
}

export function updateProjectAction(id, projectData) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: updateProject });

      const { token } = getState().AUTH;
      // const user = decode(token);

      const { data, message } = await updateProjectService(
        id,
        projectData,
        token
      );

      const normalizedProject = getNormalizedProject(data);

      dispatch({
        type: updateProjectSuccess,
        payload: normalizedProject,
      });

      dispatch(setNotificationAction({ type: 'success', message }));
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        dispatch(signUserOutAction());
      }
      dispatch({
        type: updateProjectFailure,
      });
    }
  };
}

/**
 * Action creator to delete project.
 * @param {String} id ID of the project to be deleted.
 */
export function deleteProjectAction(id) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: deleteProject });
      const { token } = getState().AUTH;

      const { data } = await deleteProjectService(id, token);

      dispatch({
        type: deleteProjectSuccess,
        payload: data._id,
      });
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        dispatch(signUserOutAction());
      }
      dispatch({
        type: deleteProjectFailure,
      });
    }
  };
}

export function addProjectGroupAction(projectId, groupData) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: addProjectGroup });
      const { token } = getState().AUTH;

      const { data } = await addProjectGroupService(
        projectId,
        groupData,
        token
      );

      dispatch({
        type: addProjectGroupSuccess,
        payload: { group: data, projectId },
      });
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        dispatch(signUserOutAction());
      }
      dispatch({ type: addProjectGroupFailure });
    }
  };
}

export function updateProjectGroupAction(projectId, groupId, groupData) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: updateProjectGroup });
      const { token } = getState().AUTH;

      const { data } = await updateProjectGroupService(
        projectId,
        groupId,
        groupData,
        token
      );

      const normalzedData = getNormalizedGroup(data);

      dispatch({
        type: updateProjectGroupSuccess,
        payload: normalzedData,
      });
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        dispatch(signUserOutAction());
      }
      dispatch({ type: updateProjectGroupFailure });
    }
  };
}

export function deleteProjectGroupAction(projectId, groupId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: addProjectGroup });
      const { token } = getState().AUTH;

      const { data, message } = await deleteProjectGroupService(
        projectId,
        groupId,
        token
      );

      dispatch({
        type: deleteProjectGroupSuccess,
        payload: { projectId, groupId: data._id },
      });

      dispatch(setNotificationAction({ type: 'success', message }));
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        dispatch(signUserOutAction());
      }
      dispatch({ type: addProjectGroupFailure });
    }
  };
}

export function inviteUserAction(projectId, groupId, userData) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: addProjectGroup });
      const { token } = getState().AUTH;
      const { data } = await addUserToGroupService(
        projectId,
        groupId,
        userData,
        token
      );

      const normalizedData = getNormalizedGroup(data);

      dispatch({
        type: updateProjectGroupSuccess,
        payload: normalizedData,
      });
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        dispatch(signUserOutAction());
      }
    }
  };
}

export function removeUserFromGroupAction(projectId, groupId, id, type) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: addProjectGroup });
      const { token } = getState().AUTH;
      const { data } = await removeUserFromGroupService(
        projectId,
        groupId,
        id,
        token,
        { type }
      );

      const normalizedData = getNormalizedGroup(data);

      dispatch({ type: updateProjectGroupSuccess, payload: normalizedData });
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };

      dispatch(setNotificationAction(err));

      if (error.status === 403) {
        dispatch(signUserOutAction());
      }
    }
  };
}
