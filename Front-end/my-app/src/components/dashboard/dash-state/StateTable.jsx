import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddState from '../dash-state/AddState'
import EditState from './EditState'
import DeleteState from './DeleteState'


// document.ready(function(){
// 	// Activate tooltip
// 	'[data-toggle="tooltip"]'.tooltip();
	
// 	// Select/Deselect checkboxes
// 	var checkbox = 'table tbody input[type="checkbox"]';
// 	"#selectAll".click(function(){
// 		if(this.checked){
// 			checkbox.each(function(){
// 				this.checked = true;                        
// 			});
// 		} else{
// 			checkbox.each(function(){
// 				this.checked = false;                        
// 			});
// 		} 
// 	});
// 	checkbox.click(function(){
// 		if(!this.checked){
// 			"#selectAll".prop("checked", false);
// 		}
// 	});
// });


const StateTable = () => {

    const [states, setStates] = useState([]);
    const [addStateModal,setAddStateModal] = useState(false);
    const [editStateModal,setEditStateModal] = useState(false);
    const [deleteStateModal,setDeleteStateModal] = useState(false);
    const [StateV, setStateV] = useState([]);
    const [StateD, setStateD] = useState();

        useEffect(()=>{
            getstates();
        },[]);


        const getstates = async () => {
            try{
            const data = await axios.get(`http://localhost:5000/api/Shteti`)
            .then(res=>{
                setStates(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

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
                                <Button 
                                onClick={() => setAddStateModal(true)} 
                                class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New State</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table className="table striped bordered hover">
                        <thead>
                            <tr>
                                <th>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="selectAll"/>
                                        <label for="selectAll"></label>
                                    </span>
                                </th>

                                <th>State Id</th>
                                <th>State Name</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {states.map(state=>(
                                <tr>
                                <td>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                                        <label for="checkbox1"></label>
                                    </span>
                                </td>
                                <td>{state.ShtetiId}</td>
                                <td>{state.Emri}</td>
                                <td>
                                    <Button 
                                    onClick={() => {
                                        setEditStateModal(true);
                                        setStateV(state)
                                    }}
                                    class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    <Button 
                                     onClick={() => {
                                        setDeleteStateModal(true);
                                        setStateD(state.ShtetiId)
                                    }} 
                                     class="delete" 
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