import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddCateg from '../dash-category/AddCateg'
import EditCateg from './EditCateg'
import DeleteCateg from './DeleteCateg'


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


const CategTable = () => { 
 
    const [categ, setCateg] = useState([]);
    const [addCategModal,setAddCategModal] = useState(false);
    const [editCategModal,setEditCategModal] = useState(false);
    const [deleteCategModal,setDeleteCategModal] = useState(false);


        useEffect(()=>{
            getcateg(); 
        },[]);

        const getcateg = async () => {
            try{ 
            const data = await axios.get(`http://localhost:5000/api/productcategory`)
            .then(res=>{
                console.log(res.data)
                setCateg(res.data)
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
                                <h2><b>Product Category</b></h2>
                            </Col>
                            <Col class="col-sm-6">
                                <Button 
                                onClick={() => setAddCategModal(true)} 
                                class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Product Category</span>
                                </Button>					
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
                                <th>Product Category Id</th>
                                <th>Product Category Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categ.map(categ=>(
                                <tr>
                                <td>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                                        <label for="checkbox1"></label>
                                    </span>
                                </td> 
                                <td>{categ.ProductCategoryId}</td>
                                <td>{categ.ProductCategoryName}</td>
                                <td>
                                    <Button 
                                    onClick={() => setEditCategModal(true)} 
                                    class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => setDeleteCategModal(true)} 
                                     class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Table>  

        </Container>
        <EditCateg
         show={editCategModal}
         onHide={() => setEditCategModal(false)}
         />
        <AddCateg
        show={addCategModal}
        onHide={() => setAddCategModal(false)}
        />

        <DeleteCateg
        show={deleteCategModal}
        onHide={() => setDeleteCategModal(false)} 
        />
    </div>
    )
}

export default CategTable