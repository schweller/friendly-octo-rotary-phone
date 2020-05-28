import React from 'react';
import { renderWithRedux } from 'shared/utils/test-utils';
import IndicatorMessages from '.';

test('renders IndicatorMessage page', () => {
  const { getByText } = renderWithRedux(<IndicatorMessages />, {});
  const headingElement = getByText(/Indicator Message/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders IndicatorMessages List page', () => {
  const { getByText } = renderWithRedux(<IndicatorMessages />, {
    initialState: {
      indicatorMessage: {
        indicatorMessageId: null,
      },
    },
  });
  const headingElement = getByText(/Indicator Messages/i);
  expect(headingElement).toBeInTheDocument();
});
