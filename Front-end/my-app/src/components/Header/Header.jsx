import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { FaUser } from 'react-icons/fa'
import { BsChatFill,BsSearch } from 'react-icons/bs'
import { MdAddCircleOutline } from 'react-icons/md'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import axios from 'axios'
import { useEffect } from 'react'
import { List } from 'semantic-ui-react'

const Header = ({}) => {
  
  const [loggedInUser, setLoggedInUser] = useState([])

  const handleLogout = async (event) => {
    const posReq = axios.create({
      withCredentials:true
    })
    await posReq.post('http://localhost:5000/api/logout')
    .then(
      (res) =>{
        alert("Succesfully logged out!")
      },
      (error) =>{
        alert(error)
      },
    )
  }

  useEffect(() => {(async () => {
      await axios
        .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
        .then((res) => {
          setLoggedInUser(res.data)
        })
    })()
  }, [])


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
              

           
            <DropdownButton id="hell" 
                menuAlign={{ lg: 'right' }}
                title={<BsChatFill id="chatt" color="white" size="25px" />}
              
                variant="transparent"
              >
                <Dropdown.Item  style={{ textAlign: "center",width:"350px",fontWeight:"bold",color:"#26543b"}} >No message</Dropdown.Item> 
             
                <Dropdown.Divider />
              
                <Dropdown.Item href="/chat" id="mess" style={{ textAlign: "center",width:"350px",color:"#3c6e71",fontSize:"14px"}}  >Open Message Page</Dropdown.Item>
                
              </DropdownButton>
           


            <DropdownButton
                menuAlign={{ lg: 'right' }}
                title={<FaUser id="user" color="white" size="25px"  />}
                id="dropdown-menu-align-right"
                id="hell2"
                variant="transparent"
              >
                
              <List.Item style={{ marginTop:"10px",marginLeft:"23px",color:"#3c6e71",fontSize:"16px",textDecoration:"underline", color:"#ed1858",height:"30px"}}>Your Account</List.Item> 
                <Dropdown.Item eventKey="1">Posts</Dropdown.Item> 
                <Dropdown.Item eventKey="2">Bookmark</Dropdown.Item>
                <Dropdown.Item href="/dashboard" eventKey="3">Dashboard</Dropdown.Item>
                <Dropdown.Item eventKey="3">Settings</Dropdown.Item>
                <Dropdown.Divider />
                {loggedInUser===null? null:
                <Dropdown.Item href="/login"style={{fontWeight:"bold" ,color:"#3c6e71"}} onClick={handleLogout} eventKey="4">Log out {loggedInUser.UserName}</Dropdown.Item>
                }
              </DropdownButton>
              </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
