import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import { RootState } from 'reducers'
import { login } from 'reducers/auth'

function Login() {
  const dispatch = useDispatch();

  const {
    isAuthenticating
  } = useSelector((state: RootState) => state.auth)

  const handleLogin = useCallback(() => {
    dispatch(login())
  }, [dispatch])

  return (
    <>
      <Container>
        <Row className="justify-content-md-center" style={{height: '100vh'}}>
          <Col md="auto" className="align-self-center">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              {
                isAuthenticating ? 
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Logging in...
                </Button> :
                <Button variant="primary" onClick={handleLogin}>
                  Submit
                </Button>
              }
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login