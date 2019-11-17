import React from 'react'
import { connect } from 'react-redux'
import List from 'react-bulma-components/lib/components/list'
import Heading from 'react-bulma-components/lib/components/heading'
import { removeFromBasket } from './assessmentSlice'

function mapStateToProps(state) {
  return {
    questions: state.assessment.questions,
  }
}

function Basket({ questions, dispatch }) {
  let i = 0
  return (
    <>
      <Heading>
          Panier
        </Heading>
      <List hoverable>
        {questions.map(question => {
          const id = i++
          return (
            <List.Item
              key={'question' + id}
              onClick={() => {
                dispatch(removeFromBasket({ id }))
              }}
            >
              {[question.category,question.subcategory,question.subsubcategory,question.level,question.text].join(':')}
            </List.Item>
          )
        })}
      </List>
    </>
  )
}

export default connect(mapStateToProps)(Basket)
