import React from 'react'
import CorrectionItem from './CorrectionItem'


export default function Correction({ questions }) {
  let i = 1
  return (
    <ul>
      {questions.map(question => (
        <CorrectionItem key={i++} question={question}/>
      ))}
    </ul>
  )
}
