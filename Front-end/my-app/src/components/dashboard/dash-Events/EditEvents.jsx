import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const EditEvents = ({show,onHide,ev,onUpdate}) => {

    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/Events/'+ev.EventId, {
            EventId:ev.EventId,
            EventName: event.target.EventName.value,
            EventDescription:event.target.EventDescription.value,
            EventDate: ev.EventDate,
            City: ev.City,
            OrganizationId: ev.OrganizationId,
            Photo:ev.Photo
          })
          .then(()=> {
              onUpdate();
          })
          .then((res) => {
            NotificationManager.success(
            'Event edited succesfully!',
            '',
            2000,
            )
        },
            (error) => {
                NotificationManager.error(
                'Error while editing the Event!',
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
                            <h3 className="modal-title">Edit Event</h3>
                    </div>
                        <div className="modal-body">		
                            <FormGroup className="form-group">
                                <label>Name</label>
                                <input 
                                name="EventName"
                                defaultValue={ev.EventName} 
                                type="text" 
                                className="form-control" 
                                required
                                />
                            </FormGroup>		
                            <FormGroup className="form-group">
                                <label>Description</label>
                                <textarea 
                                name="EventDescription"
                                defaultValue={ev.EventDescription} 
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

export default EditEvents
