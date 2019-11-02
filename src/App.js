import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import CalculMental from './components/CalculMental'
import './App.css'
import Nav from './features/nav/nav'

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
    <>
      <Nav />
      <Switch>
        <ProtectedRoute
          exact
          path="/calculmental"
          component={CalculMental}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        {/* <Route path="/" component={Home} /> */}
        <Route
          path="/login"
          render={props => <Login {...props} connected={connected} toto />}
        />
        <Route
          path="/"
          component={Home}
        />
      </Switch>
    </>
  )
}

export default connect(mapStateToProps)(App)
