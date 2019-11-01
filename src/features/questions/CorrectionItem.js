import React from 'react'
import math from 'tinycas'
import 'katex/dist/katex.min.css'
import TeX from '@matejmazur/react-katex'

function CorrectionItem({question}) {
    const e = math(question.text)
    question = e.latex
    const paramsEval = {

    }
    const correction = e.eval().latex


    return (
        <div>
        <TeX math={question} /> = <TeX math={correction} />
        </div>
    )
}

export default CorrectionItem