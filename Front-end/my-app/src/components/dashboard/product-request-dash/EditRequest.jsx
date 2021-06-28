import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const EditRequest = ({show,onHide,request,onUpdate}) => {
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/product_request/'+ request.RequestId, {
            RequestId: request.RequestId,
            UserId: request.UserId,
            ProductId: request.ProductId,
            Message: event.target.Message.value,
            Request_Date: request.Request_Date
          })
          .then(()=> {
              onUpdate();
          })
          .then((res) => {
            NotificationManager.success(
            'Request edited succesfully!',
            '',
            2000,
            )
        },
            (error) => {
                NotificationManager.error(
                'Error while editing the request!',
                '',
                1000,
                )
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
                            <h3 className="modal-title">Edit Request</h3>
                    </div>
                        <div className="modal-body">					
                            <FormGroup className="form-group">
                                <label>Request Id </label>
                                <input 
                                defaultValue={request.RequestId}
                                name="id"
                                type="text" 
                                className="form-control" 
                                required
                                disabled/>
                            </FormGroup>	
                            <FormGroup className="form-group">
                                <label>Message</label>
                                <input 
                                defaultValue={request.Message}
                                name="Message"
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

export default EditRequest
