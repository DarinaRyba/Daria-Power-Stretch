import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserProfile from './UserProfile';

const buildStore = configureStore([thunk]);

describe('UserProfile', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render', () => {
    const initialState = { userReducer: { } };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    render(<UserProfile />, { wrapper: Wrapper });
    const expectedText = document.querySelector('.booking-title-text');

    expect(expectedText).toBeInTheDocument('Booked classes');
  });
});
