import axios from "axios";
import { useEffect, useState } from "react"
import prod1 from "../../images/dinningTable.jpg"
const Product = ({title,image,location}) => {

    const defaultImg = "prodImg.jpg"
    const imgSrc = `http://localhost:5000/photos/${image.replace("C:\\fakepath\\", "")}`;

    return (
        <div>
            <div className="prodCol">
              <div className="home-prod">
                 <img src={imgSrc} width="300px" height="270px" alt="Product " className="prodImg"/>
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
