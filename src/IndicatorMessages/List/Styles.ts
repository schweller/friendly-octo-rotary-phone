import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  border: 0 solid rgba(122,123,151,.3);
  border-width: 1px;
  border-radius: .25rem;
  margin-bottom: 1rem;
`

const ContainerHeader = styled.div`
  flex: 1 1 100%;
  background: rgba(122,123,151,.3);
  padding: .3rem 1rem;
`

type ScoreContainerProps = {
  padding?: string
  width?: number
}

const ScoreContainer = styled.div`
  align-items: center;
  border: 0 solid rgba(122,123,151,.3);
  border-right-width: 1px;
  display: flex;
  flex-direction: column;
  padding: ${(props: ScoreContainerProps) => props.padding || `2rem 3.5rem 6rem`};
  width: ${(props: ScoreContainerProps) => props.width ? `${props.width}px` : `inherit` }
`

const BlockScoreContainer = styled(ScoreContainer)`
  display: block;
  width: 200px;
`

const DetailsContainer = styled.div`
  padding: 0.5rem 1.5rem;
  display: flex;
  flex: 1;
  p {
    margin: 0;
  }
`

const Name = styled.p`
  font-size: 1rem;
`

const Subject = styled.p`
  font-size: 1rem;
  font-weight: bold;
`

const Source = styled.p`
  color: gray;
  font-size: .75rem;
`

export {
  Container,
  ContainerHeader,
  Source,
  ScoreContainer,
  BlockScoreContainer,
  DetailsContainer,
  Name,
  Subject
}
