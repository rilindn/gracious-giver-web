import axios from 'axios'
import React from 'react'
import { Form, Modal, Button, } from 'react-bootstrap'

const deleteAdmin = ({show,onHide,adminId}) => {

    const handleSubmit = (event) => {
        axios.delete("http://localhost:5000/api/GG_Admin/"+adminId)
          .then((res) => {
              alert("Admin deleted succesfully!")
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
             > <Form onSubmit={handleSubmit} className="p-3">
                        <div>					
                            <h4 class="modal-title">Delete Admin</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this Admin?</p>
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
                            />
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default deleteAdmin
