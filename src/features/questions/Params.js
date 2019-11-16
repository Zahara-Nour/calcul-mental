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
import questions from '../../assets/questions'

function mapStateToProps(state) {
  return {
    category: state.assessment.category,
    subcategory: state.assessment.subcategory,
    subsubcategory: state.assessment.subsubcategory,
    level: state.assessment.level,
  }
}

function Params({ category, subcategory, subsubcategory, level, dispatch }) {
  const [nbQuestions, setNbQuestions] = useState(1)
  const [delay, setDelay] = useState(1)
  const [levelId, setLevelId] = useState(0)

  const question = questions.filter(
    question =>
      question.category === category &&
      question.subcategory === subcategory &&
      question.subsubcategory === subsubcategory,
  )[0]

  // dispatch(prepareQuestions())

  let i = 0

  return question ? (

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

      <>
        <Label>Niveau</Label>
        <Field kind="group">
          {question.levels.map(level => {
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
            dangerouslySetInnerHTML={{ __html: question.levels[levelId].description }}
          />
        </Content>
      </>

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
  ) : (
    <div/>
  )
}

export default connect(mapStateToProps)(Params)
