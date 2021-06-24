import axios from "axios";
import React from "react"
import { NotificationManager } from 'react-notifications'

const Product = ({product, loggedInUser}) => {

    const defaultImg = "prodImg.jpg"
    const imgSrc = "http://localhost:5000/photos/"+
    (product.ProductPhoto===''?defaultImg:(product.ProductPhoto.replace("C:\\fakepath\\", "")));


    const handleBookmark = async () =>{
          await axios.post(`http://localhost:5000/api/Bookmark/`,{
              ProductId:product.ProductId,
              UserId:loggedInUser.UserId,
          })
          .then (()=>{
            NotificationManager.success(
              'Product has been bookmarked succefsully!',
              "",
              2000
            )
          },
          (error) => {
            NotificationManager.error(
            'Error while bookmarking the product!',
            '',
            1000,
            )
        },
      )
    }
    
    return (
        <div>
            <div className="prodCol">
            <i class="fas fa-bookmark bo-prod" onClick={handleBookmark} ></i>
            <a href={`/prodDetails/${product.ProductId}`} >
              <div className="home-prod">
                 <img src={imgSrc} 
                 width="300px" height="270px" alt="Product " className="prodImg"/>
                    <div className="itemText">
                      <h5 className="prodTitle">
                       <span className="itemTypeFree">FREE
                         </span> 
                               {product.ProductName}
                          </h5>
                          <p className="prodLocation">{product.ProductLocation}</p> 
                       </div>
                    </div>
                  </a>
            </div>
        </div>
    )
}

export default Product
