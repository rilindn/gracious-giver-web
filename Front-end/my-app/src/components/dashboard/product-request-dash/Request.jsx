import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const Request = ({request,i,loggedInUser,setRequestV,setRequestD,onUpdate}) => {

    
    const [productName, setProductName] = useState();
    const [requesterName, setRequesterName] = useState();
    const dateTime = request.Request_Date.split("T")

    useEffect(()=>{
        getProductName();
        getRequesterName();
    },[])

    const getProductName = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/product/"+request.ProductId)
        .then(res=>{
            setProductName(res.data.ProductName)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const getRequesterName = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/user/"+request.UserId)
        .then(res=>{
            setRequesterName(res.data.UserName)
        })
        }
        catch(e){
            console.log(e);
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
      <tr key={request.RequestId} >
        <td>#{++i}</td>
        <td>{requesterName}</td>
        <td>{productName}</td>
        <td>{request.Message}</td>
        <td>{dateTime[0]}</td>
        <td>{dateTime[1]}</td>

        <td>
          {loggedInUser.UserRole === 'Admin' ||
          loggedInUser.UserRole === 'SuperAdmin' ||
          loggedInUser.UserRole === 'Receiver' ? (
            <div>
              <Button
                onClick={() => {
                    setRequestV();
                }}
                className="m-2"
                variant="warning"
                data-toggle="modal"
              >
                <i
                  className="material-icons"
                  data-toggle="tooltip"
                  title="Edit"
                >
                  &#xE254;
                </i>
              </Button>

              <Button
                onClick={() => {
                    setRequestD();
                }}
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
            </div>
          ) : null}
          {loggedInUser.UserRole === 'Donator' ? (
            <div>
              <Button
                onClick={() => handleAcceptRequest(request)}
                className="m-2"
                variant="success"
                data-toggle="modal"
              >
                Accept
              </Button>

              <Button
                onClick={() => handleDeclineRequest(request)}
                className="m-2"
                variant="danger"
                data-toggle="modal"
              >
                Decline
              </Button>
            </div>
          ) : null}
        </td>
      </tr>
  )
}

export default Request
