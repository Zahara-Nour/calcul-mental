import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Field,
  Control,
  Label,
  Input,
} from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import {
  selectAssessment,
  fetchQuestions,
  setLevel,
  prepareQuestions,
} from '../questions/assessmentSlice'
import Loader from 'react-bulma-components/lib/components/loader'
import Content from 'react-bulma-components/lib/components/content'

function mapStateToProps(state) {
  return {
    isFetchingQuestions: state.assessment.fetching,
    category: state.assessment.category,
    subcategory: state.assessment.subcategory,
    questionsFetched: state.assessment.fetched,
    level: state.assessment.level,
    questions: state.assessment.questions,
  }
}

function Params({
  questionsFetched,
  questions,
  category,
  subcategory,
  isFetchingQuestions,
  level,
  dispatch,
}) {
  const [nbQuestions, setNbQuestions] = useState(1)
  const [delay, setDelay] = useState(1)
  const [levelId, setLevelId] = useState(0)
  let levels

  if (!questionsFetched && !isFetchingQuestions) {
    dispatch(
      fetchQuestions({
        type: 'mono',
        params: {
          category: category,
          subcategory: subcategory,
        },
      }),
    )
  } else if (questionsFetched) {
    levels = questions[0].levels
    // dispatch(prepareQuestions())
  }

  let i = 0

  return (
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

      {isFetchingQuestions ? (
        <Loader />
      ) : questionsFetched ? (
        <>
          <Label>Niveau</Label>
          <Field kind="group">
            {levels.map(level => {
              const id = i++
              return (
                <Control key={'button' + id}>
                  <Button
                    color={levelId === id ? 'primary' : ''}
                    onClick={() => {
                      setLevelId(id)
                      dispatch(setLevel({ level: id + 1 }))
                    }}
                  >
                    {id + 1}
                  </Button>
                </Control>
              )
            })}
          </Field>
          <Content>
            <div
              dangerouslySetInnerHTML={{ __html: levels[levelId].description }}
            />
          </Content>
        </>
      ) : (
        <div />
      )}

      <Field>
        <Control>
          <Button
            color="primary"
            onClick={function() {
              dispatch(
                selectAssessment({
                  monoAssessment: 1,
                  defaultDelay: parseInt(delay, 10),
                  nbQuestions: parseInt(nbQuestions, 10),
                }),
              )
              dispatch(prepareQuestions())
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
