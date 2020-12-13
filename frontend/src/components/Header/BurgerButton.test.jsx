import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BurgerButton from './BurgerButton';

jest.mock('../../redux/actions/workout-actions');

const buildStore = configureStore([thunk]);

describe('BurgerButton', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should open menu', () => {
    const initialState = { usersReducer: { user: null }, isLogged: false };
    const store = buildStore(initialState);
    store.dispatch = jest.fn();

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );

    const handleClick = jest.fn();

    render(<BurgerButton />, { wrapper: Wrapper });
    const buttonElement = document.querySelector('.burger-btn');
    const event = { currentTarget: buttonElement };
    fireEvent.click(buttonElement, event);

    expect(handleClick).toHaveBeenCalled();
  });
});
