import Header from '../Header/Header'
import Footer from '../footer/Footer'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const ProductDetails = ({loggedInUser}) => {
  
  var {productId} = useParams();
  const [product, setProduct] = useState([]);
  const [donator,setDonator] = useState([]);
  const [productPhotos,setProductPhotos] = useState([])
  const [bigImg,setBigImg] = useState()
  
 


    useEffect(()=>{
      getProductData();
    // eslint-disable-next-line
    },[]);

    const getProductData = async () => {
        try{
        await axios.get(`http://localhost:5000/api/product/`+productId)
        .then(res=>{
            setProduct(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }
      if(product.ProductPhoto!==undefined){
        const defaultImg = "prodImg.jpg"
        var imgSrc = "http://localhost:5000/photos/"+
        (product.ProductPhoto===''?defaultImg:(product.ProductPhoto).replace("C:\\fakepath\\", ""))
      }
      
      if(product.DonatorId!==undefined && donator.length===0){
        axios.get("http://localhost:5000/api/user/"+product.DonatorId)
        .then(res=>{
          setDonator(res.data)
        })
      }
      if(product.ProductId!==undefined && productPhotos.length===0){
        axios.get("http://localhost:5000/api/productphotos/"+product.ProductId)
        .then(res=>{
          setProductPhotos(res.data)
        })
      }


      const displaySelectedImage = (e) => {
        var imgSrc = `http://localhost:5000/photos/${e}`
        setBigImg(imgSrc);
      }

      // const insertRequest = (event) => {
      //   event.proeventDefault();
      //    axios.post(`http://localhost:5000/api/product_request`, {
      //     UserId:"17",
      //     ProductId:"1",
      //     Message: "fdssf",
      //     Request_Date: "2000-11-11T00:00:00"
      //   })
      //   .then((res)=>{
      //     //<Redirect to={`prodDetails/${productId}`}/>
      //   })
      //   ,(error=>{
      //     console.log(error);
      //   })
      //   }
        const insertRequest = (event) => {
          event.preventDefault();
          axios.post('http://localhost:5000/api/product_request', {
            UserId:"17",
            ProductId:"1",
            Request_Date: "2000-11-11T00:00:00"
          })
          .then(
            (res) =>{
              console.log(res.data); 
              <Redirect to="/home"/>
            },
            (error) =>{
              console.log(error)
            },
          )
        }
      


  return (
   
    
    <div className="">
      <Header loggedInUser={loggedInUser}></Header>
        {/* <div className="container p-4 my-4 border">
          <div className="row">
           <div className="col-sm-6 ">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem magnam sequi repellat enim fugiat temporibus. Sint non totam facere aperiam labore. Quod nisi incidunt quis impedit, mollitia rem sapiente consequatur.</p>
              </div>
           <div className="col-sm-6 ">
             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt odio hic quas impedit iusto omnis rerum fugiat fuga dignissimos quos, veniam animi totam deleniti? Voluptates debitis beatae ea eius ab!</p>
             </div>


             <section className="mb-5"></section> */}
            <div className="col-12">
        <div className="container p-3 my-3 border" id="prdetail">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <div id="mdb-lightbox-ui"></div>

              <div className="mdb-lightbox">
                <div className="row product-gallery mx-1">
                  <div className="col-12 mb-0">
                    <figure
                      id="figure01"
                      className="view overlay rounded z-depth-1 main-img"
                    >
                      <img src={bigImg?bigImg:imgSrc} className="img-fluid z-depth-1 prodDetails-img" alt=""></img>
                    </figure>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      {
                        productPhotos.map((productPhoto,i) => (
                          <div key={productPhoto.PhotoId} className="col-3 mb-3">
                          <div className="view overlay rounded z-depth-1 gallery-item">
                            <img
                              src={`http://localhost:5000/photos/${productPhoto.ProductPhotoPath}`}
                              className="img-fluid z-depth-1 prodDetails-2img"
                              alt=""
                              onClick={() => displaySelectedImage(productPhoto.ProductPhotoPath)}
                            />
                          </div>
                        </div>
                        ))
                      }
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="prDetail" className="col-md-6 prDetail">
              <h5>{product.ProductName}</h5>
              <p className="mb-2 text-muted text-uppercase small">{product.ProductState}</p>

              <p>
                <span className="mr-1">
                  <strong>value </strong> indefinite
                </span>
              </p>
              <p className="pt-1">
              {product.ProductDescription}
              </p>
              <div className="table-responsive">
                <table className="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th className="pl-0 w-25" scope="row">
                        <strong>Category</strong>
                      </th>
                      <td>{product.ProductCategory}</td> 
                    </tr>
                    <tr>
                      <th className="pl-0 w-25" scope="row">
                        <strong>Location</strong>
                      </th>
                      <td>{product.ProductLocation}</td>
                    </tr>
                    <tr>
                      <th className="pl-0 w-25" scope="row">
                        <strong>Donator</strong>
                      </th>
                      <td>{donator.UserName}</td>
                    </tr>
                    <tr>
                      <th className="pl-0 w-25" scope="row">
                        <strong>Comment</strong>
                      </th>
                      <td>{product.ProductComment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <form className="d-flex justify-content-start align-items-start">
                <textarea
                name = "Message"
                placeholder="I need this product because..."
                rows="3"
                className="pl-2 req-prod-textarea"
                >

                </textarea>
              <button type="submit" onClick={() => insertRequest()} className="btn btn-primary btn-md mr-1 mb-2">
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
