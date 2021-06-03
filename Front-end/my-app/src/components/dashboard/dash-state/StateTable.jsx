import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddState from '../dash-state/AddState'
import EditState from './EditState'
import DeleteState from './DeleteState'
import { Search } from '../DataTable/Search';
import Pagination from '../DataTable/Pagination';





const StateTable = () => {

    const [states, setStates] = useState([]);
    const [addStateModal,setAddStateModal] = useState(false);
    const [editStateModal,setEditStateModal] = useState(false);
    const [deleteStateModal,setDeleteStateModal] = useState(false);
    const [StateV, setStateV] = useState([]);
    const [StateD, setStateD] = useState();
    const [search,setSearch] = useState("");

        useEffect(()=>{
            getstates();
        },[]);


        const getstates = async () => {
            try{
            const data = await axios.get(`http://localhost:5000/api/Shteti`)
            .then(res=>{
                console.log(res.data)
                setStates(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

        const statesData = useMemo( ()=>{
            let computedStates = states;
    
            if(search){
                computedStates=computedStates.filter(
                    state =>
                        state.Emri.toLowerCase().includes(search.toLowerCase())
    
                )
            }
            return computedStates
    
        },[states,search])

    return (
    <div>
        <Container class="container-xl">
            <Table class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <Row class="row">
                            <Col class="col-sm-6">
                                <h2><b>States</b></h2>
                            </Col>
                            <Col class="col-sm-6">
                            <Search
                                  onSearch={(value)=>{
                                      setSearch(value);
                                  }}
                                />
                                <Button 
                                onClick={() => setAddStateModal(true)} 
                                class="btn btn-success" 
                                variant ="success"
                                data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New State</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>State Id</th>
                                <th>State Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statesData.map(state=>(
                                <tr>
                                <td>{state.ShtetiId}</td>
                                <td>{state.Emri}</td>
                                <td>
                                    <Button 
                                    onClick={() => {
                                        setEditStateModal(true);
                                        setStateV(state)
                                    }}
                                    className="m-2" 
                                    variant ="warning"
                                    data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    <Button 
                                     onClick={() => {
                                        setDeleteStateModal(true);
                                        setStateD(state.ShtetiId)
                                    }} 
                                     class="delete" 
                                     variant ="danger"
                                     data-toggle="modal"
                                     ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div class="clearfix">
                        <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                        <ul class="pagination">
                            <li class="page-item disabled"><a href="#">Previous</a></li>
                            <li class="page-item"><a href="#" class="page-link">1</a></li>
                            <li class="page-item"><a href="#" class="page-link">2</a></li>
                            <li class="page-item active"><a href="#" class="page-link">3</a></li>
                            <li class="page-item"><a href="#" class="page-link">4</a></li>
                            <li class="page-item"><a href="#" class="page-link">5</a></li>
                            <li class="page-item"><a href="#" class="page-link">Next</a></li>
                        </ul>
                    </div>
                </div>
            </Table>        
        </Container>
        
        <AddState
        show={addStateModal}
        onHide={() => setAddStateModal(false)}
        />
        <EditState
        show={editStateModal}
        onHide={() => setEditStateModal(false)}
        state={StateV}
        />
        <DeleteState
        show={deleteStateModal}
        onHide={() => setDeleteStateModal(false)}
        stateId={StateD}
        />
    </div>
    )
}

export default StateTable