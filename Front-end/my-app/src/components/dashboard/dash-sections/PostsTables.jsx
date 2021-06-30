import React, { useState, useEffect } from 'react'
import ProductTable from '../dash-prod/ProductTable';
import RequesttTable from'../dash-requestt/RequesttTable';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';


const PostsTables = () => {

    const [prodTable,setProdTable] = useState(true);
    const [requesttTable, setRequesttTable] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([])
    const [loading,setLoading] = useState(false);
    
    useEffect(() => {(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
            setProdTable(res.data.UserRole==="Receiver"?false:true)
            setRequesttTable(res.data.UserRole==="Receiver"?true:false)
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
            
            {loggedInUser.UserRole==="Receiver"?null:
            <li>
                <button
                onClick={()=>{
                    setProdTable(true);
                    setRequesttTable(false);
                }}
                className={`dash-btn ${prodTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Products
                </button>
            </li>}
            {loggedInUser.UserRole==="Donator"?null:
            <li>
                <button
                onClick={()=>{
                    setProdTable(false);
                    setRequesttTable(true);
                }}
                className={`dash-btn ${requesttTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Receivers requests
                </button>
            </li>
            }
            
        </ul>
        <div className="dash-tables">
            {loggedInUser.UserRole==="Receiver"?null:(prodTable ? <ProductTable loggedInUser={loggedInUser}/>: null) }
            {loggedInUser.UserRole==="Donator"?null:(requesttTable ? <RequesttTable/>: null) }
        </div>
        </div>
        </div>
        
        :<Spinner animation="border" className="m-5"/>}
    </div>
    )
}

export default PostsTables

