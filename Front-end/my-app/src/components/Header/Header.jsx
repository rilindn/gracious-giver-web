import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { FaUser } from 'react-icons/fa'
import { BsChatFill,BsSearch } from 'react-icons/bs'
import { MdAddCircleOutline } from 'react-icons/md'
import { Dropdown, DropdownButton, SplitButton } from 'react-bootstrap'

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
            <DropdownButton
                menuAlign={{ lg: 'right' }}
                title={<FaUser id="user" color="white" size="25px" />}
                id="dropdown-menu-align-right"
                variant="transparent"
              >
                <Dropdown.Item eventKey="1">Posts</Dropdown.Item> 
                <Dropdown.Item eventKey="2">Bookmark</Dropdown.Item>
                <Dropdown.Item href="/dashboard" eventKey="3">Dashboard</Dropdown.Item>
                <Dropdown.Item eventKey="3">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/login" eventKey="4">Log out</Dropdown.Item>
              </DropdownButton>
              </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
