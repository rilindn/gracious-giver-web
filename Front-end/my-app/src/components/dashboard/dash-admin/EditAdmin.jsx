import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const EditAdmin = ({show, onHide, admin,onUpdate}) => {

    const handleSubmit = (event) => {
        event.preventDefault()
            axios.put('http://localhost:5000/api/user/'+ admin.UserId, {
            UserId: admin.UserId,
            Firstname: admin.Firstname,
            Lastname: admin.Lastname,
            UserName: event.target.UserName.value,
            UserPassword: admin.UserPassword,
            UserState: event.target.UserState.value,
            UserCity: event.target.UserCity.value,
            UserPostcode: admin.UserPostcode,
            UserRole: admin.UserRole,
            UserEmail: event.target.UserEmail.value,
            UserGender: admin.UserGender,
            UserDbo: admin.UserDbo
          })
          .then(()=> {
              onUpdate();
          })
          .then(
            (res) =>{
              NotificationManager.success('Admin edited!','',2000);
              //console.log(res.data)
            },
            (error) =>{
              NotificationManager.error('Error while editing the admin!','',1000);
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
                    <h3 className="modal-title">Edit Admin</h3>
                    </div>
                        <div className="modal-body">	
                        <Form onSubmit={handleSubmit}
                        >				
                            <FormGroup className="form-group">
                                <label>Admin Id</label>
                                <input 
                                defaultValue={admin.UserId}
                                name="UserId"
                                disabled
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Admin Name</label>
                                <input 
                                defaultValue={admin.UserName}
                                name="UserName"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>State</label>
                                <input 
                                defaultValue={admin.UserState}
                                name="UserState"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>City</label>
                                <input
                                defaultValue={admin.UserCity}
                                name="UserCity" 
                                className="form-control" 
                                required
                                ></input>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Admin Email</label>
                                <input
                                defaultValue={admin.UserEmail}
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


export default EditAdmin