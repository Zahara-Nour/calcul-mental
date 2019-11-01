import { combineReducers } from 'redux'
import authReducer from '../features/auth/authSlice'
import questionsReducer from '../features/questions/assessmentSlice'

export default combineReducers({
  auth: authReducer,
  assessment: questionsReducer
})
