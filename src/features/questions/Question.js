import React from 'react';
import 'katex/dist/katex.min.css'
import TeX from '@matejmazur/react-katex'
import { math } from 'tinycas/build/math/math'



export default function Question ({text}) {
    return (
        <div style={{ fontSize:100}}>
            <TeX  math={math(text).latex} block />
        </div>
    )
}