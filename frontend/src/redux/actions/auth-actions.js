import './firebase/firebaseIndex';
import firebase from 'firebase';
import actionTypes from './actionTypes';

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
    } catch (error) {
      dispatch(handleSignInError(error));
    }
  };
}

export function signInWithEmail(email, password) {
  return async (dispatch) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(handleSignInSuccess(user));
    } catch (error) {
      handleSignInError(error);
    }
  };
}

export function signOut() {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(handleSignOutSuccess());
    } catch (error) {
      handleSignOutError(error);
    }
  };
}
