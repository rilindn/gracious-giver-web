import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import AddOrganizationCategory from './AddOrganizationCategory'
import EditOrganizationCategory from './EditOrganizationCategory'
import DeleteOrganizationCategory from './DeleteOrganizationCategory'
import { Search } from '../DataTable/Search';


const CategoryTable = () => { 
 
    const [categories, setCategory] = useState([]);
    const[allCategory, setAllCategory] = useState([]);
    const [addCategoryModal,setAddCategoryModal] = useState(false);
    const [editCategoryModal,setEditCategoryModal] = useState(false);
    const [deleteCategoryModal,setDeleteCategoryModal] = useState(false);
    const [CategoryV, setCategoryV] = useState([]);
    const [CategoryD, setCategoryD] = useState();
    const[search, setSearch] = useState("");
    const[maxCategoryShow, SetMaxCategoryShow] = useState(10);

        useEffect(()=>{
            getAmOfCategory(maxCategoryShow);
            getAllCategory();
        },[maxCategoryShow]);

        const getAmOfCategory = async (maxCategoryShow) =>{
            try{
              await axios.get("http://localhost:5000/api/OrganizationCategory/amount/" + maxCategoryShow)
              .then(res=>{
                setCategory(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllCategory = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/OrganizationCategory`)
            .then(res=>{
                console.log(res.data)
                setAllCategory(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

        const CategoryData = useMemo( ()=>{
            let computedCategory = categories;
    
            if(search){
                computedCategory = computedCategory.filter(
                    categories => 
                    categories.ProductCategoryoryName.toLowerCase().includes(search.toLowerCase()) 
                        
                )
            }
            return computedCategory
        },[categories, search])

    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>Organization Category</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {CategoryData.length} out of {allCategory.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfCategory"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?SetMaxCategoryShow(allCategory.length):SetMaxCategoryShow(e.target.value);
                                        }
                                    }
                                    value={maxCategoryShow}
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
                                onClick={() => setAddCategoryModal(true)} 
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
                                <th>Organization Category Id</th>
                                <th>Organization Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CategoryData.map(Category=>(
                                <tr>
                                <td>{Category.OrganizationCategoryId}</td>
                                <td>{Category.OrganizationCategoryName}</td>
                                <td>
                                    <Button 
                                    onClick={() => {setEditCategoryModal(true);
                                    setCategoryV(Category)
                                        }}
                                    className="m-2"
                                    variant ="warning"
                                    data-toggle="modal"
                                    ><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => {setDeleteCategoryModal(true);
                                        setCategoryD(Category.OrganizationCategoryId)} }
                                     
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
        <AddOrganizationCategory
        show={addCategoryModal}
        onHide={() => setAddCategoryModal(false)}
        onUpdate={()=>{
            getAllCategory();
            setAddCategoryModal(false)
            getAmOfCategory(maxCategoryShow);
        } }
        />
        <EditOrganizationCategory
         show={editCategoryModal}
         onHide={() => setEditCategoryModal(false)}
         onUpdate={()=>{
            getAllCategory();
            setEditCategoryModal(false)
            getAmOfCategory(maxCategoryShow);
        } }
        category={CategoryV}
         />
        <DeleteOrganizationCategory
        show={deleteCategoryModal}
        onHide={() => setDeleteCategoryModal(false)} 
        onUpdate={()=>{
            getAllCategory();
            setDeleteCategoryModal(false)
            getAmOfCategory(maxCategoryShow);
        } }
        OrganizationCategoryId={CategoryD}
        />
    </div>
    )
}

export default CategoryTable