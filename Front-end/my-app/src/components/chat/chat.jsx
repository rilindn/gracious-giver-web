import React  from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { Footer } from '../footer/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ChatHistory from './ChatHistory';
import maleUser from '../../images/maleUser.png'
import femaleUser from '../../images/femaleUser.png'

const Chat = () => {

  const [myUsersChat,setMyUsersChat] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([])
  const [chatUser, setChatUser] = useState([])

  useEffect(() => {
    ;(async () => {
      await axios
        .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
        .then((res) => {
          setLoggedInUser(res.data)
          getMyUsersChat(res.data.UserId)
        })
    })()
  }, [])

  const getMyUsersChat = async (UserId) =>{
    try{
      await axios.get('http://localhost:5000/api/chat/acceptor/'+UserId )
      .then((res)=>{
        setMyUsersChat(res.data)
        setChatUser(res.data[0])
      })
    }
    catch(e){
      console.log(e)
    }
  }

  const ChatUser = ({user}) => {

    const [userDetails, setUserDetails] = useState([])
    const chatSA = user.SenderId===loggedInUser.UserId?user.AcceptorId:user.SenderId 
  
    useEffect(() => {
      ;(async () => {
        await axios
          .get('http://localhost:5000/api/user/'+chatSA )
          .then((res) => {
              setUserDetails(res.data)
          })
      })()
    }, [user,chatSA])

  
      return (
          <li className="clearfix" key={user.ChatId} 
          onClick={()=>{
            do{
            setChatUser(user)
            }
            while(chatUser.length===0)
            }}>
            <img src={userDetails.UserGender==="F"?femaleUser:maleUser} alt="avatar" />
            <div className="about">
              <div className="name text-left">{userDetails.Firstname} {userDetails.Lastname}</div>
              <div className="status"> <i className="fa fa-circle offline" />
               left 7 mins ago 
               </div>                                            
            </div>
          </li>
      )
  }

  
      return (
          
        <div className="chat">
             <Header  />
           
           <Sidebar />
         
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
          <div className="container">
            <div className="row clearfix">
              <div className="col">
                <div className="card chat-app">
                  <div id="plist" className="people-list">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-search" /></span>
                      </div>
                      <input type="text" className="form-control" placeholder="Search..." />
                    </div>
                    <ul className="list-unstyled chat-list mt-2 mb-0">
                    {myUsersChat.map(user=>(
                        <ChatUser
                        user={user}
                        />
                      ))}
                    </ul>
                  </div>
                  
                  <ChatHistory
                  loggedInUser={loggedInUser}
                  user={chatUser}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    export default Chat