import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table} from 'react-bootstrap';
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
import { Search } from '../DataTable/Search';


const ProductTable = () => {

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [editProductModal,setEditProductModal] = useState(false);
    const [deleteProductModal,setDeleteProductModal] = useState(false);
    const [productV, setProductV] = useState([]);
    const [productD, setProductD] = useState();
    const [search,setSearch] = useState("");
    const [maxProdShow,setMaxProdShow] = useState(10);
    

        useEffect( ()=>{
             getAmOfProducts(maxProdShow); 
             getAllProducts();
        },[maxProdShow]);

        const getAmOfProducts = async (maxProdShow) => {
            try{ 
                await axios.get("http://localhost:5000/api/product/amount/"+maxProdShow)
                .then(res=>{
                    setProducts(res.data)
                })
            }
            catch(e){
                console.log(e);
            }
        }
        const getAllProducts = async () => {
            try{ 
            await axios.get("http://localhost:5000/api/product")
            .then(res=>{
                setAllProducts(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

        const productsData = useMemo ( ()=>{
            let computedProducts = products;

        if(search){
            setProducts(allProducts)
            computedProducts=computedProducts.filter(
                product =>
                    product.ProductName.toLowerCase().includes(search.toLowerCase())||
                    product.ProductCategory.toLowerCase().includes(search.toLowerCase())

            )
        }
        return computedProducts

    },[products,search,allProducts])

    return (
    <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-4">
                                <h2><b>Products</b></h2>
                            </Col>
                            <Col className="col-sm-7 d-flex justify-content-end">
                            <span className="showing-res-txt">Showing {productsData.length} out of {allProducts.length} entries</span>
                                <Search
                                  onSearch={(value)=>{
                                      setSearch(value);
                                  }}
                                  style={{float:"right",width:"200px"}}
                                />
                                <Form.Control
                                    name="ShowAmOfProduct" 
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setMaxProdShow(allProducts.length):setMaxProdShow(e.target.value);
                                        }
                                    }
                                    value={maxProdShow}
                                    >
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="All">All</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nr.</th>
                                <th>Product Name</th>
                                <th>Product Category</th>
                                <th>Freshness</th>
                                <th>Product Description</th>
                                <th>Product Location</th>
                                <th>Product Comment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsData.map((product,i)=>(
                                <tr key={product.ProductId}>
                                <td>#{++i}</td>
                                <td>{product.ProductName}</td>
                                <td>{product.ProductCategory}</td>
                                <td>{product.ProductState}</td>
                                <td>{product.ProductDescription}</td>
                                <td>{product.ProductLocation}</td>
                                <td>{product.ProductComment}</td>
                                <td>
                                    <Button 
                                    onClick={() => {
                                        setEditProductModal(true);
                                        setProductV(product)
                                    }}
                                    className="m-2" 
                                    variant ="warning"
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    <Button 
                                     onClick={() => {
                                        setDeleteProductModal(true);
                                        setProductD(product.ProductId)
                                    }} 
                                     className="delete" 
                                     variant ="danger"
                                     data-toggle="modal"
                                     ><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                       
                        
                    </Table>

                </div>
            </Table>        
        </Container>
        <EditProduct
        show={editProductModal}
        onHide={() => setEditProductModal(false)}
        onUpdate={()=>{
            getAllProducts();
            setEditProductModal(false)
            getAmOfProducts(maxProdShow);
        } }
        product={productV}
        />
        <DeleteProduct
        show={deleteProductModal}
        onHide={() => setDeleteProductModal(false)}
        onUpdate={()=>{
            getAllProducts();
            setEditProductModal(false)
            getAmOfProducts(maxProdShow);
        }}
        productId={productD}
        />
        
    </div>
    )
}

export default ProductTable