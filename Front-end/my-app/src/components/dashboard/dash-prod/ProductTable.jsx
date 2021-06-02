import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'


// document.ready(function(){
// 	// Activate tooltip
// 	'[data-toggle="tooltip"]'.tooltip();
	
// 	// Select/Deselect checkboxes
// 	var checkbox = 'table tbody input[type="checkbox"]';
// 	"#selectAll".click(function(){
// 		if(this.checked){
// 			checkbox.each(function(){
// 				this.checked = true;                        
// 			});
// 		} else{
// 			checkbox.each(function(){
// 				this.checked = false;                        
// 			});
// 		} 
// 	});
// 	checkbox.click(function(){
// 		if(!this.checked){
// 			"#selectAll".prop("checked", false);
// 		}
// 	});
// });


const ProductTable = () => {

    const [products, setProducts] = useState([]);
    const [addProductModal,setAddProductModal] = useState(false);
    const [editProductModal,setEditProductModal] = useState(false);
    const [deleteProductModal,setDeleteProductModal] = useState(false);
    const [productV, setProductV] = useState([]);
    const [productD, setProductD] = useState();

        useEffect(()=>{
            getproducts();
        },[]);


        const getproducts = async () => {
            try{
            const data = await axios.get(`http://localhost:5000/api/product`)
            .then(res=>{
                setProducts(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

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
                            {products.map(product=>(
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
                    <div className="clearfix">
                        <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                        <ul className="pagination">
                            <li className="page-item disabled"><a href="#">Previous</a></li>
                            <li className="page-item"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item active"><a href="#" className="page-link">3</a></li>
                            <li className="pag-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item"><a href="#" className="page-link">Next</a></li>
                        </ul>
                    </div>
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