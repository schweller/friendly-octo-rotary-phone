import React from 'react';
import { renderWithRedux } from 'shared/utils/test-utils';
import IndicatorMessagesList from '.';

test('renders IndicatorMessagesList page with empty messages', () => {
  const { getByTestId } = renderWithRedux(<IndicatorMessagesList />, {
    initialState: {
      indicatorMessages: {
        messages: [],
      },
    },
  });

  const indicatorMessagesList = getByTestId('indicator-messages-list');
  expect(indicatorMessagesList).toBeInTheDocument();
});

test('renders IndicatorMessagesList page with messages and filters', () => {
  const initialState = {
    indicatorMessages: {
      filters: [{ event: true }],
      messages: [
        {
          id: 1,
          attributes: {
            risk_score: {
              value: 100,
            },
          },
        },
        {
          id: 2,
          attributes: {
            risk_score: {
              value: 80,
            },
          },
        },
      ],
    },
  };

  const { getAllByTestId } = renderWithRedux(<IndicatorMessagesList />, {
    initialState,
  });

  const indicatorMessagesList = getAllByTestId('single-indicator-message');
  expect(indicatorMessagesList.length).toBe(
    initialState.indicatorMessages.messages.length
  );
});
