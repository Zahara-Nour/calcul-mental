import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Field,
  Control,
  Label,
  Input,
} from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import { selectAssessment, fetchQuestions } from '../questions/assessmentSlice'
import  Loader from 'react-bulma-components/lib/components/button'



function mapStateToProps(state) {
  return {
    isFetchingQuestions:state.assessment.fetching,
    category:state.assessment.category,
    subcategory:state.assessment.subcategory
  }
}


function Params({category, subcategory, isFetchingQuestions, dispatch }) {
  const [nbQuestions, setNbQuestions] = useState(1)
  const [delay, setDelay] = useState(1)

  if (!isFetchingQuestions) {
    dispatch(
      fetchQuestions({
        type: 'mono',
        params: {
          category:category,
          subcategory: subcategory,
        }}),
    )
  }

  return  isFetchingQuestions ? (
    <Loader/>
  ) : (
    <>
      <Field>
        <Label>Nombre de questions</Label>
        <Control>
          <Input
            onChange={evt => setNbQuestions(evt.target.value)}
            name="number"
            type="number"
            placeholder="10"
            value={nbQuestions}
          />
        </Control>
      </Field>
      <Field>
        <Label>Delai</Label>
        <Control>
          <Input
            onChange={evt => setDelay(evt.target.value)}
            name="delay"
            type="number"
            placeholder="0"
            value={delay}
          />
        </Control>
      </Field>
      <Field>
        <Control>
          
          <Button
            type="primary"
            color="primary"
            loading = {isFetchingQuestions}
            onClick={function () {
              dispatch(selectAssessment({
                monoAssessment: 1,
                defaultDelay: parseInt(delay,10),
                nbQuestions: parseInt(nbQuestions,10),
              }))
             dispatch(fetchQuestions({ type:'mono', id: '1' }))

            }}
          >
            Go daddy !
          </Button>
        
        </Control>
      </Field>
    </>
  )
}

export default connect(mapStateToProps)(Params)
