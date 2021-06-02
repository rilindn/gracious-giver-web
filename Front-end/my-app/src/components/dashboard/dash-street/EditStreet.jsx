import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

const editStreet = ({show,onHide,street}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/street/'+ street.StreetId, {
            StreetId: street.StreetId,
            StreetName: event.target.StreetName.value
          })
          .then((res) => {
              alert("Street updated succesfully!")
            },
            (error) => {
              alert(error)
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

export default editStreet
