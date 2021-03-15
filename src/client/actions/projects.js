import { decode } from 'jsonwebtoken';
import Router from 'next/router';
import { createProjectService, updateProjectService } from '@app/services';

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
} from '@app/reducers/projectsReducer';

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

      const { data, message } = await updateProjectService(
        id,
        projectData,
        token
      );

      dispatch({
        type: updateProjectSuccess,
        payload: data,
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
