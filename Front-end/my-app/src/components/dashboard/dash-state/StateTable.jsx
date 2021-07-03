import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form,  Row, Table } from 'react-bootstrap';
import AddState from '../dash-state/AddState'
import EditState from './EditState'
import DeleteState from './DeleteState'
import { Search } from '../DataTable/Search';


const StateTable = () => {

    const [states, setStates] = useState([]);
    const [allStates, setAllStates]= useState([]);
    const [addStateModal,setAddStateModal] = useState(false);
    const [editStateModal,setEditStateModal] = useState(false);
    const [deleteStateModal,setDeleteStateModal] = useState(false);
    const [StateV, setStateV] = useState([]);
    const [StateD, setStateD] = useState();
    const [search,setSearch] = useState("");
    const [maxStateShow, setmaxStateShow] = useState(10);

        useEffect(()=>{
            getAmOfStates(maxStateShow);
            getAllStates();
        },[maxStateShow,addStateModal,editStateModal,deleteStateModal]);
        

        const getAmOfStates = async (maxStateShow) =>{
            try{
              await axios.get("http://localhost:5000/api/Shteti/amount/" + maxStateShow)
              .then(res=>{
                  setStates(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllStates = async () => {
            try{
             await axios.get(`http://localhost:5000/api/Shteti`)
            .then(res=>{
                console.log(res.data)
                setAllStates(res.data)
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
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>States</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {statesData.length} of {allStates.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfStates"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setmaxStateShow(allStates.length):setmaxStateShow(e.target.value);
                                        }
                                    }
                                    value={maxStateShow}
                                    >
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value='All'>All</option>
                                 </Form.Control>
                            </Col>
                            <Col className="col-sm-3">
                          
                                <Button 
                                onClick={() => setAddStateModal(true)} 
                                className="btn btn-success" 
                                variant ="success"
                                data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New State</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nr.</th>
                                <th>State Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statesData.map((state,i)=>(
                                <tr>
                                <td>#{++i}</td>
                                <td>{state.Emri}</td>
                                <td>
                                    <Button 
                                    onClick={() => {
                                        setEditStateModal(true);
                                        setStateV(state)
                                    }}
                                    className="m-2" 
                                    variant ="warning"
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    <Button 
                                     onClick={() => {
                                        setDeleteStateModal(true);
                                        setStateD(state.ShtetiId)
                                    }} 
                                     className="delete" 
                                     variant ="danger"
                                     data-toggle="modal"
                                     ><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    
                </div>
            </Table>        
        </Container>
        
        <AddState
        show={addStateModal}
        onHide={() => setAddStateModal(false)}
        onUpdate={()=>{
            getAllStates();
            setAddStateModal(false)
            getAmOfStates(maxStateShow);
        } }
        />
        <EditState
        show={editStateModal}
        onHide={() => setEditStateModal(false)}
        onUpdate={()=>{
            getAllStates();
            setEditStateModal(false)
            getAmOfStates(maxStateShow);
        } }
        state={StateV}
        />
        <DeleteState
        show={deleteStateModal}
        onHide={() => setDeleteStateModal(false)}
        onUpdate={()=>{
            getAllStates();
            setDeleteStateModal(false)
            getAmOfStates(maxStateShow);
        } }
        stateId={StateD}
        />
    </div>
    )
}

export default StateTable