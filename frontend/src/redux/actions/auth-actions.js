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
      const { user } = await firebase.auth().signInWithPopup(provider);
      dispatch(handleSignInSuccess(user));
      dispatch(addUser({
        displayName: user.displayName,
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
      }));
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      dispatch(handleSignInError(error));
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

export function loadUser(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(serverUsersUrl, userData);
      dispatch(loadUserSuccess(data));
    } catch (error) {
      dispatch(loadUserError(error));
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
