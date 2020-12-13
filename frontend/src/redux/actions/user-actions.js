import './firebase/firebaseIndex';
import axios from 'axios';
import firebase from 'firebase';
import actionTypes from './actionTypes';

const serverUsersUrl = 'http://localhost:2050/users';

export function addUserSuccess(user) {
  return {
    type: actionTypes.ADD_USER,
    user,
  };
}

export function addUserError(userError) {
  return {
    type: actionTypes.ADD_USER_ERROR,
    userError,
  };
}

export function addUser(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(serverUsersUrl, userData);
      localStorage.user = JSON.stringify({ ...data });
      dispatch(addUserSuccess(data));
    } catch (error) {
      dispatch(addUserError(error));
    }
  };
}

export function loadUserSuccess(user) {
  return {
    type: actionTypes.LOAD_USER,
    user,
  };
}

export function handleSignInSuccess(user) {
  return {
    type: actionTypes.AUTH_LOGIN,
    user,
  };
}

export function handleSignOutSuccess() {
  return {
    type: actionTypes.AUTH_SIGNOUT,
  };
}

export function handleSignInError(errorUser) {
  return {
    type: actionTypes.AUTH_LOGIN_ERROR,
    errorUser,
  };
}

export function handleSignOutError(errorUser) {
  return {
    type: actionTypes.AUTH_SIGNOUT_ERROR,
    errorUser,
  };
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  return async (dispatch) => {
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const { user } = result;
      dispatch(handleSignInSuccess(user));
      dispatch(addUser({
        displayName: result.additionalUserInfo.profile.name,
        uid: result.additionalUserInfo.profile.id,
        photoURL: result.additionalUserInfo.profile.picture,
        email: result.additionalUserInfo.profile.email,

      }));
    } catch (error) {
      dispatch(handleSignInError(error));
    }
  };
}

export function signOut() {
  return async (dispatch) => {
    try {
      localStorage.removeItem('user');
      await firebase.auth().signOut();
      dispatch(handleSignOutSuccess());
    } catch (error) {
      dispatch(handleSignOutError(error));
    }
  };
}

export function saveUserFromLocalStorageSucces(user) {
  return {
    type: actionTypes.SAVE_USER,
    user,
  };
}

export function saveUserFromLocalStorageError(errorUser) {
  return {
    type: actionTypes.SAVE_USER_ERROR,
    errorUser,
  };
}

export function saveUserFromLocalStorage(user) {
  return async (dispatch) => {
    try {
      dispatch(saveUserFromLocalStorageSucces(user));
    } catch (error) {
      dispatch(saveUserFromLocalStorageError);
    }
  };
}

export function createUserBookingSuccess(user) {
  return {
    type: actionTypes.CREATE_BOOKING,
    user,
  };
}

export function createUserBookingError(userError) {
  return {
    type: actionTypes.CREATE_BOOKING_ERROR,
    userError,
  };
}

export function createUserBooking(user, day) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(serverUsersUrl, { user, day });
      dispatch(createUserBookingSuccess(data));
    } catch (error) {
      dispatch(createUserBookingError(error));
    }
  };
}
