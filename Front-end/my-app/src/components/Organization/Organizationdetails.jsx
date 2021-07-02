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
                  <a href="#" className="tit" style={{fontSize:"25px",color:"#d92362"}}>
                    Name of Organization
                  </a>
                </h4>
                <p style={{marginTop:"30px",marginBottom:"30px"}}>
                 description of organization
                </p>
                <div className="product_meta" >
                 
                  <span className="tagged_as" style={{marginTop:"40px",marginBottom:"40px"}}><strong>Eventet:</strong> <a rel="" href="#">Eventi1</a>, <a rel="" href="#">Eventi2</a>.</span>
                  <span className="tagged_as" style={{marginTop:"40px",marginBottom:"40px"}}><strong>Iniciativa:</strong> <a rel="" href="#">Iniciativa1</a>, <a rel="" href="#">Iniciativa2</a>.</span>
                </div>
                
                <p >
                  <button style={{marginTop:"40px",backgroundColor:"#d92362"}} className="btn btn-round btn-danger" type="button">Join us</button>
                  <button style={{marginTop:"40px",marginLeft:"40px",backgroundColor:"#d92362"}} className="btn btn-round btn-danger" type="button">Create Events</button>
                </p>
              </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
      <div className="eveent">
          <span style={{color:"#555958",fontSize:"35px",fontWeight:"bold",fontFamily:"Courier New"}}>Events</span>
          <div className="ss"></div>
      </div>

      <div className="eventet">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="ibox">
              <div className="ibox-content product-box">
                <div className="product-imitation">
                  [ INFO ]
                </div>
                <div className="product-desc">
                  <span className="product-price">
                    1
                  </span>
                  <small className="text-muted">First Event</small>
                  <a href="#" className="product-name"> Name of Event</a>
                  <div className="small m-t-xs">
                   Description
                  </div>
                  <div className="m-t text-righ">
                    <a href="#" style={{marginTop:"10px",marginRight:"10px"}} className="btn btn-xs btn-outline btn-primary">Join<i className="fa fa-long-arrow-right" /> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
         
          <div className="col-md-3">
            <div className="ibox">
              <div className="ibox-content product-box">
                <div className="product-imitation">
                  [ INFO ]
                </div>
                <div className="product-desc">
                  <span className="product-price">
                    2
                  </span>
                  <small className="text-muted">Second Event</small>
                  <a href="#" className="product-name"> Event</a>
                  <div className="small m-t-xs">
                   Description
                  </div>
                  <div className="m-t text-righ">
                    <a href="#"  style={{marginTop:"10px",marginRight:"10px"}}  className="btn btn-xs btn-outline btn-primary">Join<i className="fa fa-long-arrow-right" /> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>



      <div className="inicia">
          <h1 style={{color:"#555958",fontSize:"35px",fontWeight:"bold",fontFamily:"Courier New"}}>Iniciatives
</h1>
          <div className="ss"></div>
      </div>

      <div className="iniciativat">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="ibox">
              <div className="ibox-content product-box">
                <div className="product-imitation">
                  [ INFO ]
                </div>
                <div className="product-desc">
                  <span className="product-price">
                    1
                  </span>
                  <small className="text-muted">First Inciativ</small>
                  <a href="#" className="product-name"> Name of  Inciativ</a>
                  <div className="small m-t-xs">
                   Description
                  </div>
                  <div className="m-t text-righ">
                    <a href="#" style={{marginTop:"10px",marginRight:"10px"}} className="btn btn-xs btn-outline btn-primary">Donate<i className="fa fa-long-arrow-right" /> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
         
          <div className="col-md-3">
            <div className="ibox">
              <div className="ibox-content product-box">
                <div className="product-imitation">
                  [ INFO ]
                </div>
                <div className="product-desc">
                  <span className="product-price">
                    2
                  </span>
                  <small className="text-muted">Second Inciative</small>
                  <a href="#" className="product-name"> Iniciative</a>
                  <div className="small m-t-xs">
                   Description
                  </div>
                  <div className="m-t text-righ">
                    <a href="#"  style={{marginTop:"10px",marginRight:"10px"}}  className="btn btn-xs btn-outline btn-primary">Donate<i className="fa fa-long-arrow-right" /> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <Footer/>
      </div>
  )
}
export default  OrganizationDetails
