import { Workouts, LoadWorkoutsAction, LoadWorkoutsErrorAction, actionTypes } from './actionTypes';
import axios from 'axios';

const serverWorkoutsUrl = 'http://localhost:2050/workouts';

export function requestWorkoutsSuccess (workouts: Workouts[]): LoadWorkoutsAction {
  return {
    type: actionTypes.LOAD_WORKOUTS,
    workouts
  };
}

export function requestWorkoutsError (workoutsError: string): LoadWorkoutsErrorAction {
  return {
    type: actionTypes.LOAD_WORKOUTS_ERROR,
    workoutsError
  };
}

export function requestWorkouts () {
  return async (dispatch: any) => {
    try {
      const workouts = await axios.get(serverWorkoutsUrl);
      dispatch(requestWorkoutsSuccess(workouts.data));
    } catch (error) {
      dispatch(requestWorkoutsError(error));
    }
  };
}

export function requestWorkoutDetailSuccess (workout: any) {
  return {
    type: actionTypes.LOAD_WORKOUT,
    workout
  };
}

export function requestWorkoutDetailError (workoutError: any) {
  return {
    type: actionTypes.LOAD_WORKOUT_ERROR,
    workoutError
  };
}

export function requestWorkoutDetail (_id) {
  return async (dispatch) => {
    try {
      const workout = await axios.get(`${serverWorkoutsUrl}/${_id}`);
      dispatch(requestWorkoutDetailSuccess(workout.data));
    } catch (error) {
      dispatch(requestWorkoutDetailError(error));
    }
  };
}
