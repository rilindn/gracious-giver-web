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
            className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Form 
                    onSubmit={handleSubmit}
                    >
                        <div className="modal-header">						
                            <h3 className="modal-title">Edit Product</h3>
                    </div>
                        <div className="modal-body">					
                            <FormGroup className="form-group">
                                <label>Product Name</label>
                                <input 
                                defaultValue={product.ProductName}
                                name="ProductName"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Product Category</label>
                                <input 
                                defaultValue={product.ProductCategory}
                                name="ProductCategory"
                                type="text" 
                                className="form-control" 
                                required/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Location</label>
                                <input
                                defaultValue={product.ProductLocation}
                                name="ProductLocation" 
                                className="form-control" 
                                required
                                ></input>
                            </FormGroup>					
                        </div>
                        <Modal.Footer className="modal-footer">
                            <Button 
                            onClick={onHide}
                            variant="light"
                            >
                            Cancel
                            </Button>
                            <Button 
                            variant="info"
                            type="submit"
                            >
                            Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default editProduct
