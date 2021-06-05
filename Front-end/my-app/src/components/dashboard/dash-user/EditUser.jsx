import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

const editUser = ({show, onHide, user}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/DM_User/'+ user.userId, {
            UserId: user.UserId,
            UserName: event.target.UserName.value,
            UserState: user.UserState,
            UserCity: user.UserCity,
            UserPostcode: event.target.UserPostcode.value,
            UserEmail: event.target.UserEmail.value,
            UserDbo: event.target.UserDbo.value,
            UserGender: event.target.UserGender.value,
            UserRole: event.target.UserRole.value,
          })
          .then((res) => {
              alert("User updated succesfully!")
            },
            (error) => {
              alert(error)
            },
          )
    }

    return(
        <div>
            <Modal 
            show={show} 
            class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form >
                        <div class="modal-header">						
                            <h3 class="modal-title">Edit User</h3>
                    </div>
                        <div class="modal-body">					
                            <FormGroup class="form-group">
                                <label>User Name</label>
                                <input 
                                defaultValue={user.UserName}
                                name="UserName"
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>State</label>
                                <input 
                                defaultValue={user.UserState}
                                name="UserState"
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>City</label>
                                <input
                                defaultValue={user.UserCity}
                                name="UserCity" 
                                class="form-control" 
                                required
                                ></input>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>User Email</label>
                                <input
                                defaultValue={user.UserEmail}
                                name="UserEmail" 
                                class="form-control" 
                                required
                                ></input>
                            </FormGroup>			
                        </div>
                        <Modal.Footer class="modal-footer">
                            <Button 
                            onClick={onHide}
                            variant="light"
                            >
                            Cancel
                            </Button>
                            <Button 
                            onClick={handleSubmit}
                            variant="info"
                            >
                            Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}


export default editUser