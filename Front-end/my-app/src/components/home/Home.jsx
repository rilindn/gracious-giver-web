import React, { useEffect, useState } from 'react'
import { Pagination, Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import prod1 from "../../images/prod1.png"
import prod2 from "../../images/prod2.png"
import { Footer } from './../footer/Footer';
import Header from './../Header/Header';
import Sidebar from './../Sidebar/Sidebar';
import Product from './Product';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Axios from 'axios';
import axios from 'axios';


const Home = (props) => {

    const [products, setProducts] = useState([]);
    const [loading,setLodaing] = useState(false);


    useEffect(()=>{
        getproducts();
    },[]);

    const getproducts = async () => {
        try{
        const data = await axios.get(`http://localhost:5000/api/product`)
        .then(res=>{
            console.log(res)
            setProducts(res.data)
        })
        setLodaing(true);
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <Header/>
            <Router>
        <Sidebar />
        <Switch>
          <Route path=""  />
          <Route path="" />
          <Route path="" />
        </Switch>
      </Router>
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
                        title={product.ProductName}
                        image={product.ProductPhoto}
                        location={product.ProductLocation}
                        />
                    )) :  <Spinner animation="border" className="m-5"/>}
                    
                        
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev style={{backgroundColor:"greenyellow"}} />
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
