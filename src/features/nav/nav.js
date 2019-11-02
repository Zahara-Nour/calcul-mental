import React from 'react'
import Navbar from 'react-bulma-components/lib/components/navbar'
import Button from 'react-bulma-components/lib/components/button'
import { connect } from 'react-redux'
import { logout } from '../auth/authSlice'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Icon from 'react-bulma-components/lib/components/icon'
import { faInfinity } from '@fortawesome/free-solid-svg-icons'

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.connected,
    user:state.auth.user
  }
}

function Nav({ isAuthenticated,user, dispatch }) {
  const handleLogout = () => {
    dispatch(logout())
  }
  

  return (
    
    <Navbar fixed="top" >
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <Icon>
            <FontAwesomeIcon icon={faInfinity} />
          </Icon>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="http://navadra.lejolly.me>">Navadra</Navbar.Item>
          <Navbar.Item href="/calculmental">Calcul mental</Navbar.Item>
        </Navbar.Container>
        {isAuthenticated && (<Navbar.Container position="end">
        <Navbar.Item active={false} hoverable={false}><strong>{user}</strong></Navbar.Item>
        {/* <p><Heading size={5} renderAs="p">{user}</Heading></p> */}
        </Navbar.Container>)}
        <Navbar.Container position="end">
          {isAuthenticated ? (
            <Button onClick={handleLogout} color="primary" style={{marginTop:"auto", marginBottom:"auto"}}>
              Logout
            </Button>
          ) : (
            <Button renderAs="a" href="/login" color="danger">
              Login
            </Button>
          )}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
    
  )
}

export default connect(mapStateToProps)(Nav)
