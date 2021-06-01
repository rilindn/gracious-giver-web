import React from 'react'
import { Form, Modal } from 'react-bootstrap'

const deleteProduct = () => {
    return (
        <div>
            
        
        
        <Modal id="deleteEmployeeModal">
            <Modal.Dialog >
                <Modal.Content>
                    <Form>
                        <Modal.Header >						
                            <Modal.Title >Delete Employee</Modal.Title>
                            <Modal.Button type="button" class="modal-close-btn" data-dismiss="modal" aria-hidden="true">&times;</Modal.Button>
                        </Modal.Header>
                        <Modal.Body >					
                            <p>Are you sure you want to delete these Records?</p>
                            <p class="text-warning"><small>This action cannot be undone.</small></p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Modal.Input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                            <Modal.Input type="submit" class="btn btn-danger" value="Delete"/>
                        </Modal.Footer>
                    </Form>
                </Modal.Content>
            </Modal.Dialog>
        </Modal>
        </div>
    )
}

export default deleteProduct
