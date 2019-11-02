import React from 'react'
import { connect } from 'react-redux'
import Assessment from '../features/questions/Assessment'
import Columns from 'react-bulma-components/lib/components/columns'
import Box from 'react-bulma-components/lib/components/box'
import Section from 'react-bulma-components/lib/components/section'
import ChoiceTabs from '../features/questions/ChoiceTabs'
import Params from '../features/questions/Params'
import { fetchCategories } from '../features/questions/assessmentSlice'
import Loader from 'react-bulma-components/lib/components/loader'

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
    dispatch(fetchCategories())
  }
  

  return assessmentSelected ? (
    <Assessment />
  ) : categories.length === 0 ? (
    <Loader />
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
            <Params />
          </Box>
        </Section>
      </Columns.Column>
    </Columns>
  )
}

export default connect(mapStateToProps)(CalcuMental)
