import React from 'react'
import axios from 'axios';
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const EditCity = ({show,onHide,city,onUpdate}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/City/'+ city.CityId, {
            CityId: city.CityId,
            CityName: event.target.CityName.value,
            
          })
          .then(()=>{
            onUpdate();
        })
          .then((res) => {
            NotificationManager.success(
            'City edited succesfully!',
            '',
            2000,
            )
        },
            (error) => {
                NotificationManager.success(
                'Error while editing the city!'+{error},
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
                            <input 
                            onClick={onHide}
                            type="submit" 
                            className="btn btn-info" 
                            value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default EditCity
