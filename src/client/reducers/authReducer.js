export const [
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  signOutUser,
  signOutUserSuccess,
  signOutUserFailure,
] = [
  'AUTH/REGISTER',
  'AUTH/REGISTER_SUCCESS',
  'AUTH/REGISTER_FAILURE',
  'AUTH/LOGIN',
  'AUTH/LOGIN_SUCCESS',
  'AUTH/LOGIN_FAILURE',
  'AUTH/UPDATE',
  'AUTH/UPDATE_SUCCESS',
  'AUTH/UPDATE_FAILURE',
  'AUTH/LOGOUT',
  'AUTH/LOGOUT_SUCCESS',
  'AUTH/LOGOUT_FAILURE',
];

const initialState = {
  fetching: false,
  token: null,
  type: null, // 'google-oauth' or 'local'
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case registerUser:
      state.fetching = true;
      return state;

    case registerUserSuccess:
      state.fetching = false;
      return state;

    case registerUserFailure:
      state.fetching = false;
      return state;

    case signInUser:
      state.fetching = true;
      return state;

    case signInUserSuccess:
      state.fetching = false;
      state.token = action.payload;
      return state;

    case signInUserFailure:
      state.fetching = false;
      return state;

    case signOutUser:
      state.fetching = true;
      return state;

    case signOutUserSuccess:
      state.fetching = false;
      state.token = null;
      return state;

    case signOutUserFailure:
      state.fetching = false;
      return state;

    default:
      return state;
  }
}
