import React from 'react'
import { Form, Modal, Button, } from 'react-bootstrap'

const deleteState = ({show,onHide}) => {

    
    return (
        <div>   
        <Modal id="deleteEmployeeModal"
           show={show}
           id="addEmployeeModal" class="modal fade">
            <div class ="modal-dialog">
             <div class="modal-content">
                    <Form>
                        <div>					
                            <h4 class="modal-title">Delete State</h4>
                            <Button 
                            onClick={onHide}
                             class="modal-close-btn" 
                             data-dismiss="modal" 
                             aria-hidden="true">  
                                &times;</Button>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this State?</p>
                            <p class="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-default" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input type="submit" class="btn btn-danger" value="Delete"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default deleteState