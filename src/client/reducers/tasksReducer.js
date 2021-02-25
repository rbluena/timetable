export const [
  setEditingTask,
  submitTask,
  submitTaskSuccess,
  submitTaskFailure,
] = [
  'TASK/SET_EDITING',
  'TASK/SUBMIT_TASK',
  'TASK/SUBMIT_TASK_SUCCESS',
  'TASK/SUBMIT_TASK_FAILURE',
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

    case submitTask: {
      state.fetching = true;
      return state;
    }

    case submitTaskSuccess: {
      state.fetching = false;
      state.data = action.payload;
      return state;
    }

    case submitTaskFailure: {
      state.fetching = false;
      return state;
    }

    default:
      return state;
  }
}
