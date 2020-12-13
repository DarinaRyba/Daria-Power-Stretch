import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import WorkoutDetail from './WorkoutDetail';
import { requestWorkoutDetail } from '../../redux/actions/workout-actions';

jest.mock('../../redux/actions/workout-actions');
jest.mock('../../redux/actions/user-actions');

const buildStore = configureStore([thunk]);

describe('WourkoutDetail', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render workout name and description', () => {
    const initialState = { workoutReducer: { workout: { name: 'a_name', description: 'a_description', price: 1 } }, usersReducer: { user: null }, isLogged: false };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    render(<WorkoutDetail match={{ params: {} }} />, { wrapper: Wrapper });

    expect(document.querySelector('h4').textContent).toBe('a_name');
  });

  test('should make the request to get the workout detail', () => {
    const initialState = { workoutReducer: {}, usersReducer: { user: 'a_user' }, isLogged: true };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    render(<WorkoutDetail match={{ params: {} }} />, { wrapper: Wrapper });

    expect(requestWorkoutDetail).toHaveBeenCalled();
  });

  xtest('should make the request to get the workout detail when click book in the model', () => {
    const initialState = { workoutReducer: { workout: { name: 'a_name', description: 'a_description', price: 1 } }, usersReducer: { user: 'a_user' }, isLogged: true };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    render(<WorkoutDetail match={{ params: {} }} />, { wrapper: Wrapper });
    const buttonElement = document.querySelector('#modal__btn-book');
    fireEvent.click(buttonElement);

    expect(requestWorkoutDetail).toHaveBeenCalled();
  });
  xtest('should open the modal', () => {
    const initialState = { workoutReducer: { workout: { name: 'a_name', description: 'a_description', price: 1 } }, usersReducer: { user: 'a_user' }, isLogged: true };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
    const handleShow = jest.fn();

    render(<WorkoutDetail match={{ params: {} }} />, { wrapper: Wrapper });

    const buttonElement = document.querySelector('#btn-book');
    fireEvent.click(buttonElement);

    expect(handleShow).toHaveBeenCalled();
  });
});
