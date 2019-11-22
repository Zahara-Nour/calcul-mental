import React from 'react'
import { connect } from 'react-redux'
import List from 'react-bulma-components/lib/components/list'
import Heading from 'react-bulma-components/lib/components/heading'
import { removeFromBasket, saveBasketThunk } from './assessmentSlice'
import Button from 'react-bulma-components/lib/components/button'
import Modal from 'react-bulma-components/lib/components/modal'
import Section from 'react-bulma-components/lib/components/section'
import OpenModal from '../../components/OpenModal'

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
        <Button
          color="primary"
          onClick={() => {
            
          }}
        >
          charger
        </Button>
        <Button
          color="primary"
          onClick={() => {
            dispatch(saveBasketThunk({id:"essai", assessment: questions}))
            
          }}
        >
          Sauvegarder
        </Button>
        <OpenModal modal={{ closeOnEsc: false }}>
      <Modal.Content>
        <Section style={{ backgroundColor: 'white' }}>
          Click on the {'"X"'} button on the top-right button to close the Modal (pass closeOnEsc=false to the modal to avoid closing it with the keyboard)
        </Section>
      </Modal.Content>
    </OpenModal>
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
