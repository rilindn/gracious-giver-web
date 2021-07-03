import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import AddCateg from '../dash-category/AddCateg'
import EditCateg from './EditCateg'
import DeleteCateg from './DeleteCateg'
import { Search } from '../DataTable/Search';


const CategTable = () => { 
 
    const [categs, setCateg] = useState([]);
    const[allCateg, setAllCateg] = useState([]);
    const [addCategModal,setAddCategModal] = useState(false);
    const [editCategModal,setEditCategModal] = useState(false);
    const [deleteCategModal,setDeleteCategModal] = useState(false);
    const [categV, setCategV] = useState([]);
    const [categD, setCategD] = useState();
    const[search, setSearch] = useState("");
    const[maxCategShow, SetMaxCategShow] = useState(10);

        useEffect(()=>{
            getAmOfCateg(maxCategShow);
            getAllCateg();
        },[maxCategShow]);

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
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>Product Category</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {categData.length} out of {allCateg.length} entries</span>
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
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?SetMaxCategShow(allCateg.length):SetMaxCategShow(e.target.value);
                                        }
                                    }
                                    value={maxCategShow}
                                    >
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="All">All</option>
                                 </Form.Control>
                            </Col>
                            <Col className="col-sm-3">
                          
                                <Button 
                                onClick={() => setAddCategModal(true)} 
                                className="btn btn-success" 
                                variant ="success"
                                data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Category</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nr.</th>
                                <th>Product Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categData.map((categ,i)=>(
                                <tr>
                                <td>#{++i}</td>
                                <td>{categ.ProductCategoryName}</td>
                                <td>
                                    <Button 
                                    onClick={() => {setEditCategModal(true);
                                    setCategV(categ)
                                        }}
                                    className="m-2"
                                    variant ="warning"
                                    data-toggle="modal"
                                    ><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => {setDeleteCategModal(true);
                                        setCategD(categ.ProductCategoryId)} }
                                     
                                    className="delete"
                                    variant="danger"
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
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
        onUpdate={()=>{
            getAllCateg();
            setAddCategModal(false)
            getAmOfCateg(maxCategShow);
        } }
        />
        <EditCateg
         show={editCategModal}
         onHide={() => setEditCategModal(false)}
         onUpdate={()=>{
            getAllCateg();
            setEditCategModal(false)
            getAmOfCateg(maxCategShow);
        } }
        categ={categV}
         />
        <DeleteCateg
        show={deleteCategModal}
        onHide={() => setDeleteCategModal(false)} 
        onUpdate={()=>{
            getAllCateg();
            setDeleteCategModal(false)
            getAmOfCateg(maxCategShow);
        } }
        ProductCategoryId={categD}
        />
    </div>
    )
}

export default CategTable