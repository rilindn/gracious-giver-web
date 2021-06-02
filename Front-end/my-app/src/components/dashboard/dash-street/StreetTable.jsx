import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddStreet from '../dash-street/AddStreet'
import EditStreet from './EditStreet'
import DeleteStreet from './DeleteStreet'


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


const StreetTable = () => { 
 
    const [streets, setStreets] = useState([]);
    const [addStreetModal,setAddStreetModal] = useState(false);
    const [editStreetModal,setEditStreetModal] = useState(false);
    const [deleteStreetModal,setDeleteStreetModal] = useState(false);
    const [streetV, setStreetV] = useState([]);
    const [streetD, setStreetD] = useState();


        useEffect(()=>{
            getStreets(); 
        },[]);

        const getStreets = async () => {
            try{ 
            const data = await axios.get(`http://localhost:5000/api/Street`)
            .then(res=>{
                console.log(res.data)
                setStreets(res.data)
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
                                <h2><b>Streets</b></h2>
                            </Col>
                            <Col class="col-sm-6">
                                <Button 
                                onClick={() => setAddStreetModal(true)} 
                                class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Street</span>
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
                                <th>Street Id</th>
                                <th>Street Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {streets.map(street=>(
                                <tr>
                                <td>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                                        <label for="checkbox1"></label>
                                    </span>
                                </td> 
                                <td>{street.StreetId }</td>
                                <td>{street.StreetName}</td>
                                <td>
                                    <Button 
                                    onClick={() => {setEditStreetModal(true)
                                        setStreetV(street)
                                    }
                                    } 
                                    class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                onClick={() => {
                                    setDeleteStreetModal(true);
                                            setStreetD(street.StreetId)
                                        }
                                    } 
                                     class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
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
        <EditStreet
         show={editStreetModal}
         onHide={() => setEditStreetModal(false)}
         />
        <AddStreet
        show={addStreetModal}
        onHide={() => setAddStreetModal(false)}
        />

        <DeleteStreet
        show={deleteStreetModal}
        onHide={() => setDeleteStreetModal(false)} 
        />
    </div>
    )
}

export default StreetTable