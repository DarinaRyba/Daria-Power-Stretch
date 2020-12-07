import usersReducer from './usersReducer';
import actionTypes from '../actions/actionTypes';

describe('reducers', () => {
  let initialState;
  beforeEach(() => {
    initialState = {};
  });

  afterEach(() => {
    initialState = null;
  });

  describe('usersReducer', () => {
    test('should return the initial state without action', () => {
      const result = usersReducer(undefined, {});
      expect(result).toEqual({});
    });

    test('should add the user to the state', () => {
      const loadAuthLoginAction = {
        type: actionTypes.AUTH_LOGIN,
        user: 'user',
      };

      const result = usersReducer(initialState, loadAuthLoginAction);
      expect(result).toEqual({ user: 'user', isLogged: true });
    });

    test('should add the errorUser to the state', () => {
      const loadAuthLoginErrorAction = {
        type: actionTypes.AUTH_LOGIN_ERROR,
        userError: 'error',
      };

      const result = usersReducer(initialState, loadAuthLoginErrorAction);
      expect(result).toEqual({ errorUser: 'error' });
    });

    test('should add the user null and isLogged to false', () => {
      const loadAuthSignOutAction = {
        type: actionTypes.AUTH_SIGNOUT,

      };

      const result = usersReducer(initialState, loadAuthSignOutAction);
      expect(result).toEqual({ user: null, isLogged: false });
    });

    test('should add the errorUser to the state', () => {
      const loadAuthSigOutErrorAction = {
        type: actionTypes.AUTH_SIGNOUT_ERROR,
        userError: 'error',
      };

      const result = usersReducer(initialState, loadAuthSigOutErrorAction);
      expect(result).toEqual({ errorUser: 'error' });
    });
  });
});
