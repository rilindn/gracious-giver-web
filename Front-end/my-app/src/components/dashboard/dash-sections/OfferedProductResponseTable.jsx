import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import OfferedProductResponseTable from '../OfferedProductResponse/OfferedProductResponseTable';
import  OfferproductTable from '../dash-offerproduct/OfferproductTable';


const OfferedProductTables = () => {

    
    const [offeredProductResponseTable, setOfferedProductResponseTable] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState([])
    const [loading,setLoading] = useState(false);
    const [offerproductTable, setOfferproductTable] = useState(false);
   
  
    
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
                    setOfferproductTable(false);
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
                    setOfferproductTable(true);
                }}
                className={`dash-btn ${offerproductTable ? "active-dash-btn" : "nonactive-dash-btn"}`}
                >
                  Offered Product Table
                </button>
            </li>

        
        </ul>
        <div className="dash-tables">
            {offeredProductResponseTable ? <OfferedProductResponseTable loggedInUser={loggedInUser}/>: null }
            {offerproductTable ? <OfferproductTable />: null }
       
        </div>
        </div>
        </div>
        :<Spinner animation="border" className="m-5"/>}
    </div>
    )
}

export default OfferedProductTables

