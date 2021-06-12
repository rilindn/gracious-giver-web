import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'

const editStreet = ({show,onHide,street}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/street/'+ street.StreetId, {
            StreetId: street.StreetId,
            StreetName: event.target.StreetName.value
          })
          .then((res) => {
              alert("Street updated succesfully!")
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

export default editStreet
