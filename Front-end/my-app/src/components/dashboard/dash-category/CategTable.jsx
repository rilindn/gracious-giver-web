import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddCateg from '../dash-category/AddCateg'
import EditCateg from './EditCateg'
import DeleteCateg from './DeleteCateg'


const CategTable = () => { 
 
    const [categs, setCateg] = useState([]);
    const [addCategModal,setAddCategModal] = useState(false);
    const [editCategModal,setEditCategModal] = useState(false);
    const [deleteCategModal,setDeleteCategModal] = useState(false);
    const [categV, setCategV] = useState([]);
    const [categD, setCategD] = useState();

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
                                class="btn btn-success" variant="success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Product Category</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product Category Id</th>
                                <th>Product Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categs.map(categ=>(
                                <tr>
                                <td>{categ.ProductCategoryId}</td>
                                <td>{categ.ProductCategoryName}</td>
                                <td>
                                    <Button 
                                    onClick={() => {setEditCategModal(true);
                                    setCategV(categ)
                                        }}
                                    className="m-2"
                                    variant ="warning"
                                    data-toggle="modal"
                                    ><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => {setDeleteCategModal(true);
                                        setCategD(categ.ProductCategoryId)} }
                                     
                                    class="delete"
                                    variant="danger"
                                    data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
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
        <AddCateg
        show={addCategModal}
        onHide={() => setAddCategModal(false)}
        
        />
        <EditCateg
         show={editCategModal}
         onHide={() => setEditCategModal(false)}
        categ={categV}
         />
     

        <DeleteCateg
        show={deleteCategModal}
        onHide={() => setDeleteCategModal(false)} 
        ProductCategoryId={categD}
        />
    </div>
    )
}

export default CategTable