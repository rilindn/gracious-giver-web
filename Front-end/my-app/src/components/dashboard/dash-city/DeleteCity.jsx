import React from 'react'
import axios from 'axios';
import { Form, Modal, Alert, } from 'react-bootstrap'

const deleteCity = ({show,onHide,cityId}) => {

    const handleSubmit = (event) => {
        axios.delete("http://localhost:5000/api/city/"+cityId)
          .then((res) => {
              <Alert>City deleted succesfully!</Alert>
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
            <div className ="modal-dialog">
             <div className="modal-content">
                    <Form onSubmit={handleSubmit} className="p-3">
                        <div>					
                            <h4 className="modal-title">Delete City</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this City?</p>
                            <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input 
                            onClick={onHide}
                            type="button" 
                            className="btn btn-info" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input type="submit" className="btn btn-danger" value="Delete"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default deleteCity
