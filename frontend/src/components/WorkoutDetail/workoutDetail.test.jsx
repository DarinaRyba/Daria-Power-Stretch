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
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render workout name and description', () => {
    const initialState = { workoutReducer: { workout: { name: 'a_name', description: 'a_description', price: 1 } } };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    render(<WorkoutDetail match={{ params: {} }} />, { wrapper: Wrapper });

    expect(document.querySelector('h4').textContent).toBe('a_name');
  });

  test('should make the request to get the workout detail', () => {
    const initialState = { workoutReducer: {} };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    );

    render(<WorkoutDetail match={{ params: {} }} />, { wrapper: Wrapper });

    expect(requestWorkoutDetail).toHaveBeenCalled();
  });
});
