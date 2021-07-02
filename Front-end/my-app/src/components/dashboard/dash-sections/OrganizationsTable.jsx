import React, { useState, useEffect } from 'react'
import UserTable from '../dash-user/UserTable';
import AdminTable from'../dash-admin/AdminTable';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import MemberTable from '../dash-organization-member/MemberTable';


const OrganizationsTables = () => {

    const [memberTable, setMemberTable] = useState(true);
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
                    setMemberTable(true);
                    // setAdminTable(false);
                    // setOrganizationTable(false);
                }}
                className={`dash-btn ${memberTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Member
                </button>
            </li>

            {/* <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setAdminTable(false);
                    setOrganizationTable(true);
                }}
                className={`dash-btn ${organizationTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
               Organizations
                </button>
            </li> */}
            
            {/* {loggedInUser.UserRole==='SuperAdmin'?
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setAdminTable(true);
                    setOrganizationTable(false);
                }}
                className={`dash-btn ${adminTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Admins
                </button>
            </li>
            :null} */}
   
        </ul>
        <div className="dash-tables">
            {memberTable ? <MemberTable/>: null}
            {/* {organizationTable ? <OrganizationTable/>:null}
            {loggedInUser.UserRole==='SuperAdmin'?
            (adminTable ? <AdminTable/>: null) :null} */}
        </div>
        </div>
        </div>
        
        :<Spinner animation="border" className="m-5"/>}
    </div>
    )
}

export default OrganizationsTables

