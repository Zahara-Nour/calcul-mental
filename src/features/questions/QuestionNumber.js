import React from 'react'

export default function QuestionNumber({number}) {

    return (
        <span style= {{
            width:"auto",
            fontSize:40,
            backgroundColor:"black",
            border: "5px solid red",
            borderRadius: "50%"
        }}>
        {number}
        </span>
    )
}
