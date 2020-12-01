import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as workoutActions from './workout-actions';
import actionTypes from './actionTypes';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('workout-actions', () => {
  let fakeData;
  let fakeError;
  let store;
  beforeEach(() => {
    store = mockStore();
    fakeData = { data: 'workouts' };
    fakeError = 'error';
  });

  afterEach(() => {
    jest.resetAllMocks();
    store = null;
  });

  test('in requestWorkouts should disptach the correct action: action.type LOAD_WORKOUTS', async () => {
    axios.get = jest.fn().mockResolvedValueOnce(fakeData);

    await store.dispatch(workoutActions.requestWorkouts());

    expect(store.getActions()[0].type).toBe(actionTypes.LOAD_WORKOUTS);
  });

  test('in workoutProjects when an error should disptach the correct action: action.type LOAD_PROJECTS_ERROR ', async () => {
    axios.get = jest.fn().mockRejectedValueOnce(fakeError);

    await store.dispatch(workoutActions.requestWorkouts());

    expect(store.getActions()[0].type).toBe(actionTypes.LOAD_WORKOUTS_ERROR);
  });

  test('in requestWorkoutDetail should disptach the correct action: action.type LOAD_WORKOUT', async () => {
    axios.get = jest.fn().mockResolvedValueOnce(fakeData);

    await store.dispatch(workoutActions.requestWorkoutDetail());

    expect(store.getActions()[0].type).toBe(actionTypes.LOAD_WORKOUT);
  });

  test('in requestWorkoutDetail when an error should disptach the correct action: action.type LOAD_PROJECT_ERROR ', async () => {
    axios.get = jest.fn().mockRejectedValueOnce(fakeError);

    await store.dispatch(workoutActions.requestWorkoutDetail());

    expect(store.getActions()[0].type).toBe(actionTypes.LOAD_WORKOUT_ERROR);
  });
});
