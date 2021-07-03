import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Member = ({user,onDelete,i}) => {

    const [userDetails,setUserDetails] = useState([]);

    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails = () => {
        try{
            axios.get('http://localhost:5000/api/user/'+ user.UserId)
            .then((res)=>{
                setUserDetails(res.data)
            })
        }
        catch(e){
            console.log(e)
        }
    }

    const handleAcceptRequest  = async (RId) => {
      var date = new Date().toLocaleString()
      try{
        await axios.post(`http://localhost:5000/api/ProductRequestResponse/`,{
         RequestId: RId.RequestId,
         Message: RId.Message,
         Response: "Accepted",
         Response_Date: date,
         DonatorId: loggedInUser.UserId,
         ReceiverId: RId.UserId
        }) 
        .then(()=>{
          axios.put('http://localhost:5000/api/Product_Request/'+RId.RequestId, {
              RequestId: RId.RequestId,
              UserId: RId.UserId,
              ProductId: RId.ProductId,
              Message: RId.Message,
              Request_Date: RId.Request_Date,
              checkedR : true
            })
        })
        .then(()=>{
          axios.post('http://localhost:5000/api/notification', {
              Initiator: loggedInUser.UserId,
              Acceptor: RId.UserId,
              Content: "Your request for "+productName+ " has been accepted by "
              +loggedInUser.Firstname+" "+loggedInUser.Lastname,
              Date: date,
              Readed : false
            })
        })
        .then(()=>{
          onUpdate();
        })
        .then((res) => {
          NotificationManager.success(
          'Request has been accepted!',
          '',
          1000,
          )},
          )
      }
      catch(e){
          console.log(e);
          }
      }

      const handleDeclineRequest  = async (RId) => {
          var date = new Date().toLocaleString()
          try{
            console.log("prod res")
            await axios.post(`http://localhost:5000/api/ProductRequestResponse`,{
              RequestId: RId.RequestId,
              Message: RId.Message,
              Response: "Declined",
              Response_Date: date,
              DonatorId: loggedInUser.UserId,
              ReceierId: RId.UserId
              }) 
              .then(()=>{
                axios.put('http://localhost:5000/api/Product_Request/'+RId.RequestId, {
                    RequestId: RId.RequestId,
                    UserId: RId.UserId,
                    ProductId: RId.ProductId,
                    Message: RId.Message,
                    Request_Date: RId.Request_Date,
                    checkedR : true
                  })
              })
              .then(()=>{
                axios.post('http://localhost:5000/api/notification', {
                    Initiator: loggedInUser.UserId,
                    Acceptor: RId.UserId,
                    Content: "Your request for "+productName+ " has been declined by "
                    +loggedInUser.Firstname+" "+loggedInUser.Lastname,
                    Date: date,
                    Readed : false
                  })
              })
            .then(()=>{
              onUpdate();
            })
            .then((res) => {
              NotificationManager.success(
              'Request has been declined!',
              '',
              1000,
              )},
              )
          }
          catch(e){
              console.log(e);
              }
          }

    return (
                  <tr key={user.UserId}>
                    <td>#{++i}</td>
                    {console.log(userDetails)}
                    <td>{userDetails.Firstname} {userDetails.Lastname}</td>
                    <td>{userDetails.UserName}</td>
                    <td>{userDetails.UserRole}</td>
                    <td>{user.DateOfJoining.substring(0,10)}</td>
                    <td>
                      <Button
                        onClick={()=>{onDelete()}}
                        className="delete"
                        variant="danger"
                        data-toggle="modal"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                        >
                          &#xE872;
                        </i>
                      </Button>
                    </td>
                  </tr>
    )
}

export default Member
