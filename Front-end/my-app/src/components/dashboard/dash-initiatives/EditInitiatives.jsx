import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const EditIniciatives = ({show,onHide,inc,onUpdate}) => {

    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/Iniciative/'+inc.IniciativeId, {
            InicitativeId:inc.IniciativeId,
            InicitativeName: event.target.InicitativeName.value,
            InicitativeDescription:event.target.InicitativeDescription.value,
            InicitativeDate: inc.InicitativeDate,
            
            OrganizationId:inc.OrganizationId,
            ReceiverId:inc.ReceiverId
          })
          .then(()=> {
              onUpdate();
          })
          .then((res) => {
            NotificationManager.success(
            'Inicitative edited succesfully!',
            '',
            2000,
            )
        },
            (error) => {
                NotificationManager.error(
                'Error while editing the Inicitative!',
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
                            <h3 className="modal-title">Edit Inicitative</h3>
                    </div>
                        <div className="modal-body">		
                            <FormGroup className="form-group">
                                <label>Name</label>
                                <input 
                                name="InicitativeName"
                                defaultValue={inc.IniciativeName} 
                                type="text" 
                                className="form-control" 
                                required
                                />
                            </FormGroup>		
                            <FormGroup className="form-group">
                                <label>Description</label>
                                <input 
                                name="InicitativeDescription"
                                defaultValue={inc.IniciativeDescription} 
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

export default EditIniciatives
