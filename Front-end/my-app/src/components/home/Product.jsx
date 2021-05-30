import axios from 'axios';
import React, { useEffect, useState } from 'react'
import prod1 from "../../images/prod1.png"
const Product = ({title,image,location}) => {

    const imagesrc = process.env.REACT_APP_PHOTOPATH + image

    return (
        <div>
            <div className="prodCol">
              <div className="home-prod">
                 <img src={image} width="300px" height="270px" alt="Product " className="prodImg"/>
                    <div class="itemText">
                      <h5 className="prodTitle">
                       <span class="itemTypeFree">FREE
                         </span> 
                               {title}
                          </h5>
                          <p className="prodLocation">{location}</p> 
                       </div>
                    </div>
            </div>
        </div>
    )
}

export default Product
