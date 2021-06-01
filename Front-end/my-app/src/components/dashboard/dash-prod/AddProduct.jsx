import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

const addProduct = ({show,onHide}) => {


    const handleSubmit = (event) => {
        axios.post('http://localhost:5000/api/product', {
            ProductName: event.target.ProductName.value,
            ProductCategory: event.target.ProductCategory.value,
            ProductLocation: event.target.ProductLocation.value
          })
          .then((res) => {
              alert("Product added succesfully!")
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
            id="addEmployeeModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div class="modal-header">						
                            <h3 class="modal-title">Add Product</h3>
                            <Button 
                            onClick={onHide}
                            className="modal-close-btn"
                            data-dismiss="modal" 
                            aria-hidden="true">
                                &times;
                            </Button>
                        </div>
                        <div class="modal-body">					
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input 
                                name="ProductName"
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Product Category</label>
                                <input 
                                name="ProductCategory"
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Location</label>
                                <input
                                name="ProductLocation" 
                                class="form-control" 
                                required
                                ></input>
                            </FormGroup>					
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-default" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input type="submit" class="btn btn-success" value="Add"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default addProduct
