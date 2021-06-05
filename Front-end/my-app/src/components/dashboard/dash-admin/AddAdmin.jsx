import React from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Modal, FormLabel, FormControl} from 'react-bootstrap'

const addAdmin = ({show,onHide}) => {


    const handleSubmit = (event) => {
        axios.post('http://localhost:5000/api/GG_Admin', {
            AdminName: event.target.AdminName.value,
            AdminPassword: event.target.AdminPassword.value,
            AdminEmail: event.target.AdminEmail.value,
            AdminGender: event.target.maleFemale.value,
            AdminDbo: event.target.birth.value,
          })
          .then((res) => {
              alert("Admin added succesfully!")
            },
            (error) => {
              alert(error)
            },
          )
    }

    return (
        <div>
            <Modal  
            show={show}
             class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div class="modal-header">						
                            <h3 class="modal-title">Add Admin</h3>
                        </div>
                        <div class="modal-body">					
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input type="text" name ="AdminName" class="form-control" required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Password</label>
                                <input type="password" name ="AdminPassword" class="form-control" required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Email</label>
                                <input type="email" name ="AdminEmail" class="form-control" required/>
                            </FormGroup>	

                            <FormLabel className="label-alignin">
                                    Gender
                            </FormLabel>

                                <div className="d-flex justify-content-start ml-3 ">
                                    <div class="form-check form-check-inline text-left  lbl-position">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        id="inlineRadio1"
                                        value="F"
                                        name="maleFemale"
                                        />

                                <label class="form-check-label" for="inlineRadio1">Female</label>
                                </div>

                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        id="inlineRadio2"
                                        value="M"
                                        name="maleFemale"
                                    />
                                    
                                <label class="form-check-label" for="inlineRadio2">Male</label>
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
                                <Modal.Footer class="modal-footer">
                                    <input 
                                    onClick={onHide}
                                    type="button" 
                                    class="btn btn-info" 
                                    data-dismiss="Modal" value="Cancel"/>
                                    <input type="submit" class="btn btn-success" value="Add"/>
                                </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default addAdmin
