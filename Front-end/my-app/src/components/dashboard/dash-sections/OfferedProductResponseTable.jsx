import React, { useState, useEffect } from 'react'
import axios from 'axios';
import OfferedProductResponseTable from '../OfferedProductResponse/OfferedProductResponseTable';


const OfferedProductTables = () => {

    
    const [offeredProductResponseTable, setOfferedProductResponseTable] = useState(true);
    
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
                    setOfferedProductResponseTable(true);
                }}
                className={`dash-btn ${requestTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 Request Table
                </button>
            </li>
            <li>
                <button
                onClick={()=>{
                    setOfferedProductResponseTable(false);
                }}
                className={`dash-btn ${responseTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                 Response Table
                </button>
            </li>
        </ul>
        <div className="dash-tables">
            {offeredProductResponseTable ? <OfferedProductResponseTable loggedInUser={loggedInUser}/>: null }
        </div>
        </div>
        </div>
        
    </div>
    )
}

export default OfferedProductTables

