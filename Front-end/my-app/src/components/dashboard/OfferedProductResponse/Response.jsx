/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';

const Response = ({response,i,onUpdate}) => {

    const [request, setRequest] = useState([]);
    const [donator, setDonator] = useState([]);
    const [receiver, setReceiver] = useState([]);
    const [loading,setLoading] = useState(false);
    const dateTime = response.OfferedProductResponseDate.split("T")

    useEffect(()=>{
        getRequest();
        getDonator();
        getReceiver();
    },[])

    const getRequest = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/offerProduct/"+response.OfferProductId)
        .then(res=>{
            axios.get("http://localhost:5000/api/request/"+res.data.RequestId)
            .then((resu)=>{
              setRequest(resu.data)
              setLoading(true);
            })
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const getDonator = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/user/"+response.ProductProviderId)
        .then(res=>{
            setDonator(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const getReceiver = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/user/"+response.ReceiverId)
        .then(res=>{
            setReceiver(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <tbody>
        {loading?
        (<tr>
            <td>#{++i}</td>
            <td>{donator.UserName}</td>
            <td>{receiver.UserName}</td>
            <td>{request.RequestName}</td>
            <td>{response.Message}</td>
            <td>{response.OfferedProductResponseName}</td>
            <td>{dateTime[0]}</td>
            <td>{dateTime[1]}</td>
            <td>                                   
                <Button 
                onClick={() => 
                    {
                        onUpdate()
                    }} 
                 className="delete" 
                 variant ="danger"
                 data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                 </Button>
            </td>
        </tr>)
         :<Spinner animation="border" className="m-5 mx-auto"/>}
         </tbody>
    )
}

export default Response
