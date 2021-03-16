import { decode } from 'jsonwebtoken';
import Router from 'next/router';

import {
  createProjectService,
  updateProjectService,
  addProjectGroupService,
  updateProjectGroupService,
  deleteProjectGroupService,
} from '@app/services';

import { setNotificationAction, signUserOutAction } from '@app/actions';

import {
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
} from '@app/reducers/projectsReducer';

import { getNormalizedProject } from './schema';

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

      dispatch({
        type: createProjectSuccess,
        payload: data,
      });

      Router.push(`/projects/${data._id}`);
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
      const user = decode(token);

      const { data, message } = await updateProjectService(
        id,
        { ...projectData, owner: user ? user._id : null },
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

export function deleteProjectAction(id) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: deleteProject });
      const { token } = getState().AUTH;

      await updateProjectService(token, id);

      dispatch({
        type: deleteProjectSuccess,
      });
    } catch (error) {
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

      const { message, data } = addProjectGroupService(
        projectId,
        groupData,
        token
      );

      // dispatch({ type: addProjectGroupSuccess });
    } catch (error) {
      dispatch({ type: addProjectGroupFailure });
    }
  };
}

export function updateProjectGroupAction(projectId, groupId, groupData) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: updateProjectGroup });
      const { token } = getState().AUTH;

      const { message, data } = updateProjectGroupService(
        projectId,
        groupId,
        groupData,
        token
      );

      dispatch({ type: updateProjectGroupSuccess, payload: data });
    } catch (error) {
      dispatch({ type: updateProjectGroupFailure });
    }
  };
}

export function deleteProjectGroupAction(projectId, groupId) {
  return async (dispatch) => {
    try {
      dispatch({ type: addProjectGroup });
      const { token } = getState().AUTH;

      const { data, message } = deleteProjectGroupService(
        projectId,
        groupId,
        token
      );
      dispatch({ type: addProjectGroupSuccess });
    } catch (error) {
      dispatch({ type: addProjectGroupFailure });
    }
  };
}
