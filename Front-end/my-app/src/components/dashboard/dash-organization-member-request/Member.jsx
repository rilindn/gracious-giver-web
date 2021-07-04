import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const Member = ({user,i, loggedInUser, onUpdate}) => {

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

    const handleAcceptRequest  = async () => {
      var date = new Date().toLocaleString()
      try{
        await axios.post(`http://localhost:5000/api/OrganizationMember/`,{
          DateOfJoining: date,
          OrganizationId: user.OrganizationId,
          UserId:user.UserId
        }) 
        .then(()=>{
          axios.put('http://localhost:5000/api/OrganizationMemberRequest/'+user.OrganizationMemberRequestId, {
            OrganizationMemberRequestId:user.OrganizationMemberRequestId,
            DateOfJoining: date,
            OrganizationId: user.OrganizationId,
            UserId:user.UserId,
            Checked : true
            })
        })
        .then(()=>{
          axios.post('http://localhost:5000/api/notification', {
              Initiator: user.OrgnizationId,
              Acceptor: user.UserId,
              Content: "Your request for  has been accepted by ",
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

      const handleDeclineRequest  = async () => {
          var date = new Date().toLocaleString()
          try{
            console.log("prod res")
            await axios.post(`http://localhost:5000/api/OrganizationMember`,{
              DateOfJoining: date,
              OrganizationId: user.OrganizationId,
              UserId:loggedInUser.UserId
              }) 
              .then(()=>{
                axios.put('http://localhost:5000/api/OrganizationMemberRequest/'+user.OrganizationMemberRequestId, {
                  OrganizationMemberRequestId:user.OrganizationMemberRequestId,
                  DateOfJoining: date,
                  OrganizationId: user.OrganizationId,
                  UserId:loggedInUser.UserId,
                  Checked : true
                  })
              })
              // .then(()=>{
              //   axios.post('http://localhost:5000/api/notification', {
              //       // Initiator: loggedInUser.UserId,
              //       // Acceptor: RId.UserId,
              //       // Content: "Your request for "+productName+ " has been declined by "
              //       // +loggedInUser.Firstname+" "+loggedInUser.Lastname,
              //       // Date: date,
              //       // Readed : false
              //     })
              // })
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
                    {console.log(user)}
                    <td>{userDetails.Firstname} {userDetails.Lastname}</td>
                    <td>{userDetails.UserName}</td>
                    <td>{userDetails.UserRole}</td>
                    <td>{user.DateOfJoining.substring(0,10)}</td>
                    <td >
                       <div>
                      <Button
                        onClick={()=>{handleAcceptRequest()}}
                        variant="success"
                      >
                        Accept
                      </Button>
                      <Button
                      className="position"
                        onClick={()=>{handleDeclineRequest()}}
                        variant="danger"
                      >
                        Decline
                      </Button>
                      </div>
                    </td>
                  </tr>
    )
}

export default Member