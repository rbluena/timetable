import Router from 'next/router';
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

      const payload = {
        ...projectData,
        _id: '4569884tyy45',
        settings: { categories: { name: 'Categories' } },
        categories: [],
        roles: [
          {
            _id: '88497jd9s8904',
            projectId: '4569884tyy45',
            name: 'Organizers',
            actions: [],
          },
        ],
      };

      dispatch({
        type: createProjectSuccess,
        payload,
      });

      return Router.push(`/projects/4569884tyy45`);
    } catch (error) {
      dispatch({
        type: createProjectFailure,
      });
    }
  };
}

export function updateProjectAction(id, projectData) {
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
        payload: projectData,
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
