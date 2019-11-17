import React from 'react'
import { connect } from 'react-redux'
import Assessment from '../features/questions/Assessment'
import Columns from 'react-bulma-components/lib/components/columns'
import Button from 'react-bulma-components/lib/components/button'
import Box from 'react-bulma-components/lib/components/box'
import Section from 'react-bulma-components/lib/components/section'
import ChoiceTabs from '../features/questions/ChoiceTabs'
import questions from '../assets/questions'
import Basket from '../features/questions/Basket'
import { prepareQuestions } from '../features/questions/assessmentSlice'
import { Container } from '@material-ui/core'
console.log('quesions')
console.log(questions)

function mapStateToProps(state) {
  return {
    assessmentReady: state.assessment.isReady,
  }
}

function CalcuMental({ assessmentReady, dispatch }) {
  return assessmentReady ? (
    <Assessment />
  ) : (
    <Columns>
      <Columns.Column size={8}>
        <Section>
          <Box>
            <ChoiceTabs />
          </Box>
        </Section>
      </Columns.Column>
      <Columns.Column size={4}>
        <Section>
          <Container>
            <Button
              color="primary"
              onClick={function() {
                dispatch(prepareQuestions())
              }}
            >
              Go daddy !
            </Button>
          </Container>
        </Section>
        <Section>
          <Box>
            <Basket />
          </Box>
        </Section>
      </Columns.Column>
    </Columns>
  )
}

export default connect(mapStateToProps)(CalcuMental)
