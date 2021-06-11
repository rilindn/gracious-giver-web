import React from 'react'
import axios from 'axios';
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const AddCity = ({show,onHide}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/City', {
            CityName: event.target.CityName.value,
          })
          .then((res) => {
                history.push("/dashboard")
                NotificationManager.success(
                'City added succesfully!',
                '',
                2000,
                )
            },
            (error) => {
                NotificationManager.error(
                    'Error while adding new city!'+{error},
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

export default AddCity
