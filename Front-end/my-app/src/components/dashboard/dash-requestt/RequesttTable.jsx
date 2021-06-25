import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table} from 'react-bootstrap';
import EditRequestt from './EditRequestt'
import DeleteRequestt from './DeleteRequestt'
import { Search } from '../DataTable/Search';
import { NotificationManager } from 'react-notifications'



const RequesttTable = ({loggedInUser})=> {
    
    const [requestts, setRequestts] = useState([]);
    const [allRequestts, setAllRequestts] = useState([]);
    const [editRequesttModal,setEditRequesttModal] = useState(false);
    const [deleteRequesttModal,setDeleteRequesttModal] = useState(false);
    const [requesttV, setRequesttV] = useState([]);
    const [requesttD, setRequesttD] = useState();
    const [search,setSearch] = useState("");
    const [maxRequesttShow, setMaxRequesttShow] = useState(10);

    useEffect(()=>{
        getAmOfRequestts(maxRequesttShow);
        getAllRequestts(); 
    },[maxRequesttShow,editRequesttModal,deleteRequesttModal]);

    const getAmOfRequestts = async (maxRequesttShow) =>{
        try{
          await axios.get("http://localhost:5000/api/Request/amount/" + maxRequesttShow)
          .then(res=>{
              console.log(res.data)
              setRequestts(res.data)
          })  
        }
        catch(e){
            console.log(e);
        }
    }

    const getAllRequestts = async () => {
        try{ 
        await axios.get(`http://localhost:5000/api/Request/`)
        .then(res=>{
            console.log(res.data)
            setAllRequestts(res.data)
        })
        }
        catch(e){
            console.log(e);
        } 
    }

    const requesttData = useMemo ( ()=>{
        let computedRequestt = requestts;

        if(search){
            computedRequestt=computedRequestt.filter(
                requestt =>
                    requestt.requesttName.toLowerCase().includes(search.toLowerCase())
            )
        }
        return computedRequestt

    },[requestts,search])


    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>Requests</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {requesttData.length} of {allRequestts.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfRequestts"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setMaxRequesttShow(allRequestts.length):setMaxRequesttShow(e.target.value);
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
                                <th>Requester</th>
                                <th>Request Description</th>
                                <th>Request Comment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requesttData.map(requestt=>(
                                <tr>
                                <td>{requestt.RequesttId}</td>
                                <td>{requestt.ReceiverId}</td>
                                <td>{requestt.RequestDescription}</td>
                                <td>{requestt.RequestComment}</td>

                                <td>
                                    <Button 
                                    onClick={() => 
                                        {setEditRequesttModal(true);
                                            setRequesttV(requestt)
                                        } }
                                    className="m-2" 
                                    variant ="warning" 
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => 
                                        {setDeleteRequesttModal(true);
                                            setRequesttD(requestt.RequesttId)
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
        <EditRequestt
         show={editRequesttModal}
         onHide={() => setEditRequesttModal(false)}
         onUpdate={()=>{
            getAllRequestts();
            setEditRequesttModal(false)
            getAmOfRequestts(maxRequesttShow);
        } }
         requestt={requesttV}
         />

        <DeleteRequestt
        show={deleteRequesttModal}
        onHide={() => setDeleteRequesttModal(false)} 
        onUpdate={()=>{
            getAllRequestts();
            setDeleteRequesttModal(false)
            getAmOfRequestts(maxRequesttShow);
        } }
        requesttId={requesttD}
        />
    </div>
    )
}

export default RequesttTable