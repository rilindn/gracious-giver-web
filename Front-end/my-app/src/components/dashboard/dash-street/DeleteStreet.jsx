import axios from 'axios'
import React from 'react'
import { Form, Modal} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const DeleteStreet = ({show,onHide,streetId}) => {

    let history = useHistory()
  
    const handleSubmit = (event) => {

        event.preventDefault();
        axios.delete("http://localhost:5000/api/Street/"+streetId)
          .then((res) => {
            history.push("/dashboard")
            NotificationManager.success(
            'Street deleted succesfully!',
            '',
            1000,
            )
        },
            (error) => {
                NotificationManager.error(
                'Error while deleting the street!',
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
            class="modal fade">
            <div class ="modal-dialog">
                <div
                 class="modal-content">
                    <Form
                    onSubmit={handleSubmit}
                    className="p-3"
                    >
                        <div>					
                            <h4 class="modal-title">Delete Street</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this Street?</p>
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

export default DeleteStreet
