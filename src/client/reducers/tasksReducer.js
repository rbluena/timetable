export const [
  setEditingTask,
  createTask,
  createTaskSuccess,
  createTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
] = [
  'TASK/SET_EDITING',
  'TASK/CREATE_TASK',
  'TASK/CREATE_TASK_SUCCESS',
  'TASK/CREATE_TASK_FAILURE',
  'TASK/UPDATE_TASK',
  'TASK/UPDATE_TASK_SUCCESS',
  'TASK/UPDATE_TASK_FAILURE',
  'TASK/DELETE_TASK',
  'TASK/DELETE_TASK_SUCCESS',
  'TASK/DELETE_TASK_FAILURE',
];

const initialState = {
  fetching: true,
  editingTask: null,
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case setEditingTask: {
      state.editingTask = action.payload;
      return state;
    }

    case createTask: {
      state.fetching = true;
      return state;
    }

    case createTaskSuccess: {
      state.fetching = false;
      state.data = action.payload;
      return state;
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
      state.data[action.payload._id] = action.payload;
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
      delete state.data[action.payload.id];
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
