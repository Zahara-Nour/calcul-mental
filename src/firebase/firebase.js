import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA7Jd6jfOcJqH2YCJ-K395KnJmIrNayeSs',
  authDomain: 'calcul-mental-cb394.firebaseapp.com',
  databaseURL: 'https://calcul-mental-cb394.firebaseio.com',
  projectId: 'calcul-mental-cb394',
  storageBucket: 'calcul-mental-cb394.appspot.com',
  messagingSenderId: '320149129208',
  appId: '1:320149129208:web:ecf67cc665ab52e316f80d',
}

// Initialize Firebase
const myFirebase = firebase.initializeApp(firebaseConfig)
const db = myFirebase.firestore()
const auth = myFirebase.auth
// const provider = new firebase.auth.GoogleAuthProvider()
// provider.setCustomParameters({
//   login_hint: 'user@voltairedoha.com',
// })
export { db, auth }
export default myFirebase
