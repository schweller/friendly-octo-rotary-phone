import styled from 'styled-components';
import { Badge, Col } from 'react-bootstrap';

import { mixin } from '../../shared/utils/styles';

const Container = styled.div`
  ${mixin.border}
  ${mixin.boxShadowMedium}
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  border-width: 1px;
  margin-bottom: 1rem;
`;

const ContainerHeader = styled.div`
  flex: 1 1 100%;
  background: rgba(122, 123, 151, 0.3);
  padding: 0.3rem 1rem;
`;

type ScoreContainerProps = {
  padding?: string;
  width?: number;
};

const ScoreContainer = styled.div`
  ${mixin.border}
  align-items: center;
  border-right-width: 1px;
  display: flex;
  flex-direction: column;
  padding: ${(props: ScoreContainerProps) =>
    props.padding || `2rem 3.5rem 6rem`};
  width: ${(props: ScoreContainerProps) =>
    props.width ? `${props.width}px` : `inherit`};
`;

const BlockScoreContainer = styled(ScoreContainer)`
  display: block;
  width: 200px;
`;

const DetailsContainer = styled.div`
  padding: 0.5rem 1.5rem;
  display: flex;
  flex: 1;
  p {
    margin: 0;
  }
`;

const Name = styled.p`
  font-size: 1rem;
`;

const Subject = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const Source = styled.p`
  color: gray;
  font-size: 0.75rem;
`;

const StyledBadge = styled(Badge)`
  min-width: 50px;
  font-size: 0.85rem;
`;

const FiltersCol = styled(Col)`
  ${mixin.border}
  border-width: 1px;
  padding: 1rem;
`;

export {
  BlockScoreContainer,
  Container,
  ContainerHeader,
  DetailsContainer,
  FiltersCol,
  Name,
  ScoreContainer,
  Source,
  Subject,
  StyledBadge,
};
