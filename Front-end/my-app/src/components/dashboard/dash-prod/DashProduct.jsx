import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { NotificationManager } from 'react-notifications';

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
                       src={`http://localhost:5000/photos/${productPhoto.ProductPhotoPath}`}
                       className="img-fluid z-depth-1 prodDetails-Dashimg"
                       alt=""
                     >
                     </img>
             ))}</td>
    )
}

export default DashProduct
