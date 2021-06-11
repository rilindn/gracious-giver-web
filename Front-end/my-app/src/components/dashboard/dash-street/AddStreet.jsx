import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const AddStreet = ({show,onHide}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        axios.post('http://localhost:5000/api/Street', {
           
            StreetName: event.target.StreetName.value
          })
          .then((res) => {
            history.push("/dashboard")
            NotificationManager.success(
            'Street added succesfully!',
            '',
            2000,
            )

            },
            (error) => {
                NotificationManager.error(
                    'Error while adding new street!'+{error},
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
                    <Form onSubmit={handleSubmit}>
                        <div class="modal-header">						
                            <h3 class="modal-title">Add Street</h3>
                        </div>
                        <div class="modal-body">					
                           
                            <FormGroup class="form-group">
                                <label>Street Name</label>
                                <input type="text"
                                name="StreetName" class="form-control" required/>
                            </FormGroup>

                           					
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-info" 
                            data-dismiss="Modal" value="Cancel"
                            />
                            <input type="submit" class="btn btn-success" value="Add"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default AddStreet