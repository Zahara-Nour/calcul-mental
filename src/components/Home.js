import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import Assessment from '../features/questions/Assessment'
import max from '../assets/img/max.svg'
// import 'react-bulma-components/dist/react-bulma-components.min.css'
import Button from 'react-bulma-components/lib/components/button'
import Box from 'react-bulma-components/lib/components/box'
import List from 'react-bulma-components/lib/components/list'
function Home({ dispatch, isLoggingOut, logoutError }) {
  const handleLogout = () => {
    dispatch(logout())
  }

  
  return (
    <div>
      <Button onClick={handleLogout} color="primary">
        Logoutn
      </Button>
      <Box>
      <List hoverable>
        <List.Item is-primary><Box>121</Box></List.Item>
        <List.Item active>1</List.Item>
        <List.Item>1</List.Item>
        <List.Item>1</List.Item>
      </List>
    </Box>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <Assessment />
      <img style={{ width: '50%' }} src={max} alt="Max" />;
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.disconnecting,
    logoutError: state.auth.logoutError,
  }
}
export default connect(mapStateToProps)(Home)
