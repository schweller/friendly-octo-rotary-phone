import axios from 'axios';
import api from '../../shared/utils/api';

import reducer, {
  fetchIndicatorMessage,
  initialState,
  getIndicatorMessageFailure,
  getIndicatorMessageStart,
  getIndicatorMessageSuccess,
  resetIndicatorMessage,
} from './indicatorMessage';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '.';

jest.mock('../../shared/utils/api');
const mockedAxios = api as jest.Mocked<typeof axios>;

describe('indicatorMessage slice', () => {
  describe('reducer, actions and selectors', () => {
    test('should properly set the state to isLoading and indicatorMessageId', () => {
      const nextState = reducer(initialState, getIndicatorMessageStart(123));

      const rootState = { indicatorMessage: nextState };
      expect(rootState.indicatorMessage.indicatorMessageId).toEqual(123);
      expect(rootState.indicatorMessage.isLoading).toEqual(true);
    });

    test('should properly set the state to isLoading and indicatorMessage', () => {
      const nextState = reducer(
        initialState,
        getIndicatorMessageSuccess({
          indicatorMessage: {},
        })
      );

      const rootState = { indicatorMessage: nextState };
      expect(rootState.indicatorMessage.isLoading).toEqual(false);
      expect(rootState.indicatorMessage.indicatorMessage).toBeDefined();
    });

    test('should properly set the state to isLoading and indicatorMessageId', () => {
      const nextState = reducer(initialState, getIndicatorMessageFailure());

      const rootState = { indicatorMessage: nextState };
      expect(rootState.indicatorMessage.indicatorMessageId).toBeNull();
      expect(rootState.indicatorMessage.isLoading).toEqual(false);
      expect(rootState.indicatorMessage.error).toEqual(
        'Failed to load Indicator Message'
      );
    });

    test('should properly set the state to indicatorMessageId and indicatorMessage', () => {
      const nextState = reducer(initialState, resetIndicatorMessage());

      const rootState = { indicatorMessage: nextState };
      expect(rootState.indicatorMessage.indicatorMessageId).toBeNull();
      expect(rootState.indicatorMessage.indicatorMessage).toBeNull();
    });
  });

  describe('fetchIndicatorMessage', () => {
    test('should properly set the state to isAuthenticated and token after login', async () => {
      const store = configureStore({
        reducer: rootReducer,
      });
      const resp = {
        data: {
          data: {
            foo: 123,
          },
        },
      };
      mockedAxios.get.mockResolvedValue(resp);
      await store.dispatch(fetchIndicatorMessage(123));

      const { indicatorMessage } = store.getState();
      expect(indicatorMessage.error).toBeNull();
      expect(indicatorMessage.isLoading).toEqual(false);
      expect(indicatorMessage.indicatorMessage).toBeDefined();
    });
  });
});
