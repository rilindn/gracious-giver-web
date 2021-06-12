import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const EditStreet = ({show,onHide,street}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/Street/'+ street.streetId, {
            StreetId:  street.streetId,
            StreetName: event.target.StreetName.value
          })
          .then((res) => {
            history.push("/dashboard")
            NotificationManager.success(
            'Street edited succesfully!',
            '',
            2000,
            )
        },
            (error) => {
                NotificationManager.success(
                'Error while editing the street!'+{error},
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
                            <h3 className="modal-title">Edit Street</h3>
                    </div>
                        <div className="modal-body">	
                        <FormGroup className="form-group">
                                <label>Id</label>
                                <input 
                                defaultValue={street.StreetId}
                                name="StreetId"
                                type="text" 
                                className="form-control"
                                disabled
                                required
                                />
                            </FormGroup>					
                            <FormGroup className="form-group">
                                <label>Name</label>
                                <input 
                                defaultValue={street.StreetName}
                                type="text" 
                                className="form-control" 
                                name="StreetName"
                                required
                                />
                            </FormGroup>			
                        </div>
                        <Modal.Footer className="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" className="btn btn-light" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" className="btn btn-info" value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default EditStreet
