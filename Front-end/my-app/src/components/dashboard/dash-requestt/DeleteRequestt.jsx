import axios from 'axios'
import React from 'react'
import { Form, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const DeleteRequestt = ({show,onHide}) => {

   
    
    return (
        <div>   
        <Modal
           show={show}
           className="modal fade"
           >
            <div className ="modal-dialog">
             <div 
             className="modal-content"
             >
                    <Form 
                   
                    className="p-3"
                    >
                        <div>					
                            <h4 className="modal-title">Delete Request</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this request?</p>
                            <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input 
                            onClick={onHide}
                            type="button" 
                            className="btn btn-info" 
                            data-dismiss="Modal" 
                            value="Cancel"
                            />
                            <input 
                            type="submit" 
                            className="btn btn-danger" 
                            value="Delete"
                            onClick={onHide}
                            />
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default DeleteRequestt
