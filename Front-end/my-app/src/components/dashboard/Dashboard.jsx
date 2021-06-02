import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table, ToggleButton } from 'react-bootstrap';
import HeaderLoginRegister from '../Header/HeaderLoginRegister'
import ProductTable from './dash-prod/ProductTable';
import CityTable from './dash-city/CityTable';
import CategTable from './dash-category/CategTable';
import StateTable from './dash-state/StateTable';
import StreetTable from'./dash-street/StreetTable';
import Footer from '../footer/Footer';


const Dashboard = () => {

    const [prodTable,setProdTable] = useState(true);
    const [categTable,setCategTable] = useState(false);
    const [cityTable,setCityTable] = useState(false);
    const [stateTable,setStateTable] = useState(false);
    const [streetTable,setStreetTable] = useState(false);

    


    return (
    <div>
        <HeaderLoginRegister/>
        <div className="dash-content">
        <ul className="d-flex dash-selector">
            <li>
                <button
                onClick={()=>{
                    setProdTable(true);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                }}
                className={`dash-btn ${prodTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Product Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setProdTable(false);
                    setCategTable(true);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(false);
                }}
                
                className={`dash-btn ${categTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Category Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(true);
                    setStateTable(false);
                    setStreetTable(false);
                }}
                className={`dash-btn ${cityTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                City Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(true);
                    setStreetTable(false);
                }}
                className={`dash-btn ${stateTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                State Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setProdTable(false);
                    setCategTable(false);
                    setCityTable(false);
                    setStateTable(false);
                    setStreetTable(true);
                }}
                className={`dash-btn ${streetTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                Street Table
                </button>
            </li>
        </ul>
        <div className="dash-tables">
            {prodTable ? <ProductTable/>: null }
            {categTable ? <CategTable/>: null }
            {cityTable ? <CityTable/>: null }
            {stateTable ? <StateTable/>: null }
            {streetTable ? <StreetTable/>: null }
        </div>
        </div>
        <Footer/>
    </div>
    )
}

export default Dashboard

