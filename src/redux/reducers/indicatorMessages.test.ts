import axios from 'axios';
import api from '../../shared/utils/api';

import reducer, {
  fetchIndicatorMessages,
  initialState,
  getIndicatorMessagesStart,
  getIndicatorMessagesSuccess,
  getIndicatorMessagesFailure,
  setFilters,
} from './indicatorMessages';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '.';

jest.mock('shared/utils/api');
const mockedAxios = api as jest.Mocked<typeof axios>;

describe('indicatorMessages slice', () => {
  describe('reducer, actions and selectors', () => {
    test('should properly set the state to isLoading on start', () => {
      const nextState = reducer(initialState, getIndicatorMessagesStart());

      const rootState = { indicatorMessages: nextState };
      expect(rootState.indicatorMessages.isLoading).toEqual(true);
    });

    test('should properly set the state to isLoading and messages on success', () => {
      const nextState = reducer(
        initialState,
        getIndicatorMessagesSuccess({
          messages: [{}, {}],
        })
      );

      const rootState = { indicatorMessages: nextState };
      expect(rootState.indicatorMessages.isLoading).toEqual(false);
      expect(rootState.indicatorMessages.messages).toHaveLength(2);
    });

    test('should properly set the state to isLoading and error on failure', () => {
      const nextState = reducer(
        initialState,
        getIndicatorMessagesFailure('Error loading messages')
      );

      const rootState = { indicatorMessages: nextState };
      expect(rootState.indicatorMessages.messages).toBeNull();
      expect(rootState.indicatorMessages.isLoading).toEqual(false);
      expect(rootState.indicatorMessages.error).toEqual(
        'Error loading messages'
      );
    });
  });

  describe('fetchIndicatorMessages', () => {
    test('should properly set the state to isAuthenticated and token after login', async () => {
      const store = configureStore({
        reducer: rootReducer,
      });
      const resp = {
        data: {
          data: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
      };
      mockedAxios.get.mockResolvedValue(resp);
      await store.dispatch(
        fetchIndicatorMessages([
          {
            name: 'event',
            value: true,
          },
        ])
      );

      const { indicatorMessages } = store.getState();
      expect(indicatorMessages.messages).toHaveLength(2);
      expect(indicatorMessages.filters).toHaveLength(1);
    });
  });
});
