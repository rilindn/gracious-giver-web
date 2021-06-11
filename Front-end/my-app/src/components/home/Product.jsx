import React from "react"
const Product = ({product}) => {

    const defaultImg = "prodImg.jpg"
    const imgSrc = "http://localhost:5000/photos/"+(product.ProductPhoto===''?defaultImg:(product.ProductPhoto.replace("C:\\fakepath\\", "")));

    
    return (
        <div>
            <div className="prodCol">
            <a href={`/prodDetails/${product.ProductId}`} >
              <div className="home-prod">
                 <img src={imgSrc} width="300px" height="270px" alt="Product " className="prodImg"/>
                    <div class="itemText">
                      <h5 className="prodTitle">
                       <span class="itemTypeFree">FREE
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
