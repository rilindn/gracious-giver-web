import React, { useState, useEffect } from 'react'
import CityTable from '../dash-city/CityTable';
import CategTable from '../dash-category/CategTable';
import StateTable from '../dash-state/StateTable';
import StreetTable from'../dash-street/StreetTable';
import OrganizationCategoryTable from '../dash-organization/OrganizationCategoryTable'
import axios from 'axios';


const OtherTables = () => {

    const [categTable,setCategTable] = useState(true);
    const [cityTable,setCityTable] = useState(false);
    const [stateTable,setStateTable] = useState(false);
    const [streetTable,setStreetTable] = useState(false);
    const [organizationCategoryTable,setOrganizationCategoryTable] = useState(false);

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
                    setCategTable(true);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                    setOrganizationCategoryTable(false);
                }}
                
                className={`dash-btn ${categTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Product Category
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setCategTable(false);
                    setCityTable(true);
                    setStateTable(false);
                    setStreetTable(false);
                    setOrganizationCategoryTable(false);
                }}
                className={`dash-btn ${cityTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                City Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(true);
                    setStreetTable(false);
                    setOrganizationCategoryTable(false);
                }}
                className={`dash-btn ${stateTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                State Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(true);
                    setOrganizationCategoryTable(false);
                }}
                className={`dash-btn ${streetTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Street Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                    setOrganizationCategoryTable(true);
                }}
                className={`dash-btn ${organizationCategoryTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Organization Category
                </button>
            </li>
            
        </ul>
        <div className="dash-tables">
            {categTable ? <CategTable loggedInUser={loggedInUser}/>: null }
            {cityTable ? <CityTable/>: null }
            {stateTable ? <StateTable/>: null }
            {streetTable ? <StreetTable/>: null }
            {organizationCategoryTable ? <OrganizationCategoryTable/>: null }
        </div>
        </div>
        </div>
        
    </div>
    )
}

export default OtherTables

