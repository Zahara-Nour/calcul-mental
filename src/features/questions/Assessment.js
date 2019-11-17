import React from 'react'
import Questions from './Questions'
import { connect } from 'react-redux'
import Correction from './Correction'

function mapStateToProps(state) {
  return {
    isFinished: state.assessment.finished,
    questions: state.assessment.generatedQuestions,
  }
}

function Assessment({ isFinished, questions }) {
  return isFinished ? (
    <Correction questions={questions} />
  ) : (
    <Questions questions={questions} />
  )
}

export default connect(mapStateToProps)(Assessment)
