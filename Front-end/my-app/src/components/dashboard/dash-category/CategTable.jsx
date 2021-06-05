import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddCateg from '../dash-category/AddCateg'
import EditCateg from './EditCateg'
import DeleteCateg from './DeleteCateg'
import { Search } from '../DataTable/Search';
import Pagination from '../DataTable/Pagination';


const CategTable = () => { 
 
    const [categs, setCateg] = useState([]);
    const[allCateg, setAllCateg] = useState([]);
    const [addCategModal,setAddCategModal] = useState(false);
    const [editCategModal,setEditCategModal] = useState(false);
    const [deleteCategModal,setDeleteCategModal] = useState(false);
    const [categV, setCategV] = useState([]);
    const [categD, setCategD] = useState();
    const[search, setSearch] = useState("");
    const[maxCategShow, SetMaxCategShow] = useState(1);

        useEffect(()=>{
            getAmOfCateg(maxCategShow);
            getAllCateg();
        },[]);

        const getAmOfCateg = async (maxCategShow) =>{
            try{
              await axios.get("http://localhost:5000/api/productcategory/amount/" + maxCategShow)
              .then(res=>{
                setCateg(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllCateg = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/productcategory`)
            .then(res=>{
                console.log(res.data)
                setAllCateg(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

        const changeAm = () =>{
            if(maxCategShow==='All'){
                setCateg(allCateg)
            }
            else
            getAmOfCateg(maxCategShow);
        }

        const categData = useMemo( ()=>{
            let computedCateg = categs;
    
            if(search){
                computedCateg = computedCateg.filter(
                    categ => 
                        categ.ProductCategoryName.toLowerCase().includes(search.toLowerCase()) 
                        
                )
            }
            return computedCateg
        },[categs, search])

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
                            <Col className ="col-sm-7 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {categData.length} of {allCateg.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfCateg"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>{SetMaxCategShow(e.target.value)}}
                                    value={maxCategShow}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="All">All</option>
                                 </Form.Control>
                                 <Button
                                    variant="info"
                                    onClick={changeAm}
                                    className="ml-1"
                                    style={{height:"37px"}}
                                    >
                                    Set entries
                                </Button>
                            </Col>
                            <Col class="col-sm-6">
                          
                                <Button 
                                onClick={() => setAddCategModal(true)} 
                                class="btn btn-success" 
                                variant ="success"
                                data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Category</span>
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