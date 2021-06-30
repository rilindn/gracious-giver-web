import React, { useEffect, useState } from 'react'
import { Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Footer } from '../footer/Footer';
import Header from '../Header/Header';
import Product from './Product';
import axios from 'axios';
import {Switch, Route } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import Request from './Request';
import Pagination from '../dashboard/DataTable/Pagination';

const Home = ({loggedInUser}) => {

    const [products, setProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showProducts,setShowProducts] = useState(true)
    const [showRequests,setShowRequests] = useState(false)
    

    useEffect(()=>{
        getproducts();
        getRequests();
        console.log("loggedInUser")
        console.log(loggedInUser)
        
    },[]);

    const getproducts = async () => {
        try{
        await axios.get(`http://localhost:5000/api/product`)
        .then(res=>{
            console.log(res.data)
            setProducts(res.data)
        })
        setLoading(true);
        }
        catch(e){
            console.log(e);
        }
    }
    const getRequests = async () => {
        try{
        await axios.get(`http://localhost:5000/api/request`)
        .then(res=>{
            console.log(res.data)
            setRequests(res.data)
        })
        setLoading(true);
        }
        catch(e){
            console.log(e);
        }
    }

    

    return (
        <div>
        <Header loggedInUser={loggedInUser} search={true}/>
        <Sidebar loggedInUser={loggedInUser}/>
        <Switch>
          <Route path="" />
          <Route path="" />
          <Route path="" />
          <Route path="" />
        </Switch>
            <div className="pt-5">
            <h3>Give away or find FREE second hand stuff</h3>
            <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-3">
                <ToggleButton onClick={()=>{
                    setShowProducts(true);
                    setShowRequests(true);
                }}
                className="border-right m-1" style={{width:"80px"}} value={1}
                >All</ToggleButton>
                <ToggleButton onClick={()=>{
                    setShowProducts(true);
                }}
                className="m-1" style={{width:"80px"}} value={2}>Free</ToggleButton>
                <ToggleButton onClick={()=>{
                    setShowProducts(false);
                }} 
                className="border-right m-1" style={{width:"80px"}} value={3}>Needed</ToggleButton>
            </ToggleButtonGroup>

            <div className="productsALL"  style={{minHeight:"40vh"}}>
                <div className="rowProd" >
                    {loading ? 
                    showProducts?
                    products.map(product=>(
                           <Product
                            key={product.ProductId}
                            product={product}
                            loggedInUser={loggedInUser}
                            />
                    )):
                    requests.map(request=>(
                        <Request
                        key={request.RequestId}
                        request={request}
                        loggedInUser={loggedInUser}
                        />
                    ))
                    :  <Spinner animation="border" className="m-5"/>
                       }
                    
                        
                </div>
            </div>
            {/* <div className="d-flex justify-content-center">
                <Pagination
                total={products.length}
                />
            </div> */}
            </div>
        <Footer/>
            
        </div>
    )
}

export default Home
