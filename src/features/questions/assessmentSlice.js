import { createSlice } from 'redux-starter-kit'
import { db } from '../../firebase/firebase'
import { math } from 'tinycas/build/math/math'

function prepareQuestions(state) {
  const questions= state.questions
  if (state.monoAssessment) {
    console.log('monoAssessment')
    for (let i=0 ; i< state.nbQuestions-1; i++) {
      questions.push(state.questions[0])
    }
  }
  return questions.map(question => {
    const { text, ...rest } = question
    return {
      text: math(text).generate().string,
      ...rest,
    }
  })
}
const initialState = {
  questions: [],
  generatedQuestions: [],
  nbQuestions:10,
  defaultDelay:3000,
  fetchError: false,
  fetching: false,
  fetched: false,
  isReady: false,
  isSelected:false,
  finished: false,
  monoAssessment:1,
  mixedAssessment:1,
  categories:[],
  isFetchingCategories:false,
  category:'',
  subcategory:''

}

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState: initialState,
  reducers: {
    fetchCategoriesRequest(state) {
      state.isFetchingCategories = true
      state.categories=[]
    },
    fetchCategoriesSuccess(state, action) {
      state.isFetchingCategories = false
      state.categories = action.payload.categories
    },
    fetchCategoriesFailure(state, action) {
      state.fetchError = action.payload.error
      state.isFetchingCategories = false
    },
    setCategory(state,action) {
      state.category = action.payload.category
      state.subcategory = action.payload.subcategory
    },

    fetchQuestionsRequest(state, action) {
      state.fetching = true
      state.fetched = false
      state.finished = false
      state.questions = []
      state.generatedQuestions = []
    },
    fetchQuestionsSuccess(state, action) {
      state.questions = state.questions.concat(action.payload.questions)
      state.generatedQuestions = prepareQuestions(state)
      state.fetching = false
      state.fetched = true
      state.isReady = true
    },
    fetchQuestionsFailure(state, action) {
      state.fetching = false
      state.fetchError = action.payload.error
    },
    assessmentFinished(state) {
      state.finished = true
    },
    selectAssessment(state,action) {
      state.nbQuestions=action.payload.nbQuestions
      state.defaultDelay=action.payload.defaultDelay
      state.monoAssessment=action.payload.monoAssessment
      state.mixedAssessment=action.payload.assessmentId
      state.isSelected = true
    },
  },
})

export const {
  fetchQuestionsRequest,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  fetchCategoriesRequest,
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
  assessmentFinished,
  selectAssessment,
  setCategory
} = assessmentSlice.actions




function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesRequest())
    const categories = []
    db.collection("categories").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          const category = {
            label: doc.data().label,
            subcategories: doc.data().subcategories
          }
          categories.push(category)
      })
      console.log(categories)
      dispatch(fetchCategoriesSuccess({categories}))
      
    })
    
    .catch(function(error) {
      dispatch(fetchQuestionsFailure({ error }))
    })
    
    
  }
}

function fetchQuestions({ type, params }) {
  return dispatch => {
    dispatch(fetchQuestionsRequest())

    let docRef
    let questions = []
    // monoAssessment
    console.log(params.category)
    console.log(params.subcategory)
    docRef = db.collection('questions').where("category",'==',params.category).where('subcategory','==',params.subcategory)
    

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const question = doc.data()
         questions.push(question)
          dispatch(fetchQuestionsSuccess({ questions }))
        } else {
          // doc.data() will be undefined in this case

          dispatch(fetchQuestionsFailure({ error: 'No such document!' }))
        }
      })
      .catch(function(error) {
        dispatch(fetchQuestionsFailure({ error }))
      })
  }
}

export { fetchQuestions, fetchCategories }
export default assessmentSlice.reducer
