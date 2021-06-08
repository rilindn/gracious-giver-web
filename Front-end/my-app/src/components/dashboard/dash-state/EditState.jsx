import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'

const editState = ({show,onHide,state}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/Shteti/'+ state.ShtetiId, {
            ShtetiId: state.ShtetiId,
            Emri: event.target.Emri.value,
            
          })
          .then((res) => {
              alert("State updated succesfully!")
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
                            <h3 class="modal-title">Edit State</h3>
                    </div>
                        <div class="modal-body">					
                            <FormGroup class="form-group">
                                <label>State Name</label>
                                <input 
                                defaultValue={state.Emri}
                                name="Emri"
                                type="text" 
                                class="form-control" 
                                required/>
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

export default editState
