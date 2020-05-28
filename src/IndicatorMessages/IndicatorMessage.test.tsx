import React from 'react';
import { renderWithRedux } from 'shared/utils/test-utils';
import IndicatorMessage from './IndicatorMessage';

test('renders IndicatorMessage page', () => {
  const { getByTestId } = renderWithRedux(<IndicatorMessage />, {
    initialState: {
      indicatorMessage: {
        indicatorMessageId: null,
        indicatorMessage: {
          attributes: {
            name: 'Unterschleißheim',
            risk_score: {
              value: 100,
            },
            valid_until: '2020-05-30T23:59:59.999+02:00',
            created_at: '2020-05-22T09:42:52.247+02:00',
          },
        },
      },
    },
  });

  const indicatorMessage = getByTestId('indicator-message');
  expect(indicatorMessage).toBeInTheDocument();
});
