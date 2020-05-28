import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, ProgressBarProps } from 'react-bootstrap';

import { RootState } from 'reducers';
import { resetIndicatorMessage } from 'reducers/indicatorMessage';

import {
  Container as StyledContainer,
  ContainerHeader,
  DetailsContainer,
  Source,
  Subject,
  ScoreContainer,
} from './List/Styles';
import { StyledProgressBar } from './Styles';
import SectionHeader from 'shared/components/SectionHeader';
import LoadingOverlay from 'shared/components/LoadingOverlay';

import getVariant from 'shared/utils/getVariant';
import getUTCDate from 'shared/utils/getUTCDate';

function IndicatorMessage() {
  const dispatch = useDispatch();

  const { isLoading, indicatorMessage } = useSelector(
    (state: RootState) => state.indicatorMessage
  );

  const handleBackToList = useCallback(() => {
    dispatch(resetIndicatorMessage());
  }, [dispatch]);

  return (
    <>
      <LoadingOverlay control={isLoading} />
      {indicatorMessage && (
        <Container>
          <SectionHeader title="Indicator Message" />
          <Button
            className="p-0 mb-4"
            variant="link"
            onClick={handleBackToList}
          >{`< Go to Indicator Messages`}</Button>
          <StyledContainer>
            <ContainerHeader>
              {indicatorMessage.attributes.name}
            </ContainerHeader>
            <ScoreContainer padding="1rem " width={170}>
              <StyledProgressBar
                variant={
                  getVariant(
                    indicatorMessage.attributes.risk_score.value
                  ) as ProgressBarProps['variant']
                }
                now={indicatorMessage?.attributes.risk_score.value}
              />
              <p className="mt-4">
                <small>
                  Valid until:{' '}
                  {getUTCDate(indicatorMessage.attributes.valid_until)}
                </small>
              </p>
            </ScoreContainer>
            <DetailsContainer>
              <div className="w-100">
                <Source className="mt-2">
                  Created on{' '}
                  {getUTCDate(indicatorMessage.attributes.created_at)}
                </Source>
                <Source>Source: {indicatorMessage.attributes.source}</Source>
                <Subject className="my-2">
                  {indicatorMessage?.attributes.subject}
                </Subject>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      indicatorMessage.attributes.body_with_rendered_links,
                  }}
                />
              </div>
            </DetailsContainer>
            <ScoreContainer
              className="d-block text-center border-left border-right-0"
              width={300}
              padding="2rem"
            >
              <h4 className="font-weight-bold pb-3">
                {indicatorMessage.attributes.risk_score.value}
              </h4>
              <StyledProgressBar
                variant={
                  getVariant(
                    indicatorMessage.attributes.risk_score.value
                  ) as ProgressBarProps['variant']
                }
                now={indicatorMessage.attributes.risk_score.value}
              />
              <p className="mt-3 mb-0">Risk Score already set</p>
            </ScoreContainer>
          </StyledContainer>
        </Container>
      )}
    </>
  );
}

export default IndicatorMessage;
