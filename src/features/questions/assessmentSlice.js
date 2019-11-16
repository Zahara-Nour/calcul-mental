import { createSlice } from 'redux-starter-kit'
import { db } from '../../firebase/firebase'
import { math } from 'tinycas/build/math/math'

function preparedQuestions(state) {
  const questions = state.questions
  if (state.monoAssessment) {
    
    for (let i = 0; i < state.nbQuestions - 1; i++) {
      questions.push(state.questions[0])
    }
  }
  return questions.map(question => {
    const { levels, ...rest } = question
    const a = levels[0].text
    const e = math(a)
    const f = e.generate().string
    return {
      text: math(levels[state.level-1].text).generate().string,
      ...rest,
    }
  })
}
const initialState = {
  questions: [],
  generatedQuestions: [],
  nbQuestions: 10,
  defaultDelay: 3000,
  fetchError: false,
  fetching: false,
  fetched: false,
  isReady: false,
  isSelected: false,
  finished: false,
  monoAssessment: 1,
  mixedAssessment: 1,
  categories: [],
  category: null,
  subcategory: null,
  subsubcategory: null,
  level:1,
  levels:[]
}

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState: initialState,
  reducers: {
    
    setCategory(state, action) {
      state.category = action.payload.category
      state.subcategory = action.payload.subcategory
      state.subsubcategory = action.payload.subsubcategory
      state.fetched = false
    },

    setLevel(state,action) {
      state.level = action.payload.level
    },
    
    prepareQuestions(state) {
      state.generatedQuestions = preparedQuestions(state)
    },
   
    assessmentFinished(state) {
      state.finished = true
    },
    selectAssessment(state, action) {
      state.nbQuestions = action.payload.nbQuestions
      state.defaultDelay = action.payload.defaultDelay
      state.monoAssessment = action.payload.monoAssessment
      state.mixedAssessment = action.payload.assessmentId
      state.isSelected = true
    },
  },
})

export const {
  assessmentFinished,
  selectAssessment,
  setCategory,
  setLevel,
  prepareQuestions
} = assessmentSlice.actions

export default assessmentSlice.reducer
