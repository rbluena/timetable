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
  return async (dispatch) => {
    try {
      dispatch({ type: createProject });

      // const { token } = getState().AUTH;

      // const { data } = await createProjectService(token, {
      //   ...taskData,
      //   creator: user._id,
      // });

      dispatch({
        type: createProjectSuccess,
        payload: projectData,
      });
    } catch (error) {
      dispatch({
        type: createProjectFailure,
      });
    }
  };
}

export function updateProjectAction(id, data) {
  return async (dispatch) => {
    try {
      dispatch({ type: updateProject });

      // const { token } = getState().AUTH;

      // const { data, message } = await updateProjectService(token, {
      //   ...taskData,
      //   creator: user._id,
      // });

      dispatch({
        type: updateProjectSuccess,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: updateProjectFailure,
      });
    }
  };
}

export function deleteProjectAction(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: deleteProject });
      // const { token } = getState().AUTH;

      // const { data, message } = await updateProjectService(token, id);

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
