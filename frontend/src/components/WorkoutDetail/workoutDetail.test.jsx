import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WorkoutDetail from './WorkoutDetail';
import { requestWorkoutDetail } from '../../redux/actions/workout-actions';

jest.mock('../../redux/actions/workout-actions');

const buildStore = configureStore([thunk]);

describe('WourkoutDetail', () => {
  let initialState;

  beforeEach(() => {
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render h3', () => {
    initialState = { workoutReducer: { workout: { name: 'abc', description: 'abc', price: 1 } } };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    render(<WorkoutDetail />, { wrapper: Wrapper });
    expect(document.querySelector('h3').textContent).toBe('abc');
  });

  test('should requestWorkoutDetail', () => {
    initialState = { workoutReducer: {} };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    render(<WorkoutDetail />, { wrapper: Wrapper });
    expect(requestWorkoutDetail).toHaveBeenCalled();
  });
});
