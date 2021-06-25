import React, { useState, useEffect } from 'react'
import ResponseTable from'../dash-response/ResponseTable';
import ProductRequestTable from '../product-request-dash/ProductRequestTable';
import axios from 'axios';


const RequestsTables = () => {

    
    const [requestTable, setRequestTable] = useState(true);
    const [responseTable, setResponseTable] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([])
    
    useEffect(() => {(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
          })
      })()
    }, [])

    return (
    <div>
        <div className="d-flex">
        <div className="dash-content">
        <ul className="d-flex dash-selector">
        
            <li>
                <button
                onClick={()=>{
                    setRequestTable(true);
                    setResponseTable(false);
                }}
                className={`dash-btn ${requestTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 Request Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setRequestTable(false);
                    setResponseTable(true);
                }}
                className={`dash-btn ${responseTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 Response Table
                </button>
            </li>
        </ul>
        <div className="dash-tables">
            {responseTable ? <ResponseTable loggedInUser={loggedInUser}/>: null }
            {requestTable ? <ProductRequestTable loggedInUser={loggedInUser}/>: null }
        </div>
        </div>
        </div>
        
    </div>
    )
}

export default RequestsTables

