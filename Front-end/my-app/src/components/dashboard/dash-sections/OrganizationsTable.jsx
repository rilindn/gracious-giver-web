/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import MemberTable from '../dash-organization-member/MemberTable';
import OrgMemberRequestTable from '../dash-organization-member-request/OrgMemberRequestTable';
import EventParticipantTable from '../dash-event-participant/EventParticipantTable';
import EventsTable from '../dash-Events/EventsTable';


const OrganizationsTables = () => {

    const [memberTable, setMemberTable] = useState(true);
    const [memberEventTable, setMemberEventTable] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([])
    const [memberRequest, setMemberRequest] = useState(false)
    const [eventss, setEventss] = useState(false)
    const [loading,setLoading] = useState(false);
    
    
    useEffect(() => {(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
            setLoading(true);
          })
      })()
    }, [])

    return (
    <div>
        {loading?
        <div className="d-flex">
        <div className="dash-content">
        <ul className="d-flex dash-selector">
        <li>
                <button
                onClick={()=>{
                    setMemberTable(true);
                    setMemberRequest(false);
                    setMemberEventTable(false);
                    setEventss(false);
                }}
                className={`dash-btn ${memberTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Members
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setMemberTable(false);
                    setMemberRequest(true);
                    setMemberEventTable(false);
                    setEventss(false);
                }}
                className={`dash-btn ${memberRequest ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Organization Requests
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setMemberTable(false);
                    setMemberRequest(false);
                    setMemberEventTable(true);
                    setEventss(false);
                }}
                className={`dash-btn ${memberEventTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Event Members
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setMemberTable(false);
                    setMemberRequest(false);
                    setMemberEventTable(false);
                    setEventss(true);
                }}
                className={`dash-btn ${eventss ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Events
                </button>
            </li>

   
        </ul>
        <div className="dash-tables">
            {memberTable ? <MemberTable/>: null}
            {memberRequest ? <OrgMemberRequestTable/>:null}
            {memberEventTable ? <EventParticipantTable/>:null}
            {eventss ? <EventsTable/>:null}


            {/* {loggedInUser.UserRole==='SuperAdmin'?
            (adminTable ? <AdminTable/>: null) :null} */} 
        </div>
        </div>
        </div>
        
        :<Spinner animation="border" className="m-5"/>}
    </div>
    )
}

export default OrganizationsTables

