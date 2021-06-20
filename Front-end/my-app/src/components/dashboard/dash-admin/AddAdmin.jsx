import React, {useEffect, useState } from 'react'
import axios from 'axios';
import {Form, FormGroup, Modal, FormLabel, FormControl} from 'react-bootstrap'
import { FaUser, FaLock, FaMapMarked, FaEnvelope} from 'react-icons/fa'
import {MDBInput } from "mdb-react-ui-kit";
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';



const AddAdmin = ({show, onHide}) => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [redirect, setRedirect] = useState(false);
    
    useEffect(() =>{
      getStates();
      getCities();
    },[]);
    

    const getStates = async () => {
      try{
        await axios.get('http://localhost:5000/api/shteti')
        .then(res=>{
          console.log(res)
          setStates(res.data)
        })
      }
      catch(e){
        console.log(e);
      }
    }

    const getCities = async () => {
      try{
        await axios.get('http://localhost:5000/api/city')
        .then(res=>{
          console.log(res)
          setCities(res.data)
        })
      }
      catch(e){
        console.log(e);
      }
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:5000/api/register', {
        UserName: event.target.AdminName.value,
        UserPassword: event.target.AdminPassword.value,
        UserState: event.target.state.value,
        UserCity: event.target.city.value,
        UserPostCode: event.target.postcode.value,
        UserRole: "Admin",
        UserEmail: event.target.AdminEmail.value,
        UserGender: event.target.maleFemale.value,
        UserDbo: event.target.birth.value
      })
      .then(
        (res) =>{
          alert("Succesfully registered")
          console.log(res.data); 
        },
        (error) =>{
          alert(error)
        },
      )
    }
    return (
        <div>
            <Modal  
            show={show}
             className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div className="modal-header">						
                            <h3 className="modal-title">Add Admin</h3>
                        </div>
                        <div className="modal-body">					
                            <FormGroup className="form-group">
                                <label>Name</label>
                                <input type="text" name ="AdminName" className="form-control" required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Password</label>
                                <input type="password" name ="AdminPassword" className="form-control" required/>
                            </FormGroup>

                            <FormGroup></FormGroup>
                            <FormLabel className="label-alignin">
                                State
                            </FormLabel>
                                <Form.Control
                                    style={{width: "340px"}} 
                                    as="select" 
                                    name="state"
                                    custom
                                >
                                    {states.map(state=>(
                                    <option>{state.Emri}</option>
                                ))}
                                </Form.Control>
                    <FormLabel className="label-alignin">
                          City
                    </FormLabel>
                        <Form.Control 
                          style={{width: "340px"}} 
                          as="select" 
                          name="city"
                          custom
                        >
                          {cities.map(city=>(
                
                        <option>{city.CityName}</option>
                        ))}
                        </Form.Control>
                   <FormLabel className="label-alignin">
                       Postcode
                    </FormLabel>
                      <MDBInput 
                          type="text"
                          name="postcode"
                          style={{width:"340px", paddingLeft:"30px"}}
                      />
                            <FormGroup className="form-group">
                                <label>Email</label>
                                <input type="email" name ="AdminEmail" className="form-control" required/>
                            </FormGroup>	

                            <FormLabel className="label-alignin">
                                    Gender
                            </FormLabel>

                                <div className="d-flex justify-content-start ml-3 ">
                                    <div className="form-check form-check-inline text-left  lbl-position">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="inlineRadio1"
                                        value="F"
                                        name="maleFemale"
                                        />

                                <label className="form-check-label" for="inlineRadio1">Female</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="inlineRadio2"
                                        value="M"
                                        name="maleFemale"
                                    />
                                    
                                <label className="form-check-label" for="inlineRadio2">Male</label>
                                </div>
                            </div>
                                                 <FormLabel className="label-alignin">
                    Date of birth
                  </FormLabel>

                  <FormControl className="lbl-position" 
                      style={{width:"200px"}}
                      type="date"
                      required
                      placeholder="Date of birth"
                      name="birth"
                  ></FormControl>		
                        </div>
                                <Modal.Footer className="modal-footer">
                                    <input 
                                    onClick={onHide}
                                    type="button" 
                                    className="btn btn-info" 
                                    data-dismiss="Modal" value="Cancel"/>
                                    <input type="submit" className="btn btn-success" value="Add"/>
                                </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default AddAdmin;
