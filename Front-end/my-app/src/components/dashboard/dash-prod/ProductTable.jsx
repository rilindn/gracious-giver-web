import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table} from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
import { Search } from '../DataTable/Search';
import Pagination from '../DataTable/Pagination';




const ProductTable = () => {

    const [products, setProducts] = useState([]);
    const [editProductModal,setEditProductModal] = useState(false);
    const [deleteProductModal,setDeleteProductModal] = useState(false);
    const [productV, setProductV] = useState([]);
    const [productD, setProductD] = useState();
    const [search,setSearch] = useState("");
    

        useEffect(()=>{
            getProducts(); 
        },[]);

        const getProducts = async () => {
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


    const productsData = useMemo ( ()=>{
        let computedProducts = products;

        if(search){
            computedProducts=computedProducts.filter(
                product =>
                    product.ProductName.toLowerCase().includes(search.toLowerCase())||
                    product.ProductCategory.toLowerCase().includes(search.toLowerCase())

            )
        }
        return computedProducts

    },[products,search])

    return (
    <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-6">
                                <h2><b>Products</b></h2>
                            </Col>
                            <Col className="col-sm-6">
                                <Search
                                  onSearch={(value)=>{
                                      setSearch(value);
                                  }}
                                  style={{float:"right"}}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
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
                            {productsData.map(product=>(
                                <tr>
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
        product={productV}
        />
        <DeleteProduct
        show={deleteProductModal}
        onHide={() => setDeleteProductModal(false)}
        productId={productD}
        />
        
    </div>
    )
}

export default ProductTable