import axios from "axios";
import React from "react"
import { NotificationManager } from 'react-notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

const Product = ({product, loggedInUser}) => {

    const defaultImg = "prodImg.jpg"
    const imgSrc = "http://localhost:5000/photos/ProductPhotos/"+
    (product.ProductPhoto===''?defaultImg:(product.ProductPhoto.replace("C:\\fakepath\\", "")));


    const handleBookmark = async () =>{
          try{
          await axios.get('http://localhost:5000/api/bookmark/bookmarked/'+loggedInUser.UserId+"/"+product.ProductId)
          .then((res)=>{
            if(res.data===false){
              axios.post(`http://localhost:5000/api/Bookmark/`,{
                  ProductId:product.ProductId,
                  UserId:loggedInUser.UserId,
              })
              NotificationManager.success(
                'Product has been bookmarked successfully!',
                "",
                2000
              )
          }
          else{
            NotificationManager.error(
            'Product already bookmarked!',
            "",
            2000
          )
            }
          })
        }catch(e){
          console.log(e)
          NotificationManager.error(
            'Problems while bookmarking the product!',
            "",
            1000
          )
        }
    }
    
    return (
        <div>
            <div className="prodCol">
            <FontAwesomeIcon class="bo-prod" onClick={handleBookmark} icon={faBookmark}/>
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
