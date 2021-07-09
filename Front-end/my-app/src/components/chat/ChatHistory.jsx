/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import React, { useState,useEffect, useRef} from "react"
import maleUser from '../../images/maleUser.png'
import femaleUser from '../../images/femaleUser.png'
import Moment from 'react-moment';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';

const ChatHistory = ({loggedInUser,user}) =>{

    
  const [chatMessages, setChatMessages] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const messagesEndRef = useRef(null)
  const chatSA = user.SenderId===loggedInUser.UserId?user.AcceptorId:user.SenderId 
  const scrollToBottom = useScrollToBottom();

    const getMessages =  () =>{
      try{
         axios.get('http://localhost:5000/api/ChatMsg/acceptor/'+ loggedInUser.UserId+"/"+chatSA)
        .then((res)=>{
          setChatMessages(res.data)
          console.log("res.data")
          console.log(res.data)
        })
      }
      catch(e){
        console.log(e)
      }
    }

    useEffect(() => {
      ;( () => {
         axios.get('http://localhost:5000/api/user/'+chatSA)
          .then((res) => {
              setUserDetails(res.data)
          })
      })()
      getMessages();
      scrollToBottom();
      const interval = setInterval(() => {
        getMessages();}, 5000);
      return () => clearInterval(interval);
    }, [user,chatSA])


    const newMessage = async (event) => {
        event.preventDefault();
        var date = new Date().toLocaleString()
        try{
            axios.post('http://localhost:5000/api/ChatMsg',{
                AcceptorId:chatSA,
                SenderId:loggedInUser.UserId,
                Message:event.target.Message.value,
                msgDateTime: date,
                Chat:user.ChatId
            })
            .then(()=>{
                event.target.Message.value=''
                getMessages();
            })
        }catch(e){
            console.log(e)
        }
    }

    return(
  
  <div className="chat">
  <div className="chat-header clearfix">
    <div className="row">
      <div className="col-lg-6">
        <a href="/" data-toggle="modal" data-target="#view_info">
          <img 
          src={userDetails.UserGender==="F"?femaleUser:maleUser}
          alt="avatar" />
        </a>
        <div className="chat-about">
          <h6 className="mt-1">{userDetails.Firstname} {userDetails.Lastname}</h6>
        </div>
      </div>
      <div className="col-lg-6 hidden-sm text-right">
        <a href="///" className="btn btn-outline-primary"><i className="fa fa-image" /></a>
        <a href="//" className="btn btn-outline-info"><i className="fa fa-cogs" /></a>
        <a href="//" className="btn btn-outline-warning"><i className="fa fa-question" /></a>
      </div>
    </div>
  </div>
  <ScrollToBottom className="chat-history p-0" >
  <ul className="m-b-0" ref={messagesEndRef}>
    {chatMessages.map(message=>(
    message.SenderId!==loggedInUser.UserId?
    <li className="clearfix  text-right mr-2">
       <div className="message-data">
         <span className="message-data-time mr-1">
             <Moment fromNow>
             {message.msgDateTime}
             </Moment>
             </span>
         <img src={userDetails.UserGender==="F"?femaleUser:maleUser} alt="avatar" />
       </div>
       <div className="message other-message"> {message.Message} </div>
     </li>
     :
    <li className="clearfix text-left ml-3">
      <div className="message-data">
        <span className="message-data-time ml-1">
            <Moment fromNow>
             {message.msgDateTime}
             </Moment></span>
      </div>
      <div className="message my-message">{message.Message}</div>                                    
    </li>   
    ))}
  </ul>
  </ScrollToBottom>
  <form className="chat-message clearfix" onSubmit={newMessage}>
    <div className="input-group mb-0">
      <div className="input-group-prepend">
        <button type="submit" className="btn btn-outline-primary"><i className="fa fa-send" /></button>
      </div>
      <input autoComplete="off" type="text" name="Message" className="form-control" placeholder="Enter your message here..." />                                    
    </div>
  </form>
</div>
    )
  }

export default ChatHistory