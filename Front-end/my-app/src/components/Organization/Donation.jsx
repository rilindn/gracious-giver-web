/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Donation = ({donation,onDelete,i}) => {

    const [donatorDetails,setDonatorDetails] = useState([]);

    useEffect(()=>{
        getDonatorDetails();
    },[])

    const getDonatorDetails = () => {
        try{
            axios.get('http://localhost:5000/api/user/'+ donation.Donator)
            .then((res)=>{
                setDonatorDetails(res.data)
            })
        }
        catch(e){
            console.log(e)
        }
    }

    return (
                  <tr key={donation.Donator}>
                    <td>#{++i}</td>
                    <td>{donation.Initiative}</td>
                    <td>{donatorDetails.Firstname} {donatorDetails.Lastname}</td>
                    <td>{donatorDetails.UserName}</td>
                    <td>{donatorDetails.UserRole}</td>
                    <td>{donation.Amount} EUR</td>
                    {/* <td>{Donator.DateOfJoining.substring(0,10)}</td> */}
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

export default Donation
