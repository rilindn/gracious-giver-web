import React from 'react'
import axios from 'axios';
import { Form, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const DeleteResponse = ({show,onHide,ProductRequestResponseId,onUpdate}) => {

    const handleSubmit = (event) => {

        event.preventDefault();
        axios.delete("http://localhost:5000/api/ProductRequestResponse/"+ProductRequestResponseId)
        .then(()=>{
            onUpdate();
        })
        .then((res) => {
            NotificationManager.success(
            'Response deleted succesfully!',
            '',
            1000,
            )
        },
            (error) => {
                NotificationManager.error(
                'Error while deleting the response!',
                "",
                1000,
                )
            },
          )
    }
    
    
    return (
        <div>   
        <Modal 
           show={show}
           id="addEmployeeModal" className="modal fade">
            <div className ="modal-dialog">
             <div className="modal-content">
                    <Form onSubmit={handleSubmit} className="p-3">
                        <div>					
                            <h4 className="modal-title">Delete Response</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this response?</p>
                            <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input 
                            onClick={onHide}
                            type="button" 
                            className="btn btn-info" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input 
                            type="submit"
                            onClick={onHide}
                            className="btn btn-danger" 
                            value="Delete"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default DeleteResponse
