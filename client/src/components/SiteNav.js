import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import { HashLink } from 'react-router-hash-link';

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import { userIsAuthenticated } from '../environment/Auth'
import logo from '../images/logo-clear.png'

const SiteNav = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('the-circle-token')
    window.localStorage.removeItem('the-circle-userId')
    navigate('/')
  }

  const getUserId = () => {
    const userId = window.localStorage.getItem('the-circle-userId')
    navigate(`/users/${userId}`)
  }

  return (
    <Navbar expand='sm' className='w-100 navbar-dark'>
      <Container>
        <Navbar.Brand href='/'><img src={logo} alt='Logo' /></Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse className='justify-content-end'>
          <Nav.Item>
            {/* <HashLink smooth to={'/#search'}>
            Search
            </HashLink> */}
          </Nav.Item>
          <Link to='/Games' className='nav-link'>Games</Link>
          <Link to='/Characters' className='nav-link'>Characters</Link>
          <Link to='/Users' className='nav-link'>Users</Link>
          {userIsAuthenticated() ?
            <>
              <Nav.Item>
                <Button className='btn-dark btn' onClick={getUserId}>Profile</Button>
                {/* <Link to={getUserId}>Profile</Link> */}
              </Nav.Item>
              <Nav.Item>
              <Button className='btn-dark btn' onClick={handleLogout}>Logout</Button>
              </Nav.Item>
            </>
            :
            <>
              <Nav.Item>
                <Link className='btn-dark btn' to='/Login'>Login</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className='btn-dark btn' to='/Register'>Register</Link>
              </Nav.Item>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SiteNav