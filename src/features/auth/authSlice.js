import { createSlice } from 'redux-starter-kit'
import firebase from '../../firebase/firebase'

const initialState = {
  connecting: false,
  disconnecting: false,
  connected: false,
  user: null,
  loginError: null,
  logoutError: null,
  verifying: false,
  verifyingError: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginRequest(state) {
      state.connecting = true
      state.loginError = null
    },
    loginSuccess(state, action) {
      state.connecting = false
      state.connected = true
      state.user = action.payload.user
    },
    loginFailure(state, action) {
      state.connecting = false
      state.loginError = action.payload.error
    },
    logoutRequest(state) {
      state.disconnecting = true
      state.logoutError = null
    },
    logoutSuccess(state) {
      state.disconnecting = false
      state.connected = false
      state.user = null
    },
    logoutFailure(state, action) {
      state.disconnecting = false
      state.logoutError = action.payload.error
    },
    verifyAuthRequest(state) {
      state.verifying = true
    },
    verifyAuthSuccess(state) {
      state.verifying = false
    },
  },
})

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  verifyAuthRequest,
  verifyAuthSuccess,
} = authSlice.actions

export function loginWithEmail(email, password) {
  return dispatch => {
    // Google Signin
    dispatch(loginRequest())
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        dispatch(loginSuccess({ user: result.user.email }))
      })
      .catch(error => {
        console.log(error.message)
        dispatch(loginFailure({ error: error.message }))
      })
  }
}

export function logout() {
  return dispatch => {
    // Google Signin
    dispatch(logoutRequest())

    firebase
      .auth()
      .signOut()
      .then(user => {
        console.log('logout réussi')
        dispatch(logoutSuccess({ user }))
      })
      .catch(error => {
        dispatch(logoutFailure({ error: error.message }))
      })
  }
}

export function verifyAuth() {
  return dispatch => {
    dispatch(verifyAuthRequest())
    const user = localStorage.getItem('myPage.expectSignIn')
    if (user) dispatch(loginSuccess({ user }))
    console.log('user')
    console.log(user)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('myPage.expectSignIn', user.email)
      } else {
        localStorage.removeItem('myPage.expectSignIn')
        // Implement logic to trigger the login dialog here or redirect to sign-in page.
        // e.g. showDialog()
      }
    })
    //  La callback va aussi être appelée quand un utilisateur se connecte ou se deconnecte
    // let init = true
    // firebase.auth().onAuthStateChanged(user => {
    //   if (init) {
    //     console.log('onChange)')
    //     console.log(user)
    //     if (user) {
    //       console.log(user.email)
    //       dispatch(loginSuccess({ user: user.email }))
    //     }
    //   } else {
    //     init = false
    //   }
    // })
    
    
    
    dispatch(verifyAuthSuccess())
  }
}

export default authSlice.reducer
