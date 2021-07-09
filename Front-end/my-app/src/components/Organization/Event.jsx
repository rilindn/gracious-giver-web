import axios from 'axios';
import React from 'react'
import Moment from 'react-moment';
import { NotificationManager } from 'react-notifications';

const Event = ({event,loggedInUser,organization}) => {


    const handleSubmit = async (event) =>  {
        var date = new Date().toLocaleString()
        event.preventDefault();
         axios
        .post('http://localhost:5000/api/OrganizationMemberRequest', {
          DateOfJoining: date,
          OrganizationId: organization.OrganizationId,
          UserId:loggedInUser.UserId,
          Checked : false
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
                  <a href={`/eventdetails/${event.EventId}`} style={{textDecoration:"none"}}>
                  <h5 className="product-name">{event.EventName}</h5>
                  </a>
                  <div className="small m-t-xs">
                    <Moment format="DD MMM YYYY hh:mm"> 
                      {event.EventDate}
                    </Moment>
                  </div>
                  <div className="m-t">
                    <button className="btn btn-block btn-primary mt-3 ml-0"  onClick={handleSubmit}>Join</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

export default Event
