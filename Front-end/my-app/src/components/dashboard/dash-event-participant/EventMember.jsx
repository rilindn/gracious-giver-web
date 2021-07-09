/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const EventMember = ({user,onDelete,i}) => {

    const [userDetails,setUserDetails] = useState([]);

    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails = () => {
        try{
            axios.get('http://localhost:5000/api/user/'+ user.ParticipantId)
            .then((res)=>{
                setUserDetails(res.data)
            })
        }
        catch(e){
            console.log(e)
        }
    }

    return (
                  <tr key={user.UserId}>
                    <td>#{++i}</td>
                    {console.log(userDetails)}
                    <td>{user.EventId}</td>
                    <td>{userDetails.Firstname} {userDetails.Lastname}</td>
                    <td>{userDetails.UserName}</td>
                    <td>{userDetails.UserRole}</td>
                    {/* <td>{user.DateOfJoining.substring(0,10)}</td> */}
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

export default EventMember
