import React, { useState, useEffect, useRef } from 'react'
import Question from './Question'
import '../../CircularProgressBar.css'
import CircularProgressBar from '../../CircularProgressBar.js'
import { connect } from 'react-redux'
import { assessmentFinished } from './assessmentSlice'
import Container from 'react-bulma-components/lib/components/container'

function Questions({ questions, defaultDelay, dispatch }) {
  const [current, setCurrent] = useState(1)
  const [start, setStart] = useState(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const delay = defaultDelay ? defaultDelay * 1000: questions[current - 1].delay*1000
  

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

  useInterval(changeQuestion, delay)
  useInterval(countDown, 10)
  const value = ((delay - elapsed) * 100) / delay

  return (
    <div className="App">
    
        {current}
        <Container>
          <Question text={questions[current - 1].text} />
        </Container>
        <CircularProgressBar strokeWidth="20" sqSize="150" percentage={value} />
    
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
