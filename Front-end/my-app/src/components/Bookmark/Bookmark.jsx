import axios from "axios";
import React, { useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications'

const Bookmark = ({bookmark, loggedInUser,updated}) => {

   const [product, setProducts] = useState([]);
   
    useEffect(()=>{
      getBookmarkedProducts();
      },[]);
   
    const getBookmarkedProducts= async () => {
      try{
      await axios.get(`http://localhost:5000/api/product/`+bookmark.ProductId)
      .then(res=>{
          console.log(res.data)
          setProducts(res.data)
      })
      .then(()=>{
        updated()
      })
      }
      catch(e){
          console.log(e);
      }
  } 

  const deleteBookmark= async () => {
    try{
    await axios.delete(`http://localhost:5000/api/bookmark/`+bookmark.BookmarkId)
    .then(res=>{
        console.log(res.data)
        NotificationManager.success(
          'Bookmark deleted succesfully!',
          '',
          2000,
          )
    })
    .then(()=>{
      setTimeout(()=>{
        getBookmarkedProducts();
      },500)
    })
    }
    catch(e){
        console.log(e);
    }
} 

    return (
        <div>
            <div className="prodCol">
            <i className="fas fa-bookmark bo-prod" onClick ={deleteBookmark}></i>
            <a href={`/prodDetails/${product.ProductId}`} >
              <div className="home-prod">
                 <img src={
                   ("http://localhost:5000/photos/ProductPhotos/"+
                  (product.ProductPhoto===undefined?"prodImg.jpg":(product.ProductPhoto.replace("C:\\fakepath\\", ""))))
                } 
                 width="300px" height="270px" alt="Product " className="prodImg"/>
                    <div className="itemText">
                      <h5 className="prodTitle">
                       <span className="itemTypeFree">FREE
                         </span> 
                               {product.ProductName}
                          </h5>
                          <p className="prodLocation">{product.State}, {product.City}</p> 
                       </div>
                    </div>
                  </a>
            </div>
        </div>
    )
}

export default Bookmark
