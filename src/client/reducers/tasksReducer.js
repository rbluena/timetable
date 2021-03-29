export const setOpenedTask = 'TASK/OPEN_TASK';
export const setNewTask = 'TASK/SET_NEW';
export const closeTask = 'TASK/CLOSE_TASK';
export const setEditingTask =   'TASK/SET_EDITING';
export const cancelEditingTask = 'TASK/CANCEL_EDITING';
export const getTask = 'TASK/GET_TASK';
export const getTaskSuccess = 'TASK/GET_TASK_SUCCESS';
export const getTaskFailure ='TASK/GET_TASK_FAILURE';
export const getTasks = 'TASK/GET_TASKS';
export const getTasksSuccess = 'TASK/GET_TASKS_SUCCESS';
export const getTasksFailure = 'TASK/GET_TASKS_FAILURE';
export const getProjectBacklog = 'TASK/GET_PROJECT_BACKLOG';
export const getProjectBacklogSuccess = 'TASK/GET_PROJECT_BACKLOG_SUCCESS';
export const createTask = 'TASK/CREATE_TASK';
export const createTaskSuccess = 'TASK/CREATE_TASK_SUCCESS';
export const createTaskFailure = 'TASK/CREATE_TASK_FAILURE';
export const updateTask = 'TASK/UPDATE_TASK';
export const updateTaskSuccess = 'TASK/UPDATE_TASK_SUCCESS';
export const updateTaskFailure = 'TASK/UPDATE_TASK_FAILURE';
export const deleteTask = 'TASK/DELETE_TASK';
export const deleteTaskSuccess = 'TASK/DELETE_TASK_SUCCESS';
export const deleteTaskFailure = 'TASK/DELETE_TASK_FAILURE';



















const initialState = {
  fetching: false,
  openedTask: null,
  editingTask: null,
};

export default function taskReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case setOpenedTask: {
      const openingData = state.data[payload];

      if (openingData) {
        state.openedTask = openingData;
      } else {
        state.openedTask = null;
      }
      return state;
    }

    case setEditingTask: {
      state.editingTask = payload;
      return state;
    }

    case setNewTask: {
      state.editingTask = payload;
      state.data[payload._id] = payload;
      return state;
    }

    case cancelEditingTask: {
      state.editingTask = null;
      delete state.data[payload];
      return state;
    }

    case getProjectBacklogSuccess: {
      const { backlogData, backlogMeta } = payload;

      return {
        ...state,
        ...backlogData.entities,
        backlogIds: backlogData.result,
        backlogMeta
      };
    }

    case createTask: {
      state.fetching = true;
      return state;
    }

    case createTaskSuccess: {
      state.editingTask =  null
      state.fetching =  false

      return {
        ...state,
        backlog: {
          ...state.backlog,
          [payload._id]: payload
        },
        backlogIds: [...state.backlogIds]
      }
    }

    case createTaskFailure: {
      state.fetching = false;
      return state;
    }

    case updateTask: {
      state.fetching = true;
      return state;
    }

    case updateTaskSuccess: {
      state.fetching = false;
      state.data[payload._id] = payload;
      return state;
    }

    case updateTaskFailure: {
      state.fetching = false;
      return state;
    }

    case deleteTask: {
      state.fetching = true;
      return state;
    }

    case deleteTaskSuccess: {
      state.fetching = false;
      delete state.data[payload.id];
      return state;
    }

    case deleteTaskFailure: {
      state.fetching = false;
      return state;
    }

    default:
      return state;
  }
}
