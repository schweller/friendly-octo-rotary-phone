import React from 'react';
import { fireEvent, act, waitForElement } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { renderWithRedux } from '../shared/utils/test-utils';
import rootReducer from '../redux/reducers';
import Login from '.';

test('renders Login page', async () => {
  const store = configureStore({ reducer: rootReducer });
  store.dispatch = jest.fn();

  const { getByText, getByLabelText, getByTestId } = renderWithRedux(
    <Login />,
    {
      store,
    }
  );

  const buttonElement = getByText(/Log-in/i);
  expect(buttonElement).toBeInTheDocument();

  await act(async () => {
    await fireEvent.change(getByLabelText('Email address'), {
      target: { value: 'foo' },
    });
    await fireEvent.change(getByLabelText('Password'), {
      target: { value: 'foo123' },
    });
    await fireEvent.click(getByTestId('login-btn'));
  });
  expect(store.dispatch).toHaveBeenCalled();
});

test('renders Login page with error message', () => {
  const { getByText } = renderWithRedux(<Login />, {
    initialState: {
      auth: {
        error: 'Error on log-in',
      },
    },
  });
  const errorElement = getByText(/Error on log-in/i);
  expect(errorElement).toBeInTheDocument();
});

test('renders Login page with loading button', () => {
  const { getByTestId } = renderWithRedux(<Login />, {
    initialState: {
      auth: {
        isAuthenticating: true,
      },
    },
  });
  const buttonElement = getByTestId('loading-login');
  expect(buttonElement).toBeInTheDocument();
});
