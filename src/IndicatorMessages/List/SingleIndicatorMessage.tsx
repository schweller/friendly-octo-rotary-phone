import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Badge, BadgeProps, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { RootState } from 'reducers'
import { fetchIndicatorMessage } from 'reducers/indicatorMessage'
import getVariant from 'shared/utils/getVariant'

import { Container, DetailsContainer, Source, Subject, ScoreContainer, Name } from './Styles'

const StyledBadge = styled(Badge)`
  min-width: 50px;
  font-size: .85rem;
`

type PropsType = {
  message: {
    id: number
    attributes: {
      risk_score: {
        value: number
      }
      name: string
      subject: string
      source: string
      created_at: string
    }
  }
}

function SingleIndicatorMessage({message}: PropsType) {
  const { id, attributes } = message

  const dispatch = useDispatch()

  const {
    token
  } = useSelector((state: RootState) => state.auth)


  const date = new Date(attributes.created_at)

  const handleSelect = useCallback(() => {
    if (token) {
      dispatch(fetchIndicatorMessage(token, id))
    }
  }, [id]);

  return (
    <Container>
      <ScoreContainer>
        <StyledBadge variant={getVariant(attributes.risk_score.value)}>{attributes.risk_score.value}.0</StyledBadge>
      </ScoreContainer>
      <DetailsContainer>
        <div style={{flex: 1}}>
          <Name className="mb-2">{attributes.name}</Name>
          <Source>Created on {date.toUTCString()}</Source>
          <Source>Source: {attributes.source}</Source>
          <Subject className="mt-2">
            {attributes.subject}
          </Subject>
        </div>
        <div style={{alignSelf: 'flex-end'}}>
          <Button variant="primary" onClick={handleSelect}>Details</Button>
        </div>
      </DetailsContainer>
    </Container>
  )
}

export default SingleIndicatorMessage