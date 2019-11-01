import React, { useState, useEffect, useRef } from 'react'
import Question from './Question'
import '../../CircularProgressBar.css'
import CircularProgressBar from '../../CircularProgressBar.js'
import { connect } from 'react-redux'
import {assessmentFinished} from './assessmentSlice'



 function Questions({questions, dispatch}) {
  const [current, setCurrent] = useState(1)
  const [start, setStart] = useState(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const delay = questions[current-1].delay
  console.log(questions)
  console.log(questions[0])
 

  function changeQuestion() {
    if (current === questions.length) {
      console.log('fin')
      dispatch(assessmentFinished())
    } else {
      setCurrent(current => current + 1)
      setStart(Date.now())
    }
  }

  function countDown() {
    setElapsed(Date.now() - start)
  }
  console.log(delay)
  useInterval(changeQuestion, delay)
  useInterval(countDown, 10)
  const value = ((delay - elapsed) * 100) / delay

  return (
    <div className="App">
      <header className="App-header">
        {current}
        <Question text={questions[current - 1].text} />
        <CircularProgressBar strokeWidth="20" sqSize="150" percentage={value} />
      </header>
    </div>
  )
}

function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    let id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default connect()(Questions)