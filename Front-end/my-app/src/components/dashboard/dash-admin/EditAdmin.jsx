import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

const editAdmin = ({show,onHide,admin}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/GG_Admin/'+ admin.AdminId, {
            AdminId: admin.AdminId,
            AdminName: event.target.AdminName.value,
            AdminPassword: event.target.AdminPassword.value,
            AdminEmail: event.target.AdminEmail.value,
            AdminGender: event.target.AdminGender,
            AdminDbo: event.target.AdminDbo
          })
          .then((res) => {
              alert("Admin updated succesfully!")
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
                    <Form >
                        <div class="modal-header">						
                            <h3 class="modal-title">Edit Admin</h3>
                    </div>
                        <div class="modal-body">		
                            <FormGroup class="form-group">
                                <label>Id</label>
                                <input defaultValue={admin.AdminId} type="text" class="form-control" required disabled/>
                            </FormGroup>			
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input 
                                defaultValue={admin.AdminName}
                                name="AdminName"
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Password</label>
                                <input 
                                type="password"
                                defaultValue={admin.AdminPassword}
                                name ="AdminPassword" 
                                class="form-control"
                                required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Email </label>
                                <input 
                                defaultValue={admin.AdminEmail}
                                name="AdminEmail"
                                type="email" 
                                class="form-control" 
                                required/>
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
                                        defaultValue={admin.maleFemale}
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
                                        defaultValue={admin.maleFemale}
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
                                    defaultValue={admin.birth}
                                ></FormControl>	
					
                        </div>
                        <Modal.Footer class="modal-footer">
                            <Button 
                            onClick={onHide}
                            variant="light"
                            >
                            Cancel
                            </Button>
                            <Button 
                            onClick={handleSubmit}
                            variant="info"
                            >
                            Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default editAdmin
