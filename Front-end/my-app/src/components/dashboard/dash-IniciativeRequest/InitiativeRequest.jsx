/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const InitiativeRequest = ({request,i, loggedInUser, onUpdate}) => {

    const [userDetails,setUserDetails] = useState([]);
    const [organizationDetails,setOrganizationDetails] = useState([]);

    useEffect(()=>{
        getUserDetails();
        getOrganizationDetails();
    },[])

    const getUserDetails = () => {
        try{
            axios.get('http://localhost:5000/api/user/'+ request.ReceiverId)
            .then((res)=>{
                setUserDetails(res.data)
            })
        }
        catch(e){
            console.log(e)
        }
    }
    const getOrganizationDetails = () => {
        try{
            axios.get('http://localhost:5000/api/Organization/'+ request.OrganizationId)
            .then((res)=>{
              setOrganizationDetails(res.data)
            })
        }
        catch(e){
            console.log(e)
        }
    }

    const handleAcceptRequest  = async () => {
      var date = new Date().toLocaleString()
      try{
        await axios.post(`http://localhost:5000/api/Iniciative/`,{
        IniciativeName: request.IniciativeName,
          IniciativeDescription: request.IniciativeDescription,
          IniciativeDate: request.IniciativeDate,
          IniciativePhoto:request.IniciativePhoto,
          OrganizationId: request.OrganizationId,
          ReceiverId: request.ReceiverId
        }) 
        .then(()=>{
          axios.put('http://localhost:5000/api/InitiativeRequest/'+request.IniciativeRequestId, {
            IniciativeRequestId:request.IniciativeRequestId,
            IniciativeName: request.IniciativeName,
            IniciativeDescription: request.IniciativeDescription,
            IniciativeDate: request.IniciativeDate,
            IniciativePhoto:request.IniciativePhoto,
            OrganizationId: request.OrganizationId,
            ReceiverId: request.ReceiverId,
            Checked : true
            })
        })
        .then(()=>{
          axios.post('http://localhost:5000/api/notification', {
              Initiator: request.OrganizationId,
              Acceptor: request.ReceiverId,
              Content: "Your initiative request for has been accepted by " + organizationDetails.Name,
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
              axios.put('http://localhost:5000/api/InitiativeRequest/'+request.IniciativeRequestId, {
                IniciativeRequestId:request.IniciativeRequestId,
                IniciativeName: request.IniciativeName,
                IniciativeDescription: request.IniciativeDescription,
                IniciativeDate: request.IniciativeDate,
                IniciativePhoto:request.IniciativePhoto,
                OrganizationId: request.OrganizationId,
                ReceiverId: request.ReceiverId,
                Checked : true
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
                  <tr key={request.IniciativeRequestId}>
                    <td>#{++i}</td>
                    <td>{request.IniciativeName}</td>
                    <td>{request.IniciativeDescription}</td>
                    <td>{userDetails.Firstname} {userDetails.Lastname}</td>
                    <td>{organizationDetails.Name}</td>
                    <td>{request.IniciativeDate.substring(0,10)}</td>
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

export default InitiativeRequest