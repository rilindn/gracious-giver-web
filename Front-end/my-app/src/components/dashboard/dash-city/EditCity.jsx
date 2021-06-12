import React from 'react'
import axios from 'axios';
import { Form, FormGroup, Modal } from 'react-bootstrap'

const editCity = ({show,onHide,city}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/city/'+ city.CityId, {
            CityId: city.CityId,
            CityName: event.target.CityName.value,
          })
          .then((res) => {
              alert("City updated succesfully!")
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
                            <h3 className="modal-title">Edit City</h3>
                    </div>
                        <div className="modal-body">	
                            <FormGroup className="form-group">
                                <label>Id</label>
                                <input defaultValue={city.CityId} type="text" className="form-control" required disabled/>
                            </FormGroup>					
                            <FormGroup className="form-group">
                                <label>Name</label>
                                <input 
                                name="CityName"
                                defaultValue={city.CityName} 
                                type="text" 
                                className="form-control"
                                 required/>
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

export default editCity
