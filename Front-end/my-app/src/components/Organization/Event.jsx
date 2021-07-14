import axios from 'axios';
import React, { useState } from 'react'
import Moment from 'react-moment';
import { NotificationManager } from 'react-notifications';
import { useEffect } from 'react';

const Event = ({event,organization}) => {

  const [joined, setJoined] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState([])

  useEffect(() => {
      ;(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
            joinCheck(res.data.UserId);
          })
      })()
    }, [])

  const joinCheck = async (userId) =>{
    try{
      await axios.get(`http://localhost:5000/api/eventparticipants/joined/${userId}/${event.EventId}`)
      .then((res)=>{
        setJoined(true);
      })
    }catch(e){
      console.log(e)
    }
  }

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        axios.get('http://localhost:5000/api/OrganizationMember/joined/'+organization.OrganizationId+"/"+loggedInUser.UserId)
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
        
          <div className="col-md-3" >
            <div className="ibox">
              <div className="ibox-content product-box">
                <img src={`http://localhost:5000/photos/organization/events/${event.Photo}`} className="product-imitation" alt={event.EventName} style={{width:"210px",height:"200px"}}> 
                </img>
                <div className="product-desc">
                  <span className="product-price">
                  Active
                  
                  </span>
                  <small className="text-muted"></small>
                  <a href={`/eventdetails/${event.EventId}/${organization.OrganizationId}`} style={{textDecoration:"none"}}>
                  <h5 className="product-name">{event.EventName}</h5>
                  </a>
                  <div className="small m-t-xs">
                    <Moment format="DD MMM YYYY hh:mm"> 
                      {event.EventDate}
                    </Moment>
                  </div>
                  <div className="m-t">
                    {joined?
                    <button className="btn btn-block btn-primary mt-3 ml-0" >Joined</button>:
                    <button className="btn btn-block btn-primary mt-3 ml-0"  onClick={handleSubmit}>Join</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

export default Event
