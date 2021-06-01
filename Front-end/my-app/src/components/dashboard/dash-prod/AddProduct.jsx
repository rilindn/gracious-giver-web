import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

const addProduct = ({show,onHide}) => {

    return (
        <div>
            <Modal
            show={show}
            id="addEmployeeModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form>
                        <div class="modal-header">						
                            <h3 class="modal-title">Add Product</h3>
                            <Button 
                            onClick={onHide}
                            className="modal-close-btn"
                            data-dismiss="modal" 
                            aria-hidden="true">
                                &times;
                            </Button>
                        </div>
                        <div class="modal-body">					
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Address</label>
                                <textarea class="form-control" required></textarea>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Phone</label>
                                <input type="text" class="form-control" required/>
                            </FormGroup>					
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-default" 
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

export default addProduct
