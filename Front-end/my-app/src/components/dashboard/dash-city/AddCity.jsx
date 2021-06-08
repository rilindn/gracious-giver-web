import React from 'react'
import axios from 'axios';
import { Form, FormGroup, Modal } from 'react-bootstrap'

const addCity = ({show,onHide}) => {


    const handleSubmit = (event) => {
        axios.post('http://localhost:5000/api/city', {
            CityName: event.target.CityName.value,
          })
          .then((res) => {
              alert("City added succesfully!")
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
                            <h3 class="modal-title">Add City</h3>
                        </div>
                        <div class="modal-body">					
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input type="text" name ="CityName" class="form-control" required/>
                            </FormGroup>				
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-info" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input type="submit" class="btn btn-success" value="Add"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default addCity
