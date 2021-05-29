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
    <div className="header">
      <Navbar bg="#3C6E71">
        <Navbar.Brand id="logo" href="/home"></Navbar.Brand>

        <Navbar.Brand href="/home" id="title">
          Gracious{' '}
        </Navbar.Brand>
        <Navbar.Brand href="/home" id="title1">
          Giver{' '}
        </Navbar.Brand>
        <Navbar.Collapse id="">
          <Nav className="">
            <Form inline className="searchpost">
              <Nav.Link id="post" href="/postProd">
                <span className="mt-2" style={{fontSize:"19px",marginTop:"10px"}}>
                <MdAddCircleOutline id="icon" color="white" size="23px" style={{marginRight:"3px"}}/>Post</span>
              </Nav.Link>
              <div className="mr-sm-2 header-search">
              <FormControl
                type="text"
                id="textbox"
                placeholder="Search"
                className="mr-sm-2"
                style={{width:"240px"}}
              />
              <BsSearch className="header-search-icon"/>
              </div>
            </Form>
            <Nav className="dropdownmenu">
              <BsChatFill id="chat" color="white" size="25px" />

              <FaUser id="user" color="white" size="25px" />
              <NavDropdown id="basic-nav-dropdown">
                <NavDropdown.Item href="">Posts</NavDropdown.Item>
                <NavDropdown.Item href="">Bookmark</NavDropdown.Item>
                <NavDropdown.Item href="">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
