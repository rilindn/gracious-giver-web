import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import DeleteOfferedProductResponse from './DeleteOfferedProductResponse'
import { Search } from '../DataTable/Search';
import { NotificationManager } from 'react-notifications'


const OfferedProductResponseTable = ({loggedInUser}) => { 
 
    const [offProdResponses, setoffProdResponses] = useState([]);
    const [alloffProdResponses, setAlloffProdResponses] = useState([]);
    const [deleteOffProdResponsesModal,setDeleteOffProdResponsesModal] = useState(false);
    const [offProdResponsesD, setoffProdResponsesD] = useState();
    const [search,setSearch] = useState("");
    const [maxOffProdResponsesShow, setMaxOffProdResponsesShow] = useState(10);


        useEffect(()=>{
            if(loggedInUser.length!==0){
            getAmOfOffProdResponses(maxOffProdResponsesShow);
            getAllOffProdResponses(); 
            }
        },[maxOffProdResponsesShow,deleteOffProdResponsesModal,loggedInUser]);
        
        const getAmOfOffProdResponses = async (maxOffProdResponsesShow) =>{
            try{
              await axios.get("http://localhost:5000/api/OfferedProductResponse/amount/"+maxOffProdResponsesShow+(loggedInUser.UserRole==="Receiver"?("/receiver/"+loggedInUser.UserId):""))
              .then(res=>{
                  console.log(res.data)
                  setoffProdResponses(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllOffProdResponses = async () => {
            try{ 
            await axios.get("http://localhost:5000/api/OfferedProductResponse/"+(loggedInUser.UserRole==="Receiver"?("/receiver/"+loggedInUser.UserId):""))
            .then(res=>{
                console.log(res.data)
                setAlloffProdResponses(res.data)
            })
            }
            catch(e){
                console.log(e);
            } 
        }


        const offeredProductResponseData = useMemo ( ()=>{
            let computedoffProdResponse = offProdResponses;
    
            if(search){
                computedoffProdResponse=computedoffProdResponse.filter(
                    offProdresponses =>
                    offProdresponses.OfferedProductResponseName.toLowerCase().includes(search.toLowerCase())
                )
            }
            return computedoffProdResponse
    
        },[offProdResponses,search])

        
    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>OffProd Responses</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {offeredProductResponseData.length} of {alloffProdResponses.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfOffProdRequests"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setMaxOffProdResponsesShow(alloffProdResponses.length):setMaxOffProdResponsesShow(e.target.value);
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
                                <th>OffProdResId</th>
                                <th>ResponseName</th>
                                <th>ResponseId</th>
                                <th>ResponseDate</th>
                                <th>OffProductId</th>
                                <th>Message</th>
                                <th>ProdProvId</th>
                                <th>ReceiverId</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offeredProductResponseData.map(offProdresponse=>(
                                <tr>
                                <td>{offProdresponse.OfferedProductResponseId}</td>
                                <td>{offProdresponse.OfferedProductResponseName}</td>
                                <td>{offProdresponse.ResponseId}</td>
                                <td>{offProdresponse.OfferedProductResponseDate}</td>
                                <td>{offProdresponse.OfferedProductId}</td>
                                <td>{offProdresponse.Message}</td>
                                <td>{offProdresponse.ProductProviderId}</td>
                                <td>{offProdresponse.ReceiverId}</td>
                                <td>                                   
                                    <Button 
                                    onClick={() => 
                                        {setDeleteOffProdResponsesModal(true);
                                            setoffProdResponsesD(offProdresponse.OfferedProductResponseId)
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
        <DeleteOfferedProductResponse
        show={deleteOffProdResponsesModal}
        onHide={() => setDeleteOffProdResponsesModal(false)} 
        onUpdate={()=>{
            getAllOffProdResponses();
            setDeleteOffProdResponsesModal(false)
            getAmOfOffProdResponses(maxOffProdResponsesShow);
        } }
        OfferedProductResponseId={offProdResponsesD}
        />
    </div>
    )
}

export default OfferedProductResponseTable