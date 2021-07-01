import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const EditOrganization = ({show,onHide,organization,onUpdate}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/Organization/'+ organization.OrganizationId, {
            OrganizationId: organization.OrganizationId,
           Name: event.target.Name.value,
           Username: event.target.Username.value,
           Description: event.target.Description.value

         
          })
          .then(()=>{
            onUpdate();
        })
          .then((res) => {
                history.push("/dashboard")
                NotificationManager.success(
                'Organization edited succesfully!',
                '',
                2000,
            )
            },
            (error) => {
                NotificationManager.erorr(
                'Error while editing the Organization!',
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
            className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div className="modal-header">						
                            <h3 className="modal-title">Edit Organization</h3>
                    </div>
                        <div className="modal-body">	
                        <FormGroup className="form-group">
                                <label>Id</label>
                                <input type="text"  defaultValue={organization.OrganizationId}  className="form-control" required disabled/>
                            </FormGroup>					
                            <FormGroup className="form-group">
                                <label>Name</label>
                                <input
                                 defaultValue={organization.Name} 
                                   name="Name" 
                                   type="text" 
                                   className="form-control" required />
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Username</label>
                                <input
                                 defaultValue={organization.Username} 
                                   name="Usename" 
                                   type="text" 
                                   className="form-control" required />
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Description</label>
                                <input
                                 defaultValue={organization.Description} 
                                   name="Description" 
                                   type="text" 
                                   className="form-control" required />
                            </FormGroup>						
                        </div>
                        <Modal.Footer className="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" className="btn btn-light" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" onClick={onHide} className="btn btn-info" value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default EditOrganization
