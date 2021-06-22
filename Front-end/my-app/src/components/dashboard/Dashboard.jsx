import React, { useState, useEffect } from 'react'
import HeaderLoginRegister from '../Header/HeaderLoginRegister'
import UserTable from './dash-user/UserTable';
import ProductTable from './dash-prod/ProductTable';
import CityTable from './dash-city/CityTable';
import CategTable from './dash-category/CategTable';
import StateTable from './dash-state/StateTable';
import StreetTable from'./dash-street/StreetTable';
import AdminTable from'./dash-admin/AdminTable';
import Footer from '../footer/Footer';
import ProductRequestTable from './product-request-dash/ProductRequestTable';
import axios from 'axios';


const Dashboard = () => {

    const [userTable, setUserTable] = useState(true);
    const [prodTable,setProdTable] = useState(false);
    const [categTable,setCategTable] = useState(false);
    const [cityTable,setCityTable] = useState(false);
    const [stateTable,setStateTable] = useState(false);
    const [streetTable,setStreetTable] = useState(false);
    const [adminTable, setAdminTable] = useState(false);
    const [requestTable, setRequestTable] = useState(false);

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
        <HeaderLoginRegister/>
        <div className="dash-content">
        <ul className="d-flex dash-selector">
        <li>
                <button
                onClick={()=>{
                    setUserTable(true);
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                    setAdminTable(false);
                    setRequestTable(false);
                }}
                className={`dash-btn ${userTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                User Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setProdTable(true);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                    setAdminTable(false);
                    setRequestTable(false);
                }}
                className={`dash-btn ${prodTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Product Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setProdTable(false);
                    setCategTable(true);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                    setAdminTable(false);
                    setRequestTable(false);
                }}
                
                className={`dash-btn ${categTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Category Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(true);
                    setStateTable(false);
                    setStreetTable(false);
                    setAdminTable(false);
                    setRequestTable(false);
                }}
                className={`dash-btn ${cityTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                City Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(true);
                    setStreetTable(false);
                    setAdminTable(false);
                    setRequestTable(false);
                }}
                className={`dash-btn ${stateTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                State Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(true);
                    setAdminTable(false);
                    setRequestTable(false);
                }}
                className={`dash-btn ${streetTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Street Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                    setAdminTable(true);
                    setRequestTable(false);
                }}
                className={`dash-btn ${adminTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Admin Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setUserTable(false);
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                    setAdminTable(false);
                    setRequestTable(true);
                }}
                className={`dash-btn ${requestTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 Request Table
                </button>
            </li>
        </ul>
        <div className="dash-tables">
            {userTable ? <UserTable/>: null}
            {prodTable ? <ProductTable/>: null }
            {categTable ? <CategTable/>: null }
            {cityTable ? <CityTable/>: null }
            {stateTable ? <StateTable/>: null }
            {streetTable ? <StreetTable/>: null }
            {adminTable ? <AdminTable/>: null }
            {requestTable ? <ProductRequestTable loggedInUser={loggedInUser}/>: null }
        </div>
        </div>
        
        <Footer/>
    </div>
    )
}

export default Dashboard

