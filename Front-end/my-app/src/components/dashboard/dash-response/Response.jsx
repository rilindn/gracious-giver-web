/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';

const Response = ({response,i,onUpdate}) => {

    const [productName, setProductName] = useState();
    const [donatorName, setDonatorName] = useState();
    const [receiverName, setReceiverName] = useState();
    const [loading,setLoading] = useState(false);
    const dateTime = response.ResponseDate.split("T")

    useEffect(()=>{
        getDonatorName();
        getReceiverName();
        getProductName();
    },[])

    const getProductName = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/product_request/"+response.RequestId)
        .then(res=>{
            axios.get("http://localhost:5000/api/product/"+res.data.ProductId)
            .then((r)=>{
                setProductName(r.data.ProductName)
                setLoading(true);
            })
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const getDonatorName = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/user/"+response.DonatorId)
        .then(res=>{
            setDonatorName(res.data.UserName)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const getReceiverName = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/user/"+response.ReceiverId)
        .then(res=>{
            setReceiverName(res.data.UserName)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <tbody>
        {loading?
        (<tr key={response.ProductRequestResponseId} >
            
             <td>#{++i}</td>
             <td>{receiverName}</td>
             <td>{donatorName}</td>
             <td>{productName}</td>
             <td>{response.Message}</td>
             <td>{response.Response}</td>
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
