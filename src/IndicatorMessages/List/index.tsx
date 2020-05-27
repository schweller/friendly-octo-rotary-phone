import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Formik, useField } from 'formik';

import SingleIndicatorMessage from './SingleIndicatorMessage';
import { RootState } from 'reducers';
import { fetchIndicatorMessages } from 'reducers/indicatorMessages'

const EventsCheckBox: React.FC<{name: string}> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

interface FiltersFormValues {
  showOnlyEvents: boolean
}

function IndicatorMessagesList() {
  const dispatch = useDispatch()
  const {
    isLoading,
    messages,
    filters
  } = useSelector((state: RootState) => state.indicatorMessages)

  const { token } = useSelector((state: RootState) => state.auth)

  const handleFilters = useCallback((values: FiltersFormValues) => {
    if (token) {
      const filters = []
      const { showOnlyEvents } = values
      if (showOnlyEvents) {
        filters.push({
          name: "event",
          value: true
        })
      }
      dispatch(fetchIndicatorMessages(token, filters))
    }
  }, [dispatch])

  const formInitialValues = useMemo(() => {
    if (filters) {
      const filtersObject = filters.reduce((acc, {name, value}) => {
        acc[name] = value
        return acc
      }, {} as {[key: string]: any})

      return {
        showOnlyEvents: filtersObject['event']
      }
    }

    return {
      showOnlyEvents: false
    }
  }, [filters])

  return (
    <>
      { 
        isLoading ? 'Loading data!' : 
        <Container>
          <Row className="justify-content-md-center">
            <Col lg="2" md="2">
              <Formik
                initialValues={formInitialValues}
                onSubmit={(values) => {
                  console.log(values)
                  handleFilters(values)
                }}>
                {({handleSubmit}) => (
                  <Form onSubmit={handleSubmit}>
                    <EventsCheckBox name="showOnlyEvents">Show only Events</EventsCheckBox>
                    <Button type="submit">Filter</Button>
                  </Form>
                )}
              </Formik>
            </Col>
            <Col lg="10" md="10">
              <h3 className="mb-4">Indicator Messages</h3>
              {messages && messages.map((message) => {
                const { id } = message
                return <SingleIndicatorMessage key={id} message={message} />
              })}
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default IndicatorMessagesList;