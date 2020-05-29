import React from 'react';
import { renderWithRedux } from '../shared/utils/test-utils';
import App from '.';

test('renders Login page', () => {
  const { getByText } = renderWithRedux(<App />, {});
  const linkElement = getByText(/Log-in/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders IndicatorMessages List page', () => {
  const { getByText } = renderWithRedux(<App />, {
    initialState: {
      auth: {
        isAuthenticated: true,
      },
    },
  });
  const headingElement = getByText(/Indicator Messages/i);
  expect(headingElement).toBeInTheDocument();
});
