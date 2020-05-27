import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'reducers'
import { fetchIndicatorMessages } from 'reducers/indicatorMessages'

import IndicatorMessagesList from './List'
import IndicatorMessage from './IndicatorMessage'

function IndicatorMessages() {
  const dispatch = useDispatch()

  const {
    token
  } = useSelector((state: RootState) => state.auth)

  const {
    indicatorMessageId
  } = useSelector((state: RootState) => state.indicatorMessage)

  useEffect(() => {
    if (token) {
      dispatch(fetchIndicatorMessages(token))
    }
  }, [dispatch, token])

  return (
    <>
      {
        indicatorMessageId ? <IndicatorMessage /> : <IndicatorMessagesList /> 
      }
    </>
  )
}

export default IndicatorMessages;