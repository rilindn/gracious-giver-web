import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const EditState = ({show,onHide,state,onUpdate}) => {
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/Shteti/'+ state.ShtetiId, {
            ShtetiId: state.ShtetiId,
            Emri: event.target.Emri.value,
          })
          .then(()=> {
              onUpdate();
          })
          .then((res) => {
            NotificationManager.success(
            'State edited succesfully!',
            '',
            2000,
            )
        },
            (error) => {
                NotificationManager.success(
                'Error while editing the state!'+{error},
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
                            <h3 className="modal-title">Edit State</h3>
                    </div>
                        <div className="modal-body">					
                            <FormGroup className="form-group">
                                <label>State Name</label>
                                <input 
                                defaultValue={state.Emri}
                                name="Emri"
                                type="text" 
                                className="form-control" 
                                required/>
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

export default EditState
