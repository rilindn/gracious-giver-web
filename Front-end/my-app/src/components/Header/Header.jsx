import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { FaUser } from 'react-icons/fa'
import { BsChatFill, BsSearch } from 'react-icons/bs'
import { MdAddCircleOutline } from 'react-icons/md'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import axios from 'axios'
import { useEffect } from 'react'
import { List } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const Header = ({ search }) => {
  const [loggedInUser, setLoggedInUser] = useState([])
  const [notifications, setNotifications] = useState([])
  const [r, setR] = useState(false)
  let history = useHistory()

  const handleLogout = async (event) => {
    const posReq = axios.create({
      withCredentials: true,
    })
    await posReq.post('http://localhost:5000/api/logout').then(
      (res) => {
        history.push('/')
        NotificationManager.success('You have been logged out!', '', 2000)
      },
      (error) => {
        NotificationManager.error('Problems while logging out!', '', 500)
        console.log(error)
      },
    )
  }

  useEffect(() => {
    ;(async () => {
      await axios
        .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
        .then((res) => {
          setLoggedInUser(res.data)
          getNotifications(res.data.UserId);
        })
    })()
  }, [r])

  const getNotifications = (id) =>{
    try{
       axios.get('http://localhost:5000/api/notification/acceptor/' + id)
        .then((res) => {
          setNotifications(res.data)
        })
    }catch(e){
      console.log(e)
    }
  }

  const readNotification = (notification) =>{
    try{
      axios.put('http://localhost:5000/api/notification/' + notification.NotificationId,{
        NotificationId:notification.NotificationId,
        Initiator:notification.Initiator,
        Acceptor:notification.Acceptor,
        Content:notification.Content,
        Date:notification.Date,
        Readed:true
      })
      .then(()=>{
        setR(!r);
      })
   }catch(e){
     console.log(e)
   }
  }

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
          <Form inline className="searchpost" >
            {loggedInUser.UserRole==="Donator" || loggedInUser.UserRole==="Receiver"?
          <Nav.Link id="post" href={`${loggedInUser.UserRole==="Donator"?"/postProd":loggedInUser.UserRole==="Receiver"?"/RequestForm":""}`}>
                <span className="mt-2" style={{fontSize:"19px",marginTop:"10px"}}>   
                <MdAddCircleOutline id="icon" color="white" size="23px" style={{marginRight:"3px"}}/>Post</span>
              </Nav.Link>
            :null}
              <div className="mr-sm-2 header-search "style={{width:"320px"}}>
              {search?
              <div>
              <FormControl
                type="text"
                id="textbox"
                placeholder="Search"
                className="mr-sm-2"
                style={{width:"240px"}}
              />
              <BsSearch className="header-search-icon"/>
              </div>
              :null}
              </div>
            </Form>

            {loggedInUser.length === 0 ? null : (
              <Nav className="dropdownmenu">
                <DropdownButton
                  id="hell"
                  menuAlign={{ lg: 'right' }}
                  title={<BsChatFill id="chatt" color="white" size="25px" />}
                  variant="transparent"
                >
                  <Dropdown.Item
                    style={{
                      textAlign: 'center',
                      width: '350px',
                      fontWeight: 'bold',
                      color: '#26543b',
                    }}
                  > {notifications.length===0?"No message":
                  notifications.map(notification=>(
                    <div className="msg-header">
                      <div className="d-inline d-flex">
                        <span className="msg-header-read"
                        onClick={()=>{readNotification(notification)}}
                        >{notification.Readed===false?"Read":"Readed"}</span>
                        <span className="msg-header-time">
                          {notification.Date.substring(0,10)} <b>at</b> {notification.Date.substring(11,16)}
                          </span>
                        </div>
                      <h6>{notification.Content}</h6>
                    </div>
                  ))
                    }
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item
                    href="/chat"
                    id="mess"
                    style={{
                      textAlign: 'center',
                      width: '350px',
                      color: '#3c6e71',
                      fontSize: '14px',
                    }}
                  >
                    Open Message Page
                  </Dropdown.Item>
                </DropdownButton>

                <DropdownButton
                  menuAlign={{ lg: 'right' }}
                  title={<FaUser id="user" color="white" size="25px" />}
                  id="dropdown-menu-align-right hell2"
                  variant="transparent"
                  style={{ marginLeft: '50px' }}
                >
                  <List.Item
                    style={{
                      marginTop: '10px',
                      marginLeft: '23px',
                      fontSize: '16px',
                      textDecoration: 'underline',
                      color: '#ed1858',
                      height: '30px',
                    }}
                  >
                    Your Account
                  </List.Item>
                  {loggedInUser.OrganizationId!==undefined?null:
                  <div>
                  <Dropdown.Item eventKey="1">Posts</Dropdown.Item>
                  <Dropdown.Item href="/bookmark " eventKey="2">
                    Bookmark
                  </Dropdown.Item>
                  </div>
                  }
                  
                  <Dropdown.Item href="/dashboard" eventKey="3">
                    Dashboard
                  </Dropdown.Item>
                  {loggedInUser.OrganizationId===undefined?
                  <Dropdown.Item href="/settings" eventKey="3">
                    Settings
                  </Dropdown.Item>:
                  <Dropdown.Item href="/OrgSettings" eventKey="3">
                    Settings
                  </Dropdown.Item>}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    href="/login"
                    style={{ fontWeight: 'bold', color: '#3c6e71' }}
                    onClick={handleLogout}
                    eventKey="4"
                  >
                    Log out {loggedInUser.UserName || loggedInUser.Username}
                  </Dropdown.Item>
                </DropdownButton>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
