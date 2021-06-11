import Header from '../Header/Header'
import Footer from '../footer/Footer'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {

  const [product,setProduct] = useState([]);
  const [imgSrc,setImgSrc] = useState();
  const [donator,setDonator] = useState([]);
  let {productId} = useParams();

      
  useEffect(() => {
    showProdDetails();
    getDonator();
  });

  const showProdDetails = async () => {
    try{
      await axios.get("http://localhost:5000/api/product/"+productId)
      .then(res=>{
          setProduct(res.data);
          const defaultImg = "prodImg.jpg"
          if(product.ProductPhoto!==undefined){
          setImgSrc("http://localhost:5000/photos/"+(product.ProductPhoto===''?defaultImg:((product.ProductPhoto).replace("C:\\fakepath\\", ""))))
          }
    })}
      catch(e){
        console.log(e);
    }
  }
  
  const getDonator = async () => {
    try{
      await axios.get("http://localhost:5000/api/user/"+product.DonatorId)
      .then(res=>{
        setDonator(res.data)
      })
    }catch(e)
    {
      console.log(e)
    }
  }

  return (
    /* <div class="container p-4 my-4 border">
          <div class="row">
           <div class="col-sm-6 ">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem magnam sequi repellat enim fugiat temporibus. Sint non totam facere aperiam labore. Quod nisi incidunt quis impedit, mollitia rem sapiente consequatur.</p>
              </div>
           <div class="col-sm-6 ">
             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt odio hic quas impedit iusto omnis rerum fugiat fuga dignissimos quos, veniam animi totam deleniti? Voluptates debitis beatae ea eius ab!</p>
             </div>


             <section class="mb-5">*/
    
    <div class="">
      <Header></Header>
      <div className="col-12">
        <div class="container p-3 my-3 border" id="prdetail">
          <div class="row">
            <div class="col-md-6 mb-4 mb-md-0">
              <div id="mdb-lightbox-ui"></div>

              <div class="mdb-lightbox">
                <div class="row product-gallery mx-1">
                  <div class="col-12 mb-0">
                    <figure
                      id="figure01"
                      class="view overlay rounded z-depth-1 main-img"
                    >
                      <img src={imgSrc} class="img-fluid z-depth-1" alt=""></img>
                    </figure>
                    <figure
                      id="figure01"
                      class="view overlay rounded z-depth-1"
                    ></figure>
                    <figure
                      id="figure01"
                      class="view overlay rounded z-depth-1"
                    ></figure>
                    <figure
                      id="figure01"
                      class="view overlay rounded z-depth-1"
                    ></figure>
                  </div>
                  <div class="col-12">
                    <div class="row ">
                      <div class="col-3">
                        <div class="view overlay rounded z-depth-1 gallery-item">
                          <img
                            src={imgSrc}
                            class="img-fluid z-depth-1"
                            alt=""
                          ></img>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="view overlay rounded z-depth-1 gallery-item">
                          <img
                            src={imgSrc}
                            class="img-fluid z-depth-1"
                            alt=""
                          ></img>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="view overlay rounded z-depth-1 gallery-item">
                          <img
                            src={imgSrc}
                            class="img-fluid z-depth-1"
                            alt=""
                          ></img>
                          <div class="mask rgba-white-slight"></div>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="view overlay rounded z-depth-1 gallery-item">
                          <div class="mask rgba-white-slight"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="prDetail" class="col-md-6 prDetail">
              <h5>{product.ProductName}</h5>
              <p class="mb-2 text-muted text-uppercase small">{product.ProductState}</p>

              <p>
                <span class="mr-1">
                  <strong>value </strong> indefinite
                </span>
              </p>
              <p class="pt-1">
              {product.ProductDescription}
              </p>
              <div class="table-responsive">
                <table class="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th class="pl-0 w-25" scope="row">
                        <strong>Category</strong>
                      </th>
                      <td>{product.ProductCategory}</td>
                    </tr>
                    <tr>
                      <th class="pl-0 w-25" scope="row">
                        <strong>Location</strong>
                      </th>
                      <td>{product.ProductLocation}</td>
                    </tr>
                    <tr>
                      <th class="pl-0 w-25" scope="row">
                        <strong>Donator</strong>
                      </th>
                      <td>{donator.UserName}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <form className="d-flex justify-content-center align-items-start">
                <textarea
                placeholder="Why do you need this product..."
                rows="3"
                >

                </textarea>
              <button type="button" class="btn btn-primary btn-md mr-1 mb-2">
                Request{' '}
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default ProductDetails
