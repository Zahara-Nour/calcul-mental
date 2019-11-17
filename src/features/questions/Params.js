import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Field,
  Control,
  Label,
  Input,
} from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import { setLevel, addToBasket } from '../questions/assessmentSlice'
import Content from 'react-bulma-components/lib/components/content'
import questions from '../../assets/questions'
import { math } from 'tinycas/build/math/math'

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

  const { levels, ...rest } = question ? question : {}

  // dispatch(prepareQuestions())

  let i = 0

  return question ? (
    <>
      <Field>
      <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: question.levels[levelId].description+"<br><strong>Exemple:</strong> "+math(question.levels[levelId].text).generate().string,
            }}
          />
        </Content>
      </Field>

      <Field>
        <Label>Niveau</Label>
        <Button.Group>
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
        </Button.Group>
      </Field>
      
      <Field>
        <Label>Délai</Label>
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
        <Label>Nombre d'utilisation</Label>
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
      <Field >
        <Button
          color="primary"
          onClick={() => {
            for (let i = 0; i < nbQuestions; i++) {
              dispatch(
                addToBasket({
                  question: {
                    ...levels[levelId],
                    ...rest,
                    delay: parseInt(delay, 10) * 1000,
                  },
                }),
              )
            }
          }}
        >
          Ajouter
        </Button>
        
      </Field>
    </>
  ) : (
    <div />
  )
}

export default connect(mapStateToProps)(Params)
