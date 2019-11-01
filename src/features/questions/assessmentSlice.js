import { createSlice } from 'redux-starter-kit'
import { db } from '../../firebase/firebase'
import { math } from 'tinycas/build/math/math'

const initialState = {
  questions: [],
  generatedQuestions: [],
  fetchError: false,
  fetching: false,
  fetched: false,
  ready: false,
  finished: false,
}

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState: initialState,
  reducers: {
    fetchQuestionsRequest(state, action) {
      state.fetching = true
      state.fetched = false
      state.finished = false
      state.questions = []
      state.generatedQuestions = []
    },
    fetchQuestionsSuccess(state, action) {
      state.questions = state.questions.concat(action.payload.questions)
      state.generatedQuestions = state.questions.map(question => {
        const { text, ...rest } = question
        return {
          text: math(text).generate().string,
          ...rest,
        }
      })
      state.fetching = false
      state.fetched = true
      state.ready = true
    },
    fetchQuestionsFailure(state, action) {
      state.fetching = false
      state.fetchError = action.payload.error
    },
    assessmentFinished(state) {
      state.finished = true
      state.ready = false
    },
  },
})

export const {
  fetchQuestionsRequest,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  assessmentFinished,
} = assessmentSlice.actions

function fetchQuestions({ type, id }) {
  return dispatch => {
    dispatch(fetchQuestionsRequest())

    let docRef
    let questions = []
    if (type === 'mono') {
      docRef = db.collection('questions').doc('1')
    }

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const question = doc.data()
          for (let i = 0; i < 3; i++) questions.push(question)
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

export { fetchQuestions }
export default assessmentSlice.reducer
