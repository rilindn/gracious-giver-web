import axios from 'axios'
import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'

const addStreet = ({show,onHide}) => {

    const handleSubmit = (event) => {
        axios.post('http://localhost:5000/api/Street', {
           
            StreetName: event.target.StreetName.value
          })
          .then((res) => {
              alert("Street added succesfully!")
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
            id="addEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div className="modal-header">						
                            <h3 className="modal-title">Add Street</h3>
                        </div>
                        <div className="modal-body">					
                           
                            <FormGroup className="form-group">
                                <label>Street Name</label>
                                <input type="text"
                                name="StreetName" className="form-control" required/>
                            </FormGroup>

                           					
                        </div>
                        <Modal.Footer className="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" 
                            className="btn btn-info" 
                            data-dismiss="Modal" value="Cancel"
                            />
                            <input type="submit" className="btn btn-success" value="Add"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default addStreet