import { setCookieToken, deleteCookieToken } from '@app/utils/session';

import {
  registerUserService,
  signInUserService,
  signUserOutService,
  updateUserService,
  requestVerificationTokenService,
} from '@app/services';

import { setNotificationAction } from '@app/actions';

import {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  signOutUserSuccess,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
} from '@app/reducers/authReducer';

/**
 * Signing user out.
 */
export function signUserOutAction() {
  return async (dispatch) => {
    try {
      await signUserOutService();
      dispatch(signOutUserSuccess());
      await deleteCookieToken();
      window.location.href = '/';
    } catch (err) {
      await deleteCookieToken();
      dispatch(signOutUserSuccess());
      window.location.href = '/';
    }
  };
}

/**
 * Signing user out.
 * @param {Object} userData
 */
export function signUpUserAction(userData) {
  return async (dispatch) => {
    try {
      dispatch({ type: registerUser });
      const { data, message } = await registerUserService(userData);
      dispatch({ type: registerUserSuccess, payload: data });
      dispatch(setNotificationAction({ type: 'success', message }));
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };
      dispatch(registerUserFailure());
      throw err;
    }
  };
}

/**
 * Signing in user.
 * @param {Object} userData
 */
export function signInUserAction(userData) {
  return async (dispatch) => {
    try {
      dispatch({ type: signInUser });
      const { data: token } = await signInUserService(userData);
      dispatch({ type: signInUserSuccess, payload: token });
      window.location.href = `${window.location.origin}/projects`;
    } catch (error) {
      const err = {
        type: 'error',
        message: error.errors || error.message,
      };
      dispatch(signInUserFailure());
      throw err;
    }
  };
}

/**
 * Requesting new email verification token.
 * @param {String} data
 */
export function requestVerificationTokenAction(data) {
  return async (dispatch) => {
    try {
      const { message } = await requestVerificationTokenService(data);
      dispatch(setNotificationAction({ type: 'success', message }));
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotificationAction(error));
    }
  };
}

/**
 * Updating user's data.
 * @param {Object} userData
 */
export function updateUserAction(userData) {
  return async (dispatch, getState) => {
    try {
      dispatch(updateUser());
      const {
        auth: { token },
      } = getState();

      if (!userData.password || !userData.password.length) {
        delete userData.password;
        delete userData.oldPassword;
      }

      const { message, data } = await updateUserService(token, userData);

      await setCookieToken(data);
      dispatch(updateUserSuccess(data));
      dispatch(setNotificationAction({ type: 'success', message }));
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(updateUserFailure());
      dispatch(setNotificationAction(error));
    }
  };
}
