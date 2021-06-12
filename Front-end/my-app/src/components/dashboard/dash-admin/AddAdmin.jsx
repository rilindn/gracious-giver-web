import React from 'react'
import axios from 'axios';
import {Form, FormGroup, Modal, FormLabel} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

const addAdmin = ({show,onHide}) => {

    let history = useHistory

    const handleSubmit = (event) => {
        axios.post('http://localhost:5000/api/GG_Admin', {
            AdminName: event.target.AdminName.value,
            AdminPassword: event.target.AdminPassword.value,
            AdminEmail: event.target.AdminEmail.value,
            AdminGender: event.target.maleFemale.value,
          })
          .then((res) => {
              history.push('/');
              NotificationManager.success('')
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

export default addAdmin
