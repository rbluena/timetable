import {
  setEditingTask,
  submitTask,
  // submitTaskSuccess,
  submitTaskFailure,
} from '@app/reducers/tasksReducer';

export function setEditingTaskAction(data) {
  return {
    type: setEditingTask,
    payload: data,
  };
}

export function submitTaskAction(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: submitTask });

      // Service to submit data to the server
    } catch (error) {
      dispatch({ type: submitTaskFailure });
    }
  };
}
