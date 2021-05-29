
import React from 'react';
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import {BsChatFill} from "react-icons/bs";
import {MdAddCircleOutline} from "react-icons/md";

import './Header.css';


function Header() {
  return (
     
      <div className="header">
<Navbar bg="#3C6E71">
    
  <Navbar.Brand id="logo" href=""></Navbar.Brand>
 
  
  <Navbar.Brand href="" id="title">Gracious </Navbar.Brand>
  <Navbar.Brand href="" id="title1">Giver </Navbar.Brand>
 
  <Navbar.Collapse id="">
    <Nav className="">
      
      <Form inline className="searchpost">
      <Nav.Link id="post" href=""><MdAddCircleOutline  id="icon" color="white" size="17px" />Post</Nav.Link>
      <FormControl type="text" id="textbox" placeholder="Search" className="mr-sm-2" />
      
      </Form>
    <Nav className="dropdownmenu">
      <BsChatFill id="chat" color="white" size="20px"/>
      
      <FaUser id="user" color="white" size="20px"/><NavDropdown  id="basic-nav-dropdown">
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

   
  );
}

export default Header;