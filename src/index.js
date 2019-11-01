import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { configureStore } from 'redux-starter-kit'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { verifyAuth } from './features/auth/authSlice'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
  reducer: rootReducer,
})
store.dispatch(verifyAuth())


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
