export const [
  toggleLoading,
  openModal,
  closeModal,
  openDrawer,
  closeDrawer,
  setUploadingFile,
  setNotification,
  clearNotification,
] = [
  'GLOBAL/TOGGLE_LOADING',
  'GLOBAL/OPEN_MODAL',
  'GLOBAL/CLOSE_MODAL',
  'GLOBAL/OPEN_DRAWER',
  'GLOBAL/CLOSE_DRAWER',
  'GLOBAL/UPLOADING_FILE',
  'GLOBAL/SET_NOTIFICATION',
  'GLOBAL/CLEAR_NOTIFICATION',
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

    case openDrawer: {
      state.drawer = action.payload;
      return state;
    }

    case closeDrawer: {
      state.drawer = null;
      return state;
    }

    case setUploadingFile: {
      state.uploadingFile = action.payload;
      return state;
    }
    case setNotification: {
      state.notification = action.payload;
      return state;
    }

    case clearNotification: {
      state.notification = null;
      return state;
    }

    default:
      return state;
  }
}
