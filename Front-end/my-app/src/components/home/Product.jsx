import React from 'react'
import prod1 from "../../images/prod1.png"
const Product = ({title,image,location}) => {

    const photo = `../../images/${image}`

    return (
        <div>
            <div className="prodCol">
              <div className="home-prod">
                 <img src={photo} width="300px" height="270px" alt="Product Photo"/>
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
