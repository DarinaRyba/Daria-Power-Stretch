import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import WorkoutDetail from './WorkoutDetail';
import { requestWorkoutDetail } from '../../redux/actions/workout-actions';
import { createUserBooking } from '../../redux/actions/user-actions';

jest.mock('../../redux/actions/workout-actions');
jest.mock('../../redux/actions/user-actions');

const buildStore = configureStore([thunk]);

describe('WourkoutDetail', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render workout name and description', () => {
    const initialState = {
      workoutReducer: {
        workout: {
          name: 'a_name',
          description: 'a_description',
          price: 1,
          image: 'an_image',
          duration: 'duration',
          place: 'place',
          scheduleInfo: 'schedule',
          _id: '1',
        },
      },
      usersReducer: { user: 'a_user' },
      isLogged: true,
    };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    render(<WorkoutDetail match={{ params: { workoutId: '' } }} />, { wrapper: Wrapper });

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

    render(<WorkoutDetail match={{ params: { workoutId: '' } }} />, { wrapper: Wrapper });

    expect(requestWorkoutDetail).toHaveBeenCalled();
  });

  test('should make the request to get the workout detail when click book in the model', () => {
    const initialState = {
      workoutReducer: {
        workout: {
          name: 'a_name',
          description: 'a_description',
          price: 1,
          image: 'an_image',
          duration: 'duration',
          place: 'place',
          scheduleInfo: 'schedule',
          _id: '1',
        },
      },
      usersReducer: { user: 'a_user' },
      isLogged: true,
    };

    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    render(<WorkoutDetail match={{ params: { workoutId: '' } }} />, { wrapper: Wrapper });
    const buttonElementOpenModal = document.querySelector('#btn-book');
    fireEvent.click(buttonElementOpenModal, 'handleShow');
    const buttonElement = document.querySelector('#modal__btn-book');
    fireEvent.click(buttonElement);

    expect(createUserBooking).toHaveBeenCalled();
  });

  test('should render if there is no user', () => {
    const initialState = {
      workoutReducer: {
        workout: {
          name: 'a_name',
          description: 'a_description',
          price: 1,
          image: 'an_image',
          duration: 'duration',
          place: 'place',
          scheduleInfo: 'schedule',
          _id: '1',
        },
      },
      usersReducer: { user: null },
      isLogged: false,
    };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    render(<WorkoutDetail match={{ params: { workoutId: '' } }} />, { wrapper: Wrapper });

    expect(document.querySelector('.btn-notLogged').textContent).toBe('Login to book');
  });
});
