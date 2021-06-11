import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import StateTable from './StateTable';

const AddState = ({show,onHide}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/Shteti', {
            Emri: event.target.Emri.value,
          })
          .then((res) => {
                history.push("/dashboard")
                NotificationManager.success(
                'State added succesfully!',
                '',
                2000,
                )
            },
            (error) => {
                NotificationManager.error(
                    'Error while adding new state!'+{error},
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
            id="addEmployeeModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form onSubmit={handleSubmit} className="p-3">
                        <div class="modal-header">						
                            <h3 class="modal-title">Add State</h3>
                        </div>
                        <div class="modal-body">	
                        				
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input 
                                name="Emri"
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>					
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-info" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input onClick={onHide} type="submit" class="btn btn-success" value="Add"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default AddState
