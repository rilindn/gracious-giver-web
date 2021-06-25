import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const EditRequestt = ({show,onHide,requestt,onUpdate}) => {
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/Request/'+ requestt.RequestId, {
            RequesttId: requestt.RequesttId,
            ReceiverId: requestt.ReceiverId,
            RequestComment: event.target.RequestComment.value,
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
                NotificationManager.success(
                'Error while editing the request!'+{error},
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
                                defaultValue={requestt.RequesttId}
                                name="requesttId"
                                type="text" 
                                className="form-control" 
                                required
                                disabled/>
                            </FormGroup>	
                            <FormGroup className="form-group">
                                <label>RequestComment</label>
                                <input 
                                defaultValue={requestt.RequestComment}
                                name="comment"
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
