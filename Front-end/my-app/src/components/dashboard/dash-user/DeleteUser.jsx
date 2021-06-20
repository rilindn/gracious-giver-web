import axios from 'axios'
import React from 'react'
import { Form, Modal} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const DeleteUser = ({show,onHide,userId,onUpdate}) => {

    let history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.delete("http://localhost:5000/api/user/"+userId)
            .then(()=>{
                onUpdate();
            })
          .then((res) => {
                history.push("/dashboard")
                NotificationManager.success(
                'User deleted succesfully!',
                '',
                1000,
                )
            },
            (error) => {
                NotificationManager.error(
                'Error while deleting the user!',
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
           className="modal fade"
           >
            <div className ="modal-dialog">
             <div 
             className="modal-content"
             > <Form  className="p-3" onSubmit={handleSubmit}>
                        <div>					
                            <h4 className="modal-title">Delete User</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this User?</p>
                            <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input 
                            onClick={onHide}
                            type="button" 
                            className="btn btn-info" 
                            data-dismiss="Modal" 
                            value="Cancel"
                            />
                            <input 
                            type="submit" 
                            onClick={onHide}
                            className="btn btn-danger" 
                            value="Delete"
                            />
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default DeleteUser
