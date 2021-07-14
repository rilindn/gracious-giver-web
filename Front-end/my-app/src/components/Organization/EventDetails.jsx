/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NotificationManager } from 'react-notifications';
import Header from '../Header/Header'
import Footer from '../footer/Footer'
import { useParams } from 'react-router-dom';
import EventParticipantTable from "../dashboard/dash-event-participant/EventParticipantTable";
import Moment from 'react-moment';

const EventDetails = () => {

    var {EventId,OrgId} = useParams();
    const [event,setEvent] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState([])
    const [joined, setJoined] = useState(false);
  
    useEffect(() => {
      ;(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
            console.log(res.data)
            getEvent();
            joinCheck(res.data.UserId);
          })
      })()
    }, [])

    const getEvent = () =>{
        try{
            axios.get('http://localhost:5000/api/events/'+EventId)
            .then((res)=>{
                setEvent(true)
            })
        }catch(e){
            console.log(e)
        }
        
    }

    const joinCheck = (UserId) =>{
      try{
        axios.get(`http://localhost:5000/api/eventparticipants/joined/${UserId}/${EventId}`)
        .then((res)=>{
          setJoined(res.data);
        })
      }catch(e){
        console.log(e)
      }
    }
    const handleSubmit = async (e) =>  {
      e.preventDefault();
      axios.get('http://localhost:5000/api/OrganizationMember/joined/'+OrgId+"/"+loggedInUser.UserId)
      .then((res)=>{
          if(res.data===false){
            NotificationManager.error(
              'You must be a organization member to join in this event!',
              '',
              3000,
              )
          }
          else{
            axios
            .post('http://localhost:5000/api/EventParticipants', {
              EventId:event.EventId,
              ParticipantId:loggedInUser.UserId
            })
            .then(
              (res) => {
                NotificationManager.success(
                'Joined Successfully!',
                '',
                2000,
                )
              },
              (error) => {
                NotificationManager.error(
                  'Error while joining!',
                  '',
                  1000,
                  )
              },
            )
          }
      })
       
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
                  <img id="imgo" src={`http://localhost:5000/photos/organization/events/${event.Photo}`} alt="" />
                </div>
              </div>
              <div className="organization-details-wrapper p-4">
                <h4 className="pro-d-title">
                {event.EventName} 
                </h4>
                <p style={{textAlign:"left"}}>
                 {event.EventDescription} 
                </p>
                <p style={{textAlign:"left"}}>
                  {joined===false?
                  <button style={{backgroundColor:"#d92362"}} onClick={handleSubmit} className="btn btn-round btn-danger" type="button">Join us</button>:
                  <button style={{backgroundColor:"#d92362"}} className="btn btn-round btn-danger" type="button">Joined</button>}
                </p>
                <div className="text-left">
                Created <b><Moment fromNow>
                {event.EventDate}
                </Moment></b>
                </div>
              </div>
            </div>
          </section>
          {loggedInUser.OrganizationId !== undefined? <EventParticipantTable EventId={EventId}></EventParticipantTable>: null}
        </div>
      </div>
      <Footer/>
      </div>
    )
}

export default EventDetails
