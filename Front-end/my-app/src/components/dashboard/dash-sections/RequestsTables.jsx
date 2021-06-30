import React, { useState, useEffect } from 'react'
import ResponseTable from'../dash-response/ResponseTable';
import ProductRequestTable from '../product-request-dash/ProductRequestTable';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import PendingOrganizationRequestTable from '../dash-pendingOrganizationRequest/PendingOrganizationRequestTable';



const RequestsTables = () => {

    
    const [requestTable, setRequestTable] = useState(true);
    const [responseTable, setResponseTable] = useState(false);
    const [pendingOrgTable, setPendingOrgTable] = useState(false);

    const [loggedInUser, setLoggedInUser] = useState([])
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
                    setRequestTable(true);
                    setResponseTable(false);
                    setPendingOrgTable(false);
                }}
                className={`dash-btn ${requestTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                {loggedInUser.UserRole==="Receiver"?"My Requests":loggedInUser.UserRole==="Donator"?"My Products Requests":"Product Requests"}
                 
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setRequestTable(false);
                    setResponseTable(true);
                    setPendingOrgTable(false);
                }}
                className={`dash-btn ${responseTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 Responded Requests
                </button>
            </li>
            {loggedInUser.UserRole === "Admin" || loggedInUser.UserRole === "SuperAdmin"?
            <li>
                <button
                onClick={()=>{
                    setRequestTable(false);
                    setResponseTable(false);
                    setPendingOrgTable(true);
                }}
                className={`dash-btn ${pendingOrgTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 Organization Requests
                </button>
            </li>
            :null}
        </ul>
        <div className="dash-tables">
            {responseTable ? <ResponseTable loggedInUser={loggedInUser}/>: null }
            {requestTable ? <ProductRequestTable loggedInUser={loggedInUser}/>: null }
            {pendingOrgTable ? <PendingOrganizationRequestTable loggedInUser={loggedInUser}/>: null }

        </div>
        </div>
        </div>
        :<Spinner animation="border" className="m-5"/>}
    </div>
    )
}

export default RequestsTables

