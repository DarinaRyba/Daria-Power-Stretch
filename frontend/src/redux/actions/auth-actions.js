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

export function loadUserError(userError) {
  return {
    type: actionTypes.LOAD_USER_ERROR,
    userError,
  };
}

export function loadUser() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(serverUsersUrl);
      dispatch(loadUserSuccess(data));
    } catch (error) {
      dispatch(loadUserError(error));
    }
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
      dispatch(handleSignInSuccess(result));
      localStorage.user = JSON.stringify(result);
      if (result.additionalUserInfo.isNewUser) {
        dispatch(addUser({
          displayName: result.additionalUserInfo.profile.name,
          uid: result.additionalUserInfo.profile.id,
          photoURL: result.additionalUserInfo.profile.picture,
        }));
      } else {
        dispatch(loadUser());
      }
    } catch (error) {
      dispatch(handleSignInError(error));
    }
  };
}

export function signOut() {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(handleSignOutSuccess());
      localStorage.removeItem('user');
    } catch (error) {
      dispatch(handleSignOutError(error));
    }
  };
}
