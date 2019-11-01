import React from 'react'
import { login, logout } from './authSlice'
import GoogleLogin from 'react-google-login'

const responseGoogle = response => {
  console.log(response)
}

const responseGoogleFailure = response => {
  console.log('Failure' + response.toString())
  console.log(response)
}

export default function Connection({ connected, dispatch }) {
  return (
    <div>
      tOTO
      {connected}
      ****
      <button
        onClick={() => {
          connected ? dispatch(logout()) : dispatch(login())
        }}
        style={{
          marginLeft: '4px',
        }}
      >
        {connected ? 'logout' : 'login'}
      </button>
      <GoogleLogin
        clientId="320149129208-09jbd12620ikf7e95v9d491l8ttsk95k.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogleFailure}
        cookiePolicy={'single_host_origin'}
        uxMode="redirect"
      />
      ,
    </div>
  )
}
