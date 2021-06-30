import React, { useState, useEffect } from 'react'
import UserTable from '../dash-user/UserTable';
import AdminTable from'../dash-admin/AdminTable';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Organization from "../dash-organization"


const UsersDataTable = () => {

    const [userTable, setUserTable] = useState(true);
    const [adminTable, setAdminTable] = useState(false);
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
                    setUserTable(true);
                    setAdminTable(false);
                }}
                className={`dash-btn ${userTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Users
                </button>
            </li>
            
            {loggedInUser.UserRole==='SuperAdmin'?
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setAdminTable(true);
                }}
                className={`dash-btn ${adminTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Admins
                </button>
            </li>
            :null}
            
        </ul>
        <div className="dash-tables">
            {userTable ? <UserTable/>: null}
            {loggedInUser.UserRole==='SuperAdmin'?
            (adminTable ? <AdminTable/>: null) :null}
        </div>
        </div>
        </div>
        
        :<Spinner animation="border" className="m-5"/>}
    </div>
    )
}

export default UsersDataTable

