import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

const DashProduct = ({product,updatePhotos}) => {

    
    const [productPhotos,setProductPhotos] = useState([])

    useEffect(()=>{
        
        axios.get("http://localhost:5000/api/productphotos/"+product.ProductId)
        .then(res=>{
        setProductPhotos(res.data)
        }
    )},[product.ProductId,updatePhotos])

    return (
               
           <td className="prod-img-dash-record">{
               productPhotos.map(productPhoto => (
                     <img
                       key={productPhoto.PhotoId}
                       src={`http://localhost:5000/photos/ProductPhotos/${productPhoto.ProductPhotoPath}`}
                       className="img-fluid z-depth-1 prodDetails-Dashimg"
                       alt=""
                     >
                     </img>
             ))}</td>
    )
}

export default DashProduct
