import axios from 'axios';

import reducer, {
  initialState,
  loginFailure,
  loginStart,
  loginSuccess,
  login,
} from './auth';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '.';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('auth slice', () => {
  describe('reducer, actions and selectors', () => {
    test('should properly set the state to isAuthenticating', () => {
      const nextState = reducer(initialState, loginStart());

      const rootState = { auth: nextState };
      expect(rootState.auth.isAuthenticating).toEqual(true);
    });

    test('should properly set the state to isAuthenticated and token', () => {
      const nextState = reducer(
        initialState,
        loginSuccess({
          token: 'foo123',
        })
      );

      const rootState = { auth: nextState };
      expect(rootState.auth.isAuthenticated).toEqual(true);
      expect(rootState.auth.isAuthenticating).toEqual(false);
      expect(rootState.auth.token).toEqual('foo123');
    });

    test('should properly set the state to isAuthenticated and error', () => {
      const errorStatus = 404;
      const nextState = reducer(
        initialState,
        loginFailure({
          status: errorStatus,
        })
      );

      const rootState = { auth: nextState };
      expect(rootState.auth.isAuthenticated).toEqual(false);
      expect(rootState.auth.isAuthenticating).toEqual(false);
      expect(rootState.auth.error).toBe(`Log-in error ${errorStatus}`);
    });
  });

  describe('login', () => {
    test('should properly set the state to isAuthenticated and token after login', async () => {
      const store = configureStore({
        reducer: rootReducer,
      });
      const resp = {
        data: {
          access_token: 'foo123',
        },
      };
      mockedAxios.post.mockResolvedValue(resp);
      await store.dispatch(login('foo', 'foo123'));

      const { auth } = store.getState();
      expect(auth.isAuthenticated).toEqual(true);
      expect(auth.isAuthenticating).toEqual(false);
      expect(auth.token).toEqual('foo123');
    });
  });
});
