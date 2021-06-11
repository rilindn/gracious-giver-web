import React, { useEffect, useState } from 'react'
import { Pagination, Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Footer } from '../footer/Footer';
import Header from '../Header/Header';
import Product from './Product';
import axios from 'axios';
import {Switch, Route } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';

const Home = ({loggedInUser}) => {

    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(false);


    useEffect(()=>{
        getproducts();
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

    return (
        <div>
            <Header loggedInUser={loggedInUser} />
           
        <Sidebar />
        <Switch>
          <Route path=""  />
          <Route path="" />
          <Route path="" />
          <Route path="" />
        </Switch>
            <div className="pt-5">
            <h3>Give away or find FREE second hand stuff</h3>
            <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-3">
                <ToggleButton className="border-right m-1" style={{width:"80px"}} value={1}
                >All</ToggleButton>
                <ToggleButton className="m-1" style={{width:"80px"}} value={2}>Free</ToggleButton>
                <ToggleButton className="border-right m-1" style={{width:"80px"}} value={3}>Needed</ToggleButton>
            </ToggleButtonGroup>

            <div className="productsALL">
                <div className="rowProd" >
                    {loading ? 
                    products.map(product=>(
                           <Product
                            key={product.ProductId}
                            product={product}
                            />
                    )) :  <Spinner animation="border" className="m-5"/>
                       }
                    
                        
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Item>{5}</Pagination.Item>
                    <Pagination.Item>{6}</Pagination.Item>
                    <Pagination.Item>{7}</Pagination.Item>
                    <Pagination.Next />
                </Pagination>
            </div>
            </div>
        <Footer/>
            
        </div>
    )
}

export default Home
