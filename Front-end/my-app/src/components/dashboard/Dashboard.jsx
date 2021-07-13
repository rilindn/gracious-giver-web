import React, { useState, useEffect } from 'react'
import Footer from '../footer/Footer';
import axios from 'axios';
import Header from './../Header/Header';
import OtherTables from './dash-sections/OtherTables';
import PostsTables from './dash-sections/PostsTables';
import RequestsTables from './dash-sections/RequestsTables';
import UsersDataTable from './dash-sections/UsersDataTables';
import { Spinner } from 'react-bootstrap';
import OffersTables from './dash-sections/OffersTable';
import OrganizationsTable from './dash-sections/OrganizationsTable';


const Dashboard = () => {

    const [usersTables, setUsersTables] = useState(false);
    const [requestsTables,setRequestsTables] = useState(false);
    const [postsTables,setPostsTables] = useState(true);
    const [otherTables,setOtherTables] = useState(false);
    const [offersTables,setOffersTables] = useState(false);
    const [organizationTables, setOrganizationTables] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([])
    const [loading,setLoading] = useState(false);
    
    useEffect(() => {(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
            setLoading(true);
            setOrganizationTables(res.data.OrganizationId!==undefined?true:false)
            setPostsTables(res.data.OrganizationId!==undefined?false:true)
          })
      })()
    }, [])

    return (
    <div>
        <Header search={false}/>
            {loading?
        <div className="d-flex">
        <div className="dash-side-selector">
            
        {loggedInUser.OrganizationId===undefined?
            <ul>
                <li
               onClick={()=>{
                setUsersTables(false);
                setRequestsTables(false);
                setPostsTables(true);
                setOtherTables(false);
                setOffersTables(false);
                setOrganizationTables(false);
                }}
                className={` ${postsTables ? "active-side-btn" : ""}`}
                > Posts</li>
                

                {loggedInUser.UserRole === "Admin" || loggedInUser.UserRole === "SuperAdmin"?
                <li 
                onClick={()=>{
                    setUsersTables(true);
                    setRequestsTables(false);
                    setPostsTables(false);
                    setOtherTables(false);
                    setOffersTables(false);
                    setOrganizationTables(false);
                }}
                className={`${usersTables ? "active-side-btn" : ""}`}
                >Users</li>
                :null}
                <li
                onClick={()=>{
                    setUsersTables(false);
                    setRequestsTables(true);
                    setPostsTables(false);
                    setOtherTables(false);
                    setOffersTables(false);
                    setOrganizationTables(false);
                }}
                className={`${requestsTables ? "active-side-btn" : ""}`}
                > Requests</li>
                <li
                onClick={()=>{
                    setUsersTables(false);
                    setRequestsTables(false);
                    setPostsTables(false);
                    setOtherTables(false);
                    setOffersTables(true);
                    setOrganizationTables(false);
                }}
                className={`${offersTables ? "active-side-btn" : ""}`}
                > Offers</li>
                
                {loggedInUser.UserRole === "Admin" || loggedInUser.UserRole === "SuperAdmin"?

                
                <li
                onClick={()=>{
                    setUsersTables(false);
                    setRequestsTables(false);
                    setPostsTables(false);
                    setOtherTables(true);
                    setOffersTables(false);
                    setOrganizationTables(false);
                }}
                className={`${otherTables ? "active-side-btn" : ""}`}
                >Other Tables</li>
                :null}
                
            </ul>
            :
            <ul>
                <li
                onClick={()=>{
                    setUsersTables(false);
                    setRequestsTables(false);
                    setPostsTables(false);
                    setOtherTables(false);
                    setOffersTables(false);
                    setOrganizationTables(true);
                }}
                className={`${organizationTables ? "active-side-btn" : ""}`}
                > Organization</li>
            </ul>
            }
        </div>
        <div className="dash-content">
        <div className="dash-tables">
            {loggedInUser.OrganizationId!==undefined?organizationTables? <OrganizationsTable/>:null:null}
            {loggedInUser.UserRole === "Admin" || loggedInUser.UserRole === "SuperAdmin"? (usersTables ? <UsersDataTable/>: null):null}
            {postsTables ? <PostsTables/>: null }
            {requestsTables ? <RequestsTables/>: null}
            {offersTables? <OffersTables/>:null}
            {loggedInUser.UserRole === "Admin" || loggedInUser.UserRole === "SuperAdmin"? (otherTables ? <OtherTables/>: null ):null}
            
        </div>
        </div>
        </div>
        :<Spinner animation="border" className="m-5" style={{marginBottom:"400px"}}/>}
        <Footer/>
    </div>
    )
}

export default Dashboard

