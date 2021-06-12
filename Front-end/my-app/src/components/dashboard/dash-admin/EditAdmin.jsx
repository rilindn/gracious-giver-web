import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal, FormLabel, FormControl} from 'react-bootstrap'

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
            className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Form >
                        <div className="modal-header">						
                            <h3 className="modal-title">Edit Admin</h3>
                    </div>
                        <div className="modal-body">		
                            <FormGroup className="form-group">
                                <label>Id</label>
                                <input defaultValue={admin.AdminId} type="text" className="form-control" required disabled/>
                            </FormGroup>			
                            <FormGroup className="form-group">
                                <label>Name</label>
                                <input 
                                defaultValue={admin.AdminName}
                                name="AdminName"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Password</label>
                                <input 
                                type="password"
                                defaultValue={admin.AdminPassword}
                                name ="AdminPassword" 
                                className="form-control"
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Email </label>
                                <input 
                                defaultValue={admin.AdminEmail}
                                name="AdminEmail"
                                type="email" 
                                className="form-control" 
                                required/>
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
                                        defaultValue={admin.maleFemale}
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
                                        defaultValue={admin.maleFemale}
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
                                    defaultValue={admin.birth}
                                ></FormControl>	
					
                        </div>
                        <Modal.Footer className="modal-footer">
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
