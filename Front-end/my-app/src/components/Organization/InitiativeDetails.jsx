/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NotificationManager } from 'react-notifications';
import Header from '../Header/Header'
import Footer from '../footer/Footer'
import { useParams } from 'react-router-dom';
import DonateModal from './DonateModal';
import InitiativeDonators from './InitiativeDonators';
import Moment from 'react-moment';

const InitiativeDetails = () => {

    var {IniciativeId} = useParams();
    const [iniciative,setInitiative] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState([])
    const [receiver, setReceiver] = useState([])
    const [donateModal, setDonateModal] = useState(false)
  
    useEffect(() => {
      ;(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
            getInitiative();
            getReceiver();
          })
      })()
    }, [])

    const getInitiative = async () =>{
        try{
          await axios.get('http://localhost:5000/api/Iniciative/'+ IniciativeId)
            .then((res)=>{
                setInitiative(res.data)
                console.log(res.data)
            })
        }catch(e){
            console.log(e)
        }
        
    }
    const getReceiver = async () =>{
        try{
            await axios.get('http://localhost:5000/api/user/'+ iniciative.ReceiverId)
            .then((res)=>{
              setReceiver(res.data)
            })
        }catch(e){
            console.log(e)
        }
        
    }


    return (
        <div>
            <Header/>
        <div className="container bootdey">
        <div className="col-md-12">
          <section className="panel">
            <div className="panel-body">
            <div className="imgorg">
                <div className="pro-img-details">
                  <img id="imgo" src={`http://localhost:5000/photos/organization/initiative/${iniciative.IniciativePhoto}`} alt="" />
                </div>
              </div>
              <div className="organization-details-wrapper">
                <h4 className="pro-d-title">
                {iniciative.IniciativeName} 
                </h4>
                <p style={{textAlign:"left"}}>
                 {iniciative.IniciativeDescription} 
                </p>
                <p style={{textAlign:"left"}}>
                  <button onClick={()=>{setDonateModal(true)}} style={{backgroundColor:"#d92362"}}  className="btn btn-round btn-danger" type="button">Donate</button>
                </p>
                <div className="text-left">
                Created <b><Moment fromNow>
                {iniciative.IniciativeDate}
                </Moment>
                </b>  | {receiver.length!==0? <p className="mt-1 d-inline">Requested by <b>{receiver.Firstname} {receiver.Lastname}</b> </p>:null}
                </div>
              </div>
            </div>
          </section>
          {loggedInUser.OrganizationId !== undefined && iniciative.length!==0? <InitiativeDonators InitiativeId={iniciative.IniciativeId}></InitiativeDonators>: null}
        </div>
      </div>
      <Footer/>
      <DonateModal
        show={donateModal}
        onHide={() => setDonateModal(false)}
        Initiative={iniciative}
        loggedInUser={loggedInUser}
        />
      </div>
    )
}

export default InitiativeDetails
