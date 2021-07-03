import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Request = ({request,onEdit,onDelete,i}) => {

    const [requester,setrequester] = useState([])

    useEffect(()=>{
        getRequester();
    },[])

    const getRequester = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/user/"+request.ReceiverId)
        .then(res=>{
            setrequester(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <tr>
            <td>#{++i}</td>
            <td>{requester.Firstname} {requester.Lastname}</td>
            <td>{request.RequestName}</td>
            <td>{request.RequestDescription}</td>
            <td>{request.RequestCategory}</td>

            <td>
                <Button
                onClick={() => {onEdit();}}
                className="m-2" 
                variant ="warning" 
                data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                </Button>
                
                <Button 
                onClick={() => {onDelete()}} 
                 className="delete" 
                 variant ="danger"
                 data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                 </Button>

            </td>
        </tr>
    )
}

export default Request
