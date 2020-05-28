import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Field, Formik } from 'formik';

import { RootState } from 'reducers'
import { login } from 'reducers/auth'

function Login() {
  const dispatch = useDispatch();

  const {
    isAuthenticating
  } = useSelector((state: RootState) => state.auth)

  const handleLogin = useCallback((values) => {
    const {username, password} = values
    dispatch(login(username, password))
  }, [dispatch])

  return (
    <>
      <Container>
        <Row className="justify-content-md-center" style={{height: '100vh'}}>
          <Col md="auto" className="align-self-center">
            <Formik
              initialValues={{
                username: '',
                password: ''
              }}
              onSubmit={(values) => {
                console.log(values)
                handleLogin(values)
              }}
            >
              {({values, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Field as={Form.Control} name="username" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Field as={Form.Control} type="password" name="password" placeholder="Password" />
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
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  }
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login