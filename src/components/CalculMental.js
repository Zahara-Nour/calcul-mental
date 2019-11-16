import React from 'react'
import { connect } from 'react-redux'
import Assessment from '../features/questions/Assessment'
import Columns from 'react-bulma-components/lib/components/columns'
import Box from 'react-bulma-components/lib/components/box'
import Section from 'react-bulma-components/lib/components/section'
import ChoiceTabs from '../features/questions/ChoiceTabs'
import questions from '../assets/questions'
import Basket from '../features/questions/Basket'
console.log('quesions')
console.log(questions)

function mapStateToProps(state) {
  return {
    assessmentSelected: state.assessment.isSelected,
    isFetchingCategories: state.assessment.isFetchingCategories,
    categories: state.assessment.categories,
  }
}

function CalcuMental({
  categories,
  assessmentSelected,
  isFetchingCategories,
  dispatch,
}) {
  if (!assessmentSelected && categories.length === 0 && !isFetchingCategories) {
    // dispatch(fetchCategories())
  }
  

  return assessmentSelected ? (
    <Assessment />
  ) : (
    <Columns>
      <Columns.Column size={8}>
        <Section>
          <ChoiceTabs categories={categories} />
        </Section>
      </Columns.Column>
      <Columns.Column size={4}>
        <Section>
          <Box>
            <Basket />
          </Box>
        </Section>
      </Columns.Column>
    </Columns>
  )
}

export default connect(mapStateToProps)(CalcuMental)
