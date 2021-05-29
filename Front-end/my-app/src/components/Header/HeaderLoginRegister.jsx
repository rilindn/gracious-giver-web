import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { FaUser } from 'react-icons/fa'
import { BsChatFill,BsSearch } from 'react-icons/bs'
import { MdAddCircleOutline } from 'react-icons/md'

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
