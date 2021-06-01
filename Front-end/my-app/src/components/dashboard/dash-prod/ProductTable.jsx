import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddProduct from '../dash-prod/AddProduct'
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

    return (
    <div>
        <Container class="container-xl">
            <Table class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <Row class="row">
                            <Col class="col-sm-6">
                                <h2><b>Products</b></h2>
                            </Col>
                            <Col class="col-sm-6">
                                <Button 
                                onClick={() => setAddProductModal(true)} 
                                class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Product</span>
                                </Button>
                                <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"><i class="material-icons">&#xE15C;</i> <span>Delete</span></a>						
                            </Col>
                        </Row>
                    </div>
                    <Table className="table striped bordered hover">
                        <thead>
                            <tr>
                                <th>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="selectAll"/>
                                        <label for="selectAll"></label>
                                    </span>
                                </th>
                                <th>Product Name</th>
                                <th>Product Category</th>
                                <th>Product State</th>
                                <th>Product Description</th>
                                <th>Product Location</th>
                                <th>Product Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product=>(
                                <tr>
                                <td>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                                        <label for="checkbox1"></label>
                                    </span>
                                </td>
                                <td>{product.ProductName}</td>
                                <td>{product.ProductCategory}</td>
                                <td>{product.ProductState}</td>
                                <td>{product.ProductDescription}</td>
                                <td>{product.ProductLocation}</td>
                                <td>{product.ProductComment}</td>
                                <td>
                                    <Button 
                                    onClick={() => setEditProductModal(true)} 
                                    class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div class="clearfix">
                        <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                        <ul class="pagination">
                            <li class="page-item disabled"><a href="#">Previous</a></li>
                            <li class="page-item"><a href="#" class="page-link">1</a></li>
                            <li class="page-item"><a href="#" class="page-link">2</a></li>
                            <li class="page-item active"><a href="#" class="page-link">3</a></li>
                            <li class="page-item"><a href="#" class="page-link">4</a></li>
                            <li class="page-item"><a href="#" class="page-link">5</a></li>
                            <li class="page-item"><a href="#" class="page-link">Next</a></li>
                        </ul>
                    </div>
                </div>
            </Table>        
        </Container>
        <EditProduct
         show={editProductModal}
         onHide={() => setEditProductModal(false)}
         />
        <AddProduct
        show={addProductModal}
        onHide={() => setAddProductModal(false)}
        />
    </div>
    )
}

export default ProductTable