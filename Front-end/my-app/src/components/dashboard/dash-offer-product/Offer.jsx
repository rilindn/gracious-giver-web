/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const Offer = ({offer,i,loggedInUser,setRequestV,setRequestD,onUpdate}) => {

    
    const [request, setRequest] = useState([]);
    const [donator, setDonator] = useState([]);
    const [receiver, setReceiver] = useState([]);
    const dateTime = offer.Offerdate.split("T")

    useEffect(()=>{
        getRequest();
        getDonator();
        getReceiver();
    },[])

    const getRequest = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/request/"+offer.RequestId)
        .then(res=>{
            setRequest(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const getDonator = async () => {
        try{ 
        await axios.get("http://localhost:5000/api/user/"+offer.ProductProviderId)
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
        await axios.get("http://localhost:5000/api/user/"+offer.ReceiverId)
        .then(res=>{
            setReceiver(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    

    const handleAcceptRequest  = async (offer) => {
        var date = new Date().toLocaleString()
        try{
          await axios.post(`http://localhost:5000/api/offeredproductresponse/`,{
            OfferedProductResponseDate: date,
            OfferProductId:offer.OfferProductId,
            Message: offer.Message,
            ProductProviderId: offer.ProductProviderId,
            ReceiverId:offer.ReceiverId,
            OfferedProductResponseName: "Declined",
          }) 
          .then(()=>{
            axios.put('http://localhost:5000/api/offerproduct/check/'+offer.OfferProductId)
          })
          .then(()=>{
            axios.post('http://localhost:5000/api/notification', {
                Initiator: loggedInUser.UserId,
                Acceptor: offer.ProductProviderId,
                Content: "Your request for "+request.RequestName+ " has been accepted by "
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
            'Offer has been accepted!',
            '',
            1000,
            )},
            )
        }
        catch(e){
            console.log(e);
            }
        }

        const handleDeclineRequest  = async (offer) => {
            var date = new Date().toLocaleString()
            try{
              console.log("prod res")
              await axios.post(`http://localhost:5000/api/offeredproductresponse`,{  
                OfferedProductResponseDate: date,
                OfferProductId:offer.OfferProductId,
                Message: offer.Message,
                ProductProviderId: offer.ProductProviderId,
                ReceiverId:offer.ReceiverId,
                OfferedProductResponseName: "Declined",
                }) 
                .then(()=>{
                  axios.put('http://localhost:5000/api/offerproduct/check/'+offer.OfferProductId)
                })
                .then(()=>{
                  axios.post('http://localhost:5000/api/notification', {
                      Initiator: loggedInUser.UserId,
                      Acceptor: offer.ProductProviderId,
                      Content: "Your request for "+request.RequestName+ " has been declined by "
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
                'Offer has been declined!',
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
      <tr key={offer.OfferProductId} >
        <td>#{++i}</td>
        <td>{donator.UserName}</td>
        <td>{receiver.UserName}</td>
        <td>{request.RequestName}</td>
        <td>{offer.Message}</td>
        <td>{dateTime[0]}</td>
        <td>{dateTime[1]}</td>

        <td>
          {loggedInUser.UserRole === 'Admin' ||
          loggedInUser.UserRole === 'SuperAdmin' ||
          loggedInUser.UserRole === 'Donator' ? (
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
          {loggedInUser.UserRole === 'Receiver' ? (
            <div>
              <Button
                onClick={() => handleAcceptRequest(offer)}
                className="m-2"
                variant="success"
                data-toggle="modal"
              >
                Accept
              </Button>

              <Button
                onClick={() => handleDeclineRequest(offer)}
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

export default Offer
