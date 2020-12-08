/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as firebase from 'firebase';
import * as authActions from './auth-actions';
import './firebase/firebaseIndex';
import actionTypes from './actionTypes';

jest.mock('axios');
jest.mock('./firebase/firebaseIndex');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth-actions', () => {
  let store;
  describe('signInWithGoogle', () => {
    beforeEach(() => {
      store = mockStore();

      jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        signInWithPopup: jest.fn().mockImplementation(() => Promise.resolve({
          user: {
            displayName: 'abc',
            email: 'bca',
            phoneNumber: 'c',
            photoURL: 'd',
          },
        })),
      }));

      firebase.auth.GoogleAuthProvider = jest
        .fn()
        .mockReturnValue({ addScope: jest.fn() });
    });

    afterEach(() => {
      jest.resetAllMocks();
      store = null;
    });

    test('should dispatch the correct action', async () => {
      const user = {
        displayName: 'abc',
        email: 'bca',
        phoneNumber: 'c',
        photoURL: 'd',
      };
      const expectedActions = [
        { type: actionTypes.AUTH_LOGIN, user },
      ];

      await store.dispatch(authActions.signInWithGoogle());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('singOut', () => {
    beforeEach(() => {
      store = mockStore();
      jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        signOut: jest.fn().mockImplementation(() => Promise.resolve()),
      }));
    });

    afterEach(() => {
      jest.resetAllMocks();
      store = null;
    });

    test('should dispatch the correct action', async () => {
      const expectedActions = [
        { type: actionTypes.AUTH_SIGNOUT },
      ];

      await store.dispatch(authActions.signOut());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('error cases', () => {
    beforeEach(() => {
      store = mockStore();
      jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        signInWithPopup: jest.fn().mockImplementation(() => Promise.reject('error')),
        signOut: jest.fn().mockImplementation(() => Promise.reject('error')),
      }));
      firebase.auth.GoogleAuthProvider = jest
        .fn()
        .mockReturnValue({ addScope: jest.fn() });
    });

    afterEach(() => {
      jest.resetAllMocks();
      store = null;
    });

    test('should dispatch the correct action', async () => {
      const errorUser = 'error';
      const expectedActions = [{ type: actionTypes.AUTH_LOGIN_ERROR, errorUser }];

      await store.dispatch(authActions.signInWithGoogle());

      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should dispatch the correct action', async () => {
      const errorUser = 'error';
      const expectedActions = [{ type: actionTypes.AUTH_SIGNOUT_ERROR, errorUser }];

      await store.dispatch(authActions.signOut());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('addUser', () => {
    let fakeUser;
    let fakeError;

    beforeEach(() => {
      store = mockStore();
      fakeUser = { data: {} };
      fakeError = 'error';
    });

    afterEach(() => {
      jest.resetAllMocks();
      store = null;
    });

    test('should dispatch the correct action', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeUser);
      const expectedActions = [
        { type: actionTypes.LOAD_USER, user: fakeUser.data },
      ];

      await store.dispatch(authActions.addUser({}));

      expect(store.getActions()).toEqual(expectedActions);
    });

    test('should dispatch the correct action', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError);
      const expectedActions = [
        { type: actionTypes.LOAD_USER_ERROR, userError: fakeError },
      ];

      await store.dispatch(authActions.addUser({}));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
