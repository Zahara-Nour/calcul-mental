import { createSlice } from 'redux-starter-kit'
import { db } from '../../firebase/firebase'
import { math } from 'tinycas/build/math/math'

function preparedQuestions(state) {
  const questions = state.questions
  
  return questions.map(question => {
    const { text, ...rest } = question
    return {
      text: math(text).generate().string,
      ...rest
    }})
  
}
const initialState = {
  questions: [],
  generatedQuestions: [],
  fetchError: false,
  fetching: false,
  fetched: false,
  isReady: false,
  finished: false,
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
      state.isReady = true
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

    addToBasket(state, action) {
      state.questions.push(action.payload.question)
    },

    removeFromBasket(state, action) {
      state.questions.splice(action.payload.id,1)
    }
  },
})

export const {
  assessmentFinished,
  selectAssessment,
  setCategory,
  setLevel,
  prepareQuestions,
  addToBasket,
  removeFromBasket
} = assessmentSlice.actions

export default assessmentSlice.reducer
