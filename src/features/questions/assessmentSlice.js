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
  levels:[],
  savingBasket: false,
  savingBasketSuccess: false,
  savingBasketError: false

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
    },

    saveBasketRequest(state) {
      state.savingBasket=true
      state.savingBasketSuccess=false
      state.savingBasketError=false

    },
    saveBasketFailure(state, action) {
      state.savingBasket=false
      state.savingBasketError= action.payload.error


    },
    saveBasketSuccess(state, action) {
      state.savingBasket = false
      state.savingBasketSuccess = true
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
  removeFromBasket,
  saveBasketFailure,
  saveBasketRequest,
  saveBasketSuccess
} = assessmentSlice.actions


function saveBasketThunk({assessment,id}){

  return function (dispatch) {
    dispatch(saveBasketRequest())
    db.collection("assessments").doc(id).set({assessment})
  .then(function() {
    dispatch(saveBasketSuccess())
      console.log("Document successfully written!");
  })
  .catch(function(error) {
    dispatch(saveBasketFailure({error}))
      console.error("Error writing document: ", error);
  });
  }
}

export {saveBasketThunk}

export default assessmentSlice.reducer
