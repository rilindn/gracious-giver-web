import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import EditOrganization from './EditOrganization'
import DeleteOrganization from './DeleteOrganization'
import { Search } from '../DataTable/Search';
import StateTable from './../dash-state/StateTable';


const OrganizationTable = () => { 
 
    const [organizations, setOrganizations ] = useState([]);
    const[allOrganizations, setAllOrganization] = useState([]);
    const [editOrganizationModal,setEditOrganizationModal] = useState(false);
    const [deleteOrganizationModal,setDeleteOrganizationModal] = useState(false);
    const [OrganizationV, setOrganizationV] = useState([]);
    const [OrganizationD, setOrganizationD] = useState();
    const[search, setSearch] = useState("");
    const[maxOrganizationShow, SetMaxOrganizationShow] = useState(10);

        useEffect(()=>{
            getAmOfOrganization(maxOrganizationShow);
            getAllOrganization();
        },[maxOrganizationShow]);

        const getAmOfOrganization = async (maxOrganizationShow) =>{
            try{
              await axios.get("http://localhost:5000/api/Organization/amount/" + maxOrganizationShow)
              .then(res=>{
                setOrganizations(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllOrganization = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/Organization`)
            .then(res=>{
                console.log(res.data)
                setAllOrganization(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

        const OrganizationData = useMemo( ()=>{
            let computedOrganization = organizations;
    
            if(search){
                computedOrganization = computedOrganization.filter(
                    organizations => 
                    organizations.Name.toLowerCase().includes(search.toLowerCase()) 
                        
                )
            }
            return computedOrganization
        },[organizations, search])

    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>Organizations</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {OrganizationData.length} out of {allOrganizations.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfOrganization"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?SetMaxOrganizationShow(allOrganizations.length):SetMaxOrganizationShow(e.target.value);
                                        }
                                    }
                                    value={maxOrganizationShow}
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
                                <th>Organization Name</th>
                                <th>Logo</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Documentation</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody
                        style={{overflow:"hidden", overflowY: "scroll"}}
                        >
                            {OrganizationData.map((Organization,i)=>(
                                <tr>
                                <td>#{++i}</td>
                                <td>{Organization.Name}</td>
                                <td>
                                <img 
                                style={{width:"50px"}}
                                src={"http://localhost:5000/photos/organization/"+
                                (Organization.Logo===''?"prodImg.jpg":Organization.Logo)} 
                                alt="." />
                                </td>
                                <td>{Organization.Category}</td>
                               <td>{Organization.Description.substring(0,20)}...</td>
                                <td>
                                <a 
                                style={{width:"50px"}}
                                href={"http://localhost:5000/photos/organization/"+
                                (Organization.Documentation===''?"prodImg.jpg":Organization.Documentation)}>
                                {Organization.Documentation.substring(0, 7)} ...
                                <i class="fas fa-download"></i></a>
                                </td>
                                <td>{Organization.State}</td>
                                <td>{Organization.City}</td>

                                

                                <td>
                                    <Button 
                                    onClick={() => {setEditOrganizationModal(true);
                                    setOrganizationV(Organization)
                                        }}
                                    className="m-2"
                                    variant ="warning"
                                    data-toggle="modal"
                                    ><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => {setDeleteOrganizationModal(true);
                                        setOrganizationD(Organization.OrganizationId)} }
                                     
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
        <EditOrganization
         show={editOrganizationModal}
         onHide={() => setEditOrganizationModal(false)}
         onUpdate={()=>{
            getAllOrganization();
            setEditOrganizationModal(false)
            getAmOfOrganization(maxOrganizationShow);
        } }
        organization={OrganizationV}
         />
        <DeleteOrganization
        show={deleteOrganizationModal}
        onHide={() => setDeleteOrganizationModal(false)} 
        onUpdate={()=>{
            getAllOrganization();
            setDeleteOrganizationModal(false)
            getAmOfOrganization(maxOrganizationShow);
        } }
        OrganizationId={OrganizationD}
        />
    </div>
    )
}

export default OrganizationTable