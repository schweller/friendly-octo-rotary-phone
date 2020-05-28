import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'reducers';
import { fetchIndicatorMessages } from 'reducers/indicatorMessages';

import IndicatorMessagesList from './List';
import IndicatorMessage from './IndicatorMessage';

function IndicatorMessages() {
  const dispatch = useDispatch();

  const { indicatorMessageId } = useSelector(
    (state: RootState) => state.indicatorMessage
  );

  useEffect(() => {
    dispatch(fetchIndicatorMessages());
  }, [dispatch]);

  return (
    <>{indicatorMessageId ? <IndicatorMessage /> : <IndicatorMessagesList />}</>
  );
}

export default IndicatorMessages;
