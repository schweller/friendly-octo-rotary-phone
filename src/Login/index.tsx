import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Field, Formik } from 'formik';

import { RootState } from '../redux/reducers';
import { login } from '../redux/reducers/auth';

function Login() {
  const dispatch = useDispatch();

  const { isAuthenticating, error: authError } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = useCallback(
    (values) => {
      const { username, password } = values;
      dispatch(login(username, password));
    },
    [dispatch]
  );

  return (
    <>
      <Container>
        <Row className="justify-content-md-center" style={{ height: '100vh' }}>
          <Col md="auto" className="align-self-center">
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              {({ values, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Field
                      as={Form.Control}
                      name="username"
                      data-testid="username-control"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Field
                      as={Form.Control}
                      data-testid="password-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <p>
                    <small className="text-danger">{authError}</small>
                  </p>
                  {isAuthenticating ? (
                    <Button
                      variant="primary"
                      data-testid="loading-login"
                      disabled
                    >
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Logging in...
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      data-testid="login-btn"
                    >
                      Log-in
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
