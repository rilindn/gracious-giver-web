import React from 'react'
import axios from 'axios';
import { Form, Modal, Alert, } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const DeleteCity = ({show,onHide,cityId}) => {

    let history = useHistory()

    const handleSubmit = (event) => {

        event.preventDefault();
        axios.delete("http://localhost:5000/api/City/"+cityId)
          .then((res) => {
            history.push("/dashboard")
            NotificationManager.success(
            'City deleted succesfully!',
            '',
            1000,
            )
        },
            (error) => {
                NotificationManager.error(
                'Error while deleting the city!',
                {error},
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
            <div class ="modal-dialog">
             <div class="modal-content">
                    <Form onSubmit={handleSubmit} className="p-3">
                        <div>					
                            <h4 class="modal-title">Delete City</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this City?</p>
                            <p class="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-info" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input type="submit" class="btn btn-danger" value="Delete"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default DeleteCity
