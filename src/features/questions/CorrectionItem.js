import React from 'react'
import math from 'tinycas'
import 'katex/dist/katex.min.css'
import TeX from '@matejmazur/react-katex'
import List from 'react-bulma-components/lib/components/list'

function CorrectionItem({question, number}) {
    const e = math(question.text)
    question = e.latex
   
    const correction = e.eval().latex
    number = number.toString()+")        "


    return (
        <div style={{ fontSize:40}}>
        <List.Item>{number}<TeX  math={question} /> = <TeX style={{color:'green'}} math={correction} /></List.Item>
        </div>
    )
}

export default CorrectionItem