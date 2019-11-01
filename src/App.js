import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import './App.css'

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.connected,
    isVerifying: state.auth.verifying,
  }
}

function App({ isAuthenticated, isVerifying }) {
  // KLUDGE : bug with Route /login
  const connected = isAuthenticated
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/* <Route path="/" component={Home} /> */}
      <Route
        path="/login"
        render={props => <Login {...props} connected={connected} toto />}
      />
    </Switch>
  )
}


export default connect(mapStateToProps)(App)
