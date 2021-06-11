import React from 'react'
import axios from 'axios';
import { Form, FormGroup, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const EditCity = ({show,onHide,city}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/City/'+ city.CityId, {
            CityId: city.CityId,
            CityName: event.target.CityName.value,
            
          })
          .then((res) => {
            history.push("/dashboard")
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
            class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div class="modal-header">						
                            <h3 class="modal-title">Edit City</h3>
                    </div>
                        <div class="modal-body">	
                            <FormGroup class="form-group">
                                <label>Id</label>
                                <input defaultValue={city.CityId} type="text" class="form-control" required disabled/>
                            </FormGroup>					
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input 
                                name="CityName"
                                defaultValue={city.CityName} 
                                type="text" 
                                class="form-control"
                                 required/>
                            </FormGroup>			
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" class="btn btn-light" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" class="btn btn-info" value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default EditCity
