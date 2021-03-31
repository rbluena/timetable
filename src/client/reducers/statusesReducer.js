export const setProjectStatuses = 'STATUSES/GET_STATUSES';
export const getProjectStatusesSuccess = 'STATUSES/GET_STATUSES_SUCCESS';
export const createProjectStatus = 'STATUSES/CREATE_STATUS';
export const createProjectStatusSuccess = 'STATUSES/CREATE_STATUS_SUCCESS';
export const updateStatusItemSuccess = 'STATUSES/UPDATE_STATUS_SUCCESS';
export const deleteStatusItemSuccess = 'STATUSES/DELETE_STATUS_SUCCESS';
export const assignTaskStatusSuccess = 'STATUSES/ASSIGN_STATUS_SUCCESS';
export const unassignTaskStatusSuccess = 'STATUSES/UNASSIGN_STATUS_SUCCESS';

const initialState = {
  fetching: true,
};

export default function statusesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case setProjectStatuses: {
      return {
        ...state,
        ...action.payload.entities,
        statusIds: action.payload.result,
      };
    }

    case createProjectStatusSuccess: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [payload._id]: payload,
        },
        statusIds: [...state.statusIds, payload._id],
      };
    }

    case updateStatusItemSuccess: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [payload._id]: payload,
        },
      };
    }

    case deleteStatusItemSuccess: {
      delete state.statuses[payload._id];

      return {
        ...state,
        statusIds: state.statusIds.filter((item) => item !== payload._id),
      };
    }

    case assignTaskStatusSuccess: {
      const { taskId, statusId, index } = payload;
      const { tasks } = state.statuses[statusId];
      tasks.splice(index, 0, taskId);

      state.statuses[statusId].tasks = tasks;

      return state;
    }

    case unassignTaskStatusSuccess: {
      const { taskId, statusId } = payload;
      const { tasks } = state.statuses[statusId];
      const newTasks = tasks.filter((id) => id !== taskId);

      state.statuses[statusId].tasks = newTasks;

      return state;
    }

    default:
      return state;
  }
}
