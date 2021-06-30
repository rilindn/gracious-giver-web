import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import OfferedProductResponseTable from '../OfferedProductResponse/OfferedProductResponseTable';



const OfferedProductTables = () => {

    
    const [offeredProductResponseTable, setOfferedProductResponseTable] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState([])
    const [loading,setLoading] = useState(false);
    const [offeredProductTable, setOfferedProductTable] = useState(false);
    
    
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
                    setOfferedProductResponseTable(true);
                    setOfferedProductTable(false);
                }}
                className={`dash-btn ${offeredProductResponseTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 OffProdResponseTable
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setOfferedProductResponseTable(false);
                    setOfferedProductTable(true);
                }}
                className={`dash-btn ${offeredProductTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                  Offered Product Table
                </button>
            </li>
        </ul>
        <div className="dash-tables">
            {offeredProductResponseTable ? <OfferedProductResponseTable loggedInUser={loggedInUser}/>: null }
            {offeredProductTable ? <OfferedProductResponseTable loggedInUser={loggedInUser}/>: null }
        </div>
        </div>
        </div>
        :<Spinner animation="border" className="m-5"/>}
    </div>
    )
}

export default OfferedProductTables

