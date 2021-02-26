export const [toggleLoading, openModal, closeModal, setUploadingFile] = [
  'GLOBAL/TOGGLE_LOADING',
  'GLOBAL/OPEN_MODAL',
  'GLOBAL/CLOSE_MODAL',
  'GLOBAL/UPLOADING_FILE',
];

const initialState = {
  isLoading: true,
  notification: null, // {type: 'success', message: 'String'} || { type: 'error', message: {}
  modal: null,
  drawer: null,
  uploadingFile: null,
};

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case toggleLoading: {
      state.isLoading = action.payload ? action.payload : !state.isLoading;
      return state;
    }

    case openModal: {
      state.modal = action.payload;
      return state;
    }

    case closeModal: {
      state.modal = null;
      return state;
    }

    case setUploadingFile: {
      state.uploadingFile = action.payload;
      return state;
    }

    default:
      return state;
  }
}