import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import SingleIndicatorMessage from './SingleIndicatorMessage';
import ScoreRange from './ScoreRange'
import EventsCheckBox from './EventsCheckbox'
import { FiltersCol } from './Styles'
import SectionHeader from 'shared/components/SectionHeader'

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

  const handleFilters = useCallback((values: FiltersFormValues) => {
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
    if (truthyFilters) dispatch(fetchIndicatorMessages(truthyFilters))
  }, [dispatch])

  const formInitialValues = useMemo(() => {
    if (filters) {
      const filtersObject = filters.reduce((acc, {name, value}) => {
        acc[name] = value
        return acc
      }, {} as {[key: string]: any})
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
            <Col className="mt-4 px-0" lg="3" md="3">
              <FiltersCol>
                <Formik
                  initialValues={formInitialValues}
                  validationSchema={
                    yup.object().shape({
                      risk_score_max: yup.number().when('risk_score_min', 
                        (risk_score_min: number, schema: any) => {
                          return risk_score_min !== undefined && schema.min(risk_score_min, `Maximum cannot be lower than minimum`)
                        }
                      ),
                      risk_score_min: yup.number()
                    })
                  }
                  onSubmit={(values) => {
                    handleFilters(values)
                  }}>
                  {({errors, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group>
                        <EventsCheckBox name="event">Show only Events</EventsCheckBox>
                      </Form.Group>
                      <Form.Group>
                        <p>Risk Score</p>
                        <ScoreRange name="risk_score_min">Min</ScoreRange>
                        <ScoreRange name="risk_score_max">Max</ScoreRange>
                      </Form.Group>
                      <Button disabled={Object.keys(errors).length > 0} type="submit">Filter</Button>
                    </Form>
                  )}
                </Formik>
              </FiltersCol>
            </Col>
            <Col lg="9" md="9">
              <SectionHeader title="Indicator Messages" />
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