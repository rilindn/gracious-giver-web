/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import {Col, Container, Form, Row, Table } from 'react-bootstrap';
import DeleteResponse from './DeleteResponse'
import { Search } from '../DataTable/Search';
import Response from './Response';


const ResponseTable = ({loggedInUser}) => { 
 
    const [responses, setResponses] = useState([]);
    const [allResponses, setAllResponses] = useState([]);
    const [deleteResponseModal,setDeleteResponseModal] = useState(false);
    const [responseD, setResponseD] = useState();
    const [search,setSearch] = useState("");
    const [maxResponseShow, setMaxResponseShow] = useState(10);

        useEffect(()=>{
            if(loggedInUser.length!==0){
            getAmOfResponses(maxResponseShow);
            getAllResponses(); 
            }
        },[maxResponseShow,deleteResponseModal,loggedInUser]);
        
        const getAmOfResponses = async (maxResponseShow) =>{
            try{
              await axios.get("http://localhost:5000/api/ProductRequestResponse/amount/"+maxResponseShow+(loggedInUser.UserRole==="Donator"?("/donator/"+loggedInUser.UserId):(loggedInUser.UserRole==="Receiver"?("/receiver/"+loggedInUser.UserId):"")))
              .then(res=>{
                  console.log(res.data)
                  setResponses(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllResponses = async () => {
            try{ 
            await axios.get("http://localhost:5000/api/ProductRequestResponse/"+(loggedInUser.UserRole==="Donator"?("donator/"+loggedInUser.UserId):(loggedInUser.UserRole==="Receiver"?("receiver/"+loggedInUser.UserId):"")))
            .then(res=>{
                console.log(res.data)
                setAllResponses(res.data)
            })
            }
            catch(e){
                console.log(e);
            } 
        }


        const responseData = useMemo ( ()=>{
            let computedResponse = responses;
    
            if(search){
                computedResponse=computedResponse.filter(
                    responses =>
                    responses.Response.toLowerCase().includes(search.toLowerCase())
                )
            }
            return computedResponse
    
        },[responses,search])

        
    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b> Responses</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {responseData.length} of {allResponses.length} entries</span>
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
                                            e.target.value==='All'?setMaxResponseShow(allResponses.length):setMaxResponseShow(e.target.value);
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
                                <th>Nr</th>
                                <th>Receiver</th>
                                <th>Donator</th>
                                <th>Product</th>
                                <th>Message</th>
                                <th>Response</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                            {responseData.map((response,i)=>(
                                <Response
                                response={response}
                                i={i}
                                onUpdate={()=>{
                                    setDeleteResponseModal(true);
                                    setResponseD(response.ProductRequestResponseId)
                                }}
                                />
                            ))}
                    </Table>
                          
                </div>
            </Table>  

        </Container>
        <DeleteResponse
        show={deleteResponseModal}
        onHide={() => setDeleteResponseModal(false)} 
        onUpdate={()=>{
            getAllResponses();
            setDeleteResponseModal(false)
            getAmOfResponses(maxResponseShow);
        } }
        ProductRequestResponseId={responseD}
        />
    </div>
    )
}

export default ResponseTable