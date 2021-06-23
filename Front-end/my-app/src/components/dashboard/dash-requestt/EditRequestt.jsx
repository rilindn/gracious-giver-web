import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const EditRequestt = ({show,onHide}) => {

    return (
        <div>
            <Modal 
            show={show} 
            className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Form >
                        <div className="modal-header">						
                            <h3 className="modal-title">Edit Request</h3>
                    </div>
                        <div className="modal-body">					
                            <FormGroup className="form-group">
                                <label>Request Id </label>
                                <input 
                              
                                name="id"
                                type="text" 
                                className="form-control" 
                                required
                                disabled/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Receiver Id </label>
                                <input 
                              
                                name="id"
                                type="text" 
                                className="form-control" 
                                required
                                disabled/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Category</label>
                                <input 
                               
                                name="Category"
                                type="text" 
                                className="form-control" 
                                required
                                />
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Description</label>
                                <input 
                               
                                name="Description"
                                type="text" 
                                className="form-control" 
                                required
                                />
                            </FormGroup>	
                            <FormGroup className="form-group">
                                <label>Location</label>
                                <input 
                               
                                name="Location"
                                type="text" 
                                className="form-control" 
                                required
                                />
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Comments</label>
                                <input 
                               
                                name="Comments"
                                type="text" 
                                className="form-control" 
                                required
                                />
                            </FormGroup>
                            				
                        </div>
                        
                        <Modal.Footer className="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" className="btn btn-light" data-dismiss="modal" value="Cancel"/>
                            <input onClick={onHide} type="submit" className="btn btn-info" value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default EditRequestt
