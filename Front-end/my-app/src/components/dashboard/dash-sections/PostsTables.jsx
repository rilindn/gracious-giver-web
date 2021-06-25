import React, { useState, useEffect } from 'react'
import ProductTable from '../dash-prod/ProductTable';
import RequesttTable from'../dash-requestt/RequesttTable';
import axios from 'axios';


const PostsTables = () => {

    const [prodTable,setProdTable] = useState(true);
    const [requesttTable, setRequesttTable] = useState(false);
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
                    setProdTable(true);
                    setRequesttTable(false);
                }}
                className={`dash-btn ${prodTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Product Table
                </button>
            </li>
            {loggedInUser.UserRole==="Donator"?null:
            <li>
                <button
                onClick={()=>{
                    setProdTable(false);
                    setRequesttTable(true);
                }}
                className={`dash-btn ${requesttTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 Request Table
                </button>
            </li>
            }
            
        </ul>
        <div className="dash-tables">
            {prodTable ? <ProductTable loggedInUser={loggedInUser}/>: null }
            {requesttTable ? <RequesttTable/>: null }
        </div>
        </div>
        </div>
        
    </div>
    )
}

export default PostsTables

