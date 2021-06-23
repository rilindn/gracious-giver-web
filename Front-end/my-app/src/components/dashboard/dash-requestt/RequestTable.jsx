import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table} from 'react-bootstrap';

import { Search } from '../DataTable/Search';




   
function RequestTable(){
    return (
    <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-4">
                                <h2><b>Request</b></h2>
                            </Col>
                            <Col className="col-sm-7 d-flex justify-content-end">
                            <span className="showing-res-txt">Showing out of  entries</span>
                                <Search
                                
                                />
                                <Form.Control
                                    name="ShowAmOfProduct" 
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
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
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                

                                <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                               
                                <td></td>
                               
                                <td>
                                    
                                    <Button 
                                    
                                    className="m-2" 
                                    variant ="warning"
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    <Button 
                                    
                                     className="delete" 
                                     variant ="danger"
                                     data-toggle="modal"
                                     ><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                            </tr>
                        
                        </tbody>
                       
                        
                    </Table>

                </div>
            </Table>        
        </Container>
        
    </div>
    )
    }

export default RequestTable