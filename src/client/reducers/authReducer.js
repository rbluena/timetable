export const [
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailure,
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
      state.token = action.payload;
      return state;

    case registerUserFailure:
      state.fetching = false;
      return state;

    case loginUser:
      state.fetching = true;
      return state;

    case loginUserSuccess:
      state.fetching = false;
      state.token = action.payload;
      return state;

    case loginUserFailure:
      state.fetching = false;
      return state;

    case logoutUser:
      state.fetching = true;
      return state;

    case logoutUserSuccess:
      state.fetching = false;
      state.token = null;
      return state;

    case logoutUserFailure:
      state.fetching = false;
      return state;

    default:
      return state;
  }
}
