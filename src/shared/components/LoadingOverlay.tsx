import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

function LoadingOverlay({ control }: { control: boolean }) {
  return control ? (
    <Overlay>
      <Spinner className="m-auto" animation="border" />
    </Overlay>
  ) : null;
}

export default LoadingOverlay;
