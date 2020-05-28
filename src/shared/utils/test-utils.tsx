import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { configureStore, Store, Action, AnyAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from 'redux/reducers';

interface RenderWithRedux<
  S = any,
  A extends Action = AnyAction,
  I extends S = any
> {
  (
    ui: React.ReactElement,
    reduxOptions: {
      store?: Store<S, A>;
      initialState?: I;
    }
  ): RenderResult & {
    store: Store<S, A>;
  };
}

export const renderWithRedux: RenderWithRedux = (
  ui,
  {
    initialState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
  } = {}
) => {
  return {
    ...render(<Provider store={store}> {ui} </Provider>),
    store,
  };
};
