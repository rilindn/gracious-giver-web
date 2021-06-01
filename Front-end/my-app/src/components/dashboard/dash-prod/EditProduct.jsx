import axios from 'axios'
import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

const editProduct = ({show,onHide,product}) => {

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/product/'+ product.ProductId, {
            ProductId: product.ProductId,
            ProductName: event.target.ProductName.value,
            ProductCategory: event.target.ProductCategory.value,
            ProductState: product.ProductState,
            ProductPhoto: product.ProductPhoto,
            ProductDescription: product.ProductDescription,
            ProductLocation: event.target.ProductLocation.value,
            ProductComment: product.ProductComment
          })
          .then((res) => {
              alert("Product updated succesfully!")
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
            class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div class="modal-header">						
                            <h3 class="modal-title">Edit Product</h3>
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
                                <label>Product Name</label>
                                <input 
                                defaultValue={product.ProductName}
                                name="ProductName"
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Product Category</label>
                                <input 
                                defaultValue={product.ProductCategory}
                                name="ProductCategory"
                                type="text" 
                                class="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup class="form-group">
                                <label>Location</label>
                                <input
                                defaultValue={product.ProductLocation}
                                name="ProductLocation" 
                                class="form-control" 
                                required
                                ></input>
                            </FormGroup>					
                        </div>
                        <Modal.Footer class="modal-footer">
                            <input 
                            onClick={onHide}
                            type="submit" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" class="btn btn-info" value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default editProduct
