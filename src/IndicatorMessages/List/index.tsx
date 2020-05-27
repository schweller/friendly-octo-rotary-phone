import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import SingleIndicatorMessage from './SingleIndicatorMessage';
import ScoreRange from './ScoreRange'
import EventsCheckBox from './EventsCheckbox'

import { RootState } from 'reducers';
import { fetchIndicatorMessages, FilterParams } from 'reducers/indicatorMessages'

interface FiltersFormValues { [key: string]: any }

const initialFormValues: FiltersFormValues = {
  event: false,
  risk_score_max: 100,
  risk_score_min: 0
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
      const truthyFilters = Object.keys(values).reduce((acc, key) => {
        const filter = values[key]
        if (filter) {
          acc.push({
            name: key,
            value: filter
          })
        }
        return acc
      }, [] as Array<FilterParams>)
      if (truthyFilters) dispatch(fetchIndicatorMessages(token, truthyFilters))
    }
  }, [dispatch])

  const formInitialValues = useMemo(() => {
    if (filters) {
      const filtersObject = filters.reduce((acc, {name, value}) => {
        acc[name] = value
        return acc
      }, {} as {[key: string]: any})
      console.log(filtersObject)

      return {
        ...initialFormValues,
        ...filtersObject
      }
    }

    return initialFormValues
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
                validationSchema={
                  yup.object().shape({
                    risk_score_max: yup.number().when('risk_score_min', 
                      (risk_score_min: number, schema: any) => {
                        console.log(risk_score_min)
                        return risk_score_min !== undefined && schema.min(risk_score_min)
                      }
                    ),
                    risk_score_min: yup.number()
                  })
                }
                onSubmit={(values) => {
                  console.log(values)
                  handleFilters(values)
                }}>
                {({values, errors, handleSubmit}) => (
                  <Form onSubmit={handleSubmit}>
                    <EventsCheckBox name="event">Show only Events</EventsCheckBox>
                    <Form.Group controlId="formBasicRange">
                      <Form.Label>Risk Score</Form.Label>
                      <ScoreRange name="risk_score_min">Min</ScoreRange>
                      <ScoreRange name="risk_score_max">Max</ScoreRange>
                    </Form.Group>
                    <Button disabled={Object.keys(errors).length > 0} type="submit">Filter</Button>
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