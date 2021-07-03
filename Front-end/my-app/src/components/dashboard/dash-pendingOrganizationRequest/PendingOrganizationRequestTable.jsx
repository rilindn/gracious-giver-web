import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Search } from '../DataTable/Search';
import { NotificationManager } from 'react-notifications'
import Request from './Request';



const PendingOrganizationRequestTable = ({loggedInUser}) => { 
 
    const [requests, setRequests] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [search,setSearch] = useState("");
    const [maxRequestShow, setMaxRequestShow] = useState(10);


        useEffect(()=>{
            if(loggedInUser.length!==0){
            getAmOfRequests(maxRequestShow);
            getAllRequests(); 
            }
        },[maxRequestShow,loggedInUser]);
        
        const getAmOfRequests = async (maxRequestShow) =>{
            try{
              await axios.get("http://localhost:5000/api/PendingOrganizationsRequest/amount/" + maxRequestShow)
              .then(res=>{
                  setRequests(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllRequests = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/PendingOrganizationsRequest`)
            .then(res=>{
                setAllRequests(res.data)
            })
            }
            catch(e){
                console.log(e);
            } 
        }




        const requestData = useMemo ( ()=>{
            let computedRequest = requests;
    
            if(search){
                computedRequest=computedRequest.filter(
                    requests =>
                        requests.Name.toLowerCase().includes(search.toLowerCase()) ||
                        requests.Username.toLowerCase().includes(search.toLowerCase())
                )
            }
            return computedRequest
            
        },[requests,search])

        
    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>Organization Requests</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {requestData.length} of {allRequests.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfRequests"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setMaxRequestShow(maxRequestShow):setMaxRequestShow(e.target.value);
                                        }
                                    }
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
                        <tbody>
                            {requestData.map((request,i)=>(
                                <Request 
                                request={request} 
                                i={i} 
                                loggedInUser={loggedInUser}
                                onUpdate={()=>{
                                    getAmOfRequests(maxRequestShow);
                                    getAllRequests();
                                }}
                                />
                            ))}
                        </tbody>
                    </Table>
                          
                </div>
            </Table>  

        </Container>
        {/* <DeleteRequest
        show={deleteRequestModal}
        onHide={() => setDeleteRequestModal(false)} 
        onUpdate={()=>{
            getAllRequests();
            setDeleteRequestModal(false)
            getAmOfRequests(maxRequestShow);
        } }
        requestId={requestD}
        /> */}
    </div>
    )
}

export default PendingOrganizationRequestTable