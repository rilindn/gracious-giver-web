import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import UserTable from './UserTable'

const EditUser = ({show, onHide, user}) => {

    let history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault()
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
                history.push(UserTable)
                NotificationManager.success(
                'User edited succesfully!',
                '',
                2000,
            )
            },
            (error) => {
                NotificationManager.erorr(
                'Error while editing the user!'+{error},
                '',
                1000,
                )
            },
          )
    }

    return(
        <div>
            <Modal 
            show={show} 
            className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">						
                    <h3 className="modal-title">Edit User</h3>
                    </div>
                        <div className="modal-body">	
                        <Form onSubmit={handleSubmit}
                        >				
                            <FormGroup className="form-group">
                                <label>User Id</label>
                                <input 
                                defaultValue={user.UserId}
                                name="UserId"
                                disabled
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>User Name</label>
                                <input 
                                defaultValue={user.UserName}
                                name="UserName"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>State</label>
                                <input 
                                defaultValue={user.UserState}
                                name="UserState"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>City</label>
                                <input
                                defaultValue={user.UserCity}
                                name="UserCity" 
                                className="form-control" 
                                required
                                ></input>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>User Email</label>
                                <input
                                defaultValue={user.UserEmail}
                                name="UserEmail" 
                                className="form-control" 
                                required
                                ></input>
                            </FormGroup>
                            
                        <Modal.Footer className="modal-footer">
                            <Button 
                            onClick={onHide}
                            variant="light"
                            >
                            Cancel
                            </Button>
                            <Button 
                            variant="info"
                            onClick={onHide}
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


export default EditUser