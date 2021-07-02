import Header from '../Header/Header'
import Footer from '../footer/Footer'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Form } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications';
import { Redirect } from 'react-router-dom'

const OrganizationDetails = () => {
 
  

  return (
   
    <div>
    <div className="orgdetails">
        
        <Header />
    
        <div className="container bootdey">
        <div className="col-md-12">
          <section className="panel">
            <div className="panel-body">
              <div className="imgorg">
                <div className="pro-img-details">
                  <img id="imgo" src="" alt="" />
                </div>

              </div>
              <div className="detailss">
              <div className="hee">
                <h4 className="pro-d-title">
                  <a href="#" className="tit" style={{fontSize:"25px",color:"green"}}>
                    Name of Organization
                  </a>
                </h4>
                <p style={{marginTop:"30px"}}>
                 description of organization
                </p>
                <div className="product_meta" >
                  <span className="posted_in" style={{marginTop:"30px"}}> <strong>Categories:</strong> <a rel="tag" href="#">Organizata 1</a>, <a rel="tag" href="#">Organizata 1</a>, <a rel="tag" href="#">Organizata 1</a>.</span>
                  <span className="tagged_as" style={{marginTop:"30px"}}><strong>Eventet:</strong> <a rel="tag" href="#">Eventi1</a>, <a rel="tag" href="#">Eventi2</a>.</span>
                  <span className="tagged_as" style={{marginTop:"30px"}}><strong>Iniciativa:</strong> <a rel="tag" href="#">Iniciativa1</a>, <a rel="tag" href="#">Iniciativa2</a>.</span>
                </div>
                
                <p >
                  <button style={{marginTop:"20px"}} className="btn btn-round btn-danger" type="button">Anetarsohu</button>
                  <button style={{marginTop:"20px",marginLeft:"20px"}} className="btn btn-round btn-danger" type="button">Krijo Evente</button>
                </p>
              </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
      <Footer/>
      </div>
  )
}
export default  OrganizationDetails
