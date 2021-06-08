import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

function Header() {
  return (
    <div className="header" id="headerloginregister">
      <Navbar bg="#3C6E71"  >
        <Navbar.Brand id="logo" href="/home"></Navbar.Brand>

        <Navbar.Brand href="/home" id="title">
          Gracious{' '}
        </Navbar.Brand>
        <Navbar.Brand href="/home" id="title1">
          Giver{' '}
        </Navbar.Brand>
       
      </Navbar>
    </div>
  )
}

export default Header
