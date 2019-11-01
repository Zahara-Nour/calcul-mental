import React from 'react'
import Questions from './Questions'
import { fetchQuestions } from './assessmentSlice'
import { connect } from 'react-redux'
import Correction from './Correction'

function mapStateToProps(state) {
  return {
    isReady: state.assessment.ready,
    isFetching: state.assessment.fetching,
    isFinished: state.assessment.finished,
    questions: state.assessment.generatedQuestions,
  }
}

function Assessment({ isReady, isFetching, isFinished, questions, dispatch }) {
  if (!isReady && !isFetching && !isFinished) {
    dispatch(fetchQuestions({type:"mono", id:"1"}))
  }

  return isFetching ? (
    <div>Fetching....</div>
  ) : isReady ? (
    <Questions questions={questions} />
  ) : isFinished ? (
    <Correction questions={questions} />
  ) : (
    <div>rien a faire</div>
  )
}

export default connect(mapStateToProps)(Assessment)
