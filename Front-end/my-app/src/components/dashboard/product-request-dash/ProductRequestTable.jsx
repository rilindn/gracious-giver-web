import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import EditRequest from './EditRequest'
import DeleteRequest from './DeleteRequest'
import { Search } from '../DataTable/Search';



const ProductRequestTable = ({loggedInUser}) => { 
 
    const [requests, setRequests] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [editRequestModal,setEditRequestModal] = useState(false);
    const [deleteRequestModal,setDeleteRequestModal] = useState(false);
    const [requestV, setRequestV] = useState([]);
    const [requestD, setRequestD] = useState();
    const [search,setSearch] = useState("");
    const [maxRequestShow, setMaxRequestShow] = useState(1);


        useEffect(()=>{
            getAmOfRequests(maxRequestShow);
            getAllRequests(); 
        },[maxRequestShow,editRequestModal,deleteRequestModal]);
        
        const getAmOfRequests = async (maxRequestShow) =>{
            try{
              await axios.get("http://localhost:5000/api/product_request/request/" +loggedInUser.UserId + "/amount/" + maxRequestShow)
              .then(res=>{
                  console.log(res.data)
                  setRequests(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllRequests = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/product_request/request/` + loggedInUser.UserId)
            .then(res=>{
                console.log(res.data)
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
                        requests.requestName.toLowerCase().includes(search.toLowerCase())
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
                                <h2><b>Product Requests</b></h2>
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
                                            e.target.value==='All'?setMaxRequestShow(allRequests.length):setMaxRequestShow(e.target.value);
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
                                <th>Request Id</th>
                                <th>User Id</th>
                                <th>Product Id</th>
                                <th>Request</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestData.map(request=>(
                                <tr>
                                <td>{request.RequestId}</td>
                                <td>{request.UserId}</td>
                                <td>{request.ProductId}</td>
                                <td>{request.Message}</td>
                                <td>{request.Request_Date}</td>

                                <td>
                                    <Button 
                                    onClick={() => 
                                        {setEditRequestModal(true);
                                            setRequestV(request)
                                        } }
                                    className="m-2" 
                                    variant ="warning" 
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => 
                                        {setDeleteRequestModal(true);
                                            setRequestD(request.RequestId)
                                        }} 
                                     className="delete" 
                                     variant ="danger"
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
        <EditRequest
         show={editRequestModal}
         onHide={() => setEditRequestModal(false)}
         onUpdate={()=>{
            getAllRequests();
            setEditRequestModal(false)
            getAmOfRequests(maxRequestShow);
        } }
         request={requestV}
         />

        <DeleteRequest
        show={deleteRequestModal}
        onHide={() => setDeleteRequestModal(false)} 
        onUpdate={()=>{
            getAllRequests();
            setDeleteRequestModal(false)
            getAmOfRequests(maxRequestShow);
        } }
        requestId={requestD}
        />
    </div>
    )
}

export default ProductRequestTable