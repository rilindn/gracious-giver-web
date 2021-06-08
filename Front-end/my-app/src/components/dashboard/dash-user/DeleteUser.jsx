import axios from 'axios'
import React from 'react'
import { Form, Modal} from 'react-bootstrap'

const deleteUser = ({show,onHide,userId}) => {

    const handleSubmit = (event) => {
        axios.delete("http://localhost:5000/api/user/"+userId)
          .then((res) => {
              alert("User deleted succesfully!")
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
           class="modal fade"
           >
            <div class ="modal-dialog">
             <div 
             class="modal-content"
             > <Form  className="p-3">
                        <div>					
                            <h4 class="modal-title">Delete User</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this User?</p>
                            <p class="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-info" 
                            data-dismiss="Modal" 
                            value="Cancel"
                            />
                            <input 
                            type="submit" 
                            class="btn btn-danger" 
                            value="Delete"
                            onClick={handleSubmit}
                            />
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default deleteUser
