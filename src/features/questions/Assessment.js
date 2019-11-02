import React from 'react'
import Questions from './Questions'
import { connect } from 'react-redux'
import Correction from './Correction'

function mapStateToProps(state) {
  return {
    isFinished: state.assessment.finished,
    questions: state.assessment.generatedQuestions,
    defaultDelay: state.assessment.defaultDelay,
  }
}

function Assessment({ isFinished, questions, defaultDelay, dispatch }) {
  return isFinished ? (
    <Correction questions={questions} />
  ) : (
    <Questions questions={questions} defaultDelay={defaultDelay} />
  )
}

export default connect(mapStateToProps)(Assessment)
