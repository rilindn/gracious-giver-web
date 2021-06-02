import React from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

const editCity = ({show,onHide,city}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/city/'+ city.CityId, {
            CityId: city.CityId,
            CityName: event.target.CityName.value,
          })
          .then((res) => {
              alert("City updated succesfully!")
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
                            <h3 class="modal-title">Edit City</h3>
                            <Button 
                            onClick={onHide}
                            className="modal-close-btn" 
                            data-dismiss="modal" 
                            aria-hidden="true">
                                &times;
                            </Button>
                    </div>
                        <div class="modal-body">	
                        <FormGroup class="form-group">
                                <label>Id</label>
                                <input defaultValue={city.CityId} type="text" class="form-control" required disabled/>
                            </FormGroup>					
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input 
                                name="CityName"
                                defaultValue={city.CityName} 
                                type="text" 
                                class="form-control"
                                 required/>
                            </FormGroup>			
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" class="btn btn-info" value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default editCity
