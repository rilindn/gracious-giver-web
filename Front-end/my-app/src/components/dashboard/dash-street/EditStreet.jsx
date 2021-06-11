import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const EditStreet = ({show,onHide,street}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/Street/'+ street.streetId, {
            StreetId:  street.streetId,
            StreetName: event.target.StreetName.value
          })
          .then((res) => {
            history.push("/dashboard")
            NotificationManager.success(
            'Street edited succesfully!',
            '',
            2000,
            )
        },
            (error) => {
                NotificationManager.success(
                'Error while editing the street!'+{error},
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
            class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div class="modal-header">						
                            <h3 class="modal-title">Edit Street</h3>
                    </div>
                        <div class="modal-body">	
                        <FormGroup class="form-group">
                                <label>Id</label>
                                <input 
                                defaultValue={street.StreetId}
                                name="StreetId"
                                type="text" 
                                class="form-control"
                                disabled
                                required
                                />
                            </FormGroup>					
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input 
                                defaultValue={street.StreetName}
                                type="text" 
                                class="form-control" 
                                name="StreetName"
                                required
                                />
                            </FormGroup>			
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" class="btn btn-light" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" class="btn btn-info" value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default EditStreet
