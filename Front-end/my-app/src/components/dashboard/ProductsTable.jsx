import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';


const ProductTable = () => {

    
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        getproducts();
    },[]);

    const getproducts = async () => {
        try{
        const data = await axios.get(`http://localhost:5000/api/product`)
        .then(res=>{
            console.log(res.data)
            setProducts(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const count = 0;

  const data = {
    columns: [
      {
        label: 'ProductName',
        field: 'productname',
        sort: 'asc',
        width: 150
      },
      {
        label: 'ProductCategory',
        field: 'productcategory',
        sort: 'asc',
        width: 150
      },
      {
        label: 'ProductLocation',
        field: 'productlocation',
        sort: 'asc',
        width: 270
      }
    ],
    rows: [

      //  products.map(product=>(
      //   {   
      //       productname: {product.ProductName},
      //       productcategory: {product.ProductCategory},
      //       productlocation: {product.Productlocation}
      //     }
      //  ))      
    ]
  };


  return (
      <div>
    <MDBDataTable
      scrollX
      striped
      bordered
      data={data}
      className="w-800 p-5"
    />
    {products.map(product=>(
        console.log(product.ProductName)
     ))}
    </div>
    
  );
}

export default ProductTable;
