import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

const editUser = ({show, onHide, user}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/user/'+ user.UserId, {
            UserId: user.UserId,
            UserName: event.target.UserName.value,
            UserState: event.target.UserState.value,
            UserCity: event.target.UserCity.value,
            UserPostcode: user.UserPostcode,
            UserRole: user.UserRole,
            UserEmail: event.target.UserEmail.value,
            UserGender: user.UserGender,
            UserDbo: user.UserDbo
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
                    
                        <div class="modal-header">						
                            <h3 class="modal-title">Edit User</h3>
                    </div>
                        <div class="modal-body">	
                        <Form 
                        onSubmit={handleSubmit}
                        >				
                            <FormGroup class="form-group">
                                <label>User Id</label>
                                <input 
                                defaultValue={user.UserId}
                                name="UserId"
                                disabled
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>
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
                            
                        <Modal.Footer class="modal-footer">
                            <Button 
                            onClick={onHide}
                            variant="light"
                            >
                            Cancel
                            </Button>
                            <Button 
                            variant="info"
                            type="submit"
                            >
                            Save
                            </Button>
                        </Modal.Footer>
                        </Form>			
                        </div>
                </div>
            </div>
        </Modal>
        </div>
    )
}


export default editUser