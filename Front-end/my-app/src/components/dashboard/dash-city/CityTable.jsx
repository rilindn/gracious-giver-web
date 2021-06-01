import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddCity from '../dash-city/AddCity'
import EditCity from './EditCity'
import DeleteCity from './DeleteCity'


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


const CityTable = () => { 
 
    const [cities, setCities] = useState([]);
    const [addCityModal,setAddCityModal] = useState(false);
    const [editCityModal,setEditCityModal] = useState(false);
    const [deleteCityModal,setDeleteCityModal] = useState(false);


        useEffect(()=>{
            getcities(); 
        },[]);

        const getcities = async () => {
            try{ 
            const data = await axios.get(`http://localhost:5000/api/city`)
            .then(res=>{
                console.log(res.data)
                setCities(res.data)
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
                                <h2><b>Cities</b></h2>
                            </Col>
                            <Col class="col-sm-6">
                                <Button 
                                onClick={() => setAddCityModal(true)} 
                                class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New City</span>
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
                                <th>City Id</th>
                                <th>City Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cities.map(city=>(
                                <tr>
                                <td>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                                        <label for="checkbox1"></label>
                                    </span>
                                </td> 
                                <td>{city.CityId}</td>
                                <td>{city.CityName}</td>
                                <td>
                                    <Button 
                                    onClick={() => setEditCityModal(true)} 
                                    class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => setDeleteCityModal(true)} 
                                     class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Table>  

        </Container>
        <EditCity
         show={editCityModal}
         onHide={() => setEditCityModal(false)}
         />
        <AddCity
        show={addCityModal}
        onHide={() => setAddCityModal(false)}
        />

        <DeleteCity
        show={deleteCityModal}
        onHide={() => setDeleteCityModal(false)} 
        />
    </div>
    )
}

export default CityTable