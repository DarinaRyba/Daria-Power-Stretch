import axios from 'axios';
import actionTypes from './actionTypes';

const serverUsersUrl = 'http://localhost:2050/users';

export function requestUserSuccess(user) {
  return {
    type: actionTypes.LOAD_USER,
    user,
  };
}

export function requestWorkoutsError(userError) {
  return {
    type: actionTypes.LOAD_USER_ERROR,
    userError,
  };
}

export function requestUser() {
  return async (dispatch) => {
    try {
      const user = await axios.get(serverUsersUrl);
      dispatch(requestUserSuccess(user.data));
    } catch (error) {
      dispatch(requestWorkoutsError(error));
    }
  };
}
