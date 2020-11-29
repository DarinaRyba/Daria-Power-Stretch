import actionTypes from './actionTypes';


export function requestWorkoutsSuccess(workouts) {
  return {
    type: actionTypes.LOAD_WORKOUTS,
    workouts,
  };
}

export function requestWorkoutsError(workoutsError) {
  return {
    type: actionTypes.LOAD_WORKOUTS_ERROR,
   workoutsError,
  };
}

export function requestProjects() {
  return async (dispatch) => {
    try {
      const workouts = 'frontend/public/api/workouts.json';
      dispatch(requestWorkoutsSuccess(workouts.data));
    } catch (error) {
      dispatch(requestWorkoutsError(error));
    }
  };
}


function requestWorkoutDetailSuccess(workout) {
  return {
    type: actionTypes.LOAD_WORKOUTS,
    workout,
  };
}

function requestWorkoutDetailError(workoutError) {
  return {
    type: actionTypes.LOAD_WORKOUT_ERROR,
    workoutError,
  };
}

export function requestWorkoutDetail() {
  return async (dispatch) => {
    try {
      const workout = 
      dispatch(requestWorkoutDetailSuccess(workout.data));
    } catch (error) {
      dispatch(requestWorkoutDetailError(error));
    }
  };
}
