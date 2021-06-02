import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import axios from 'axios'
const editCateg = ({show,onHide,categ}) => {
    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/productcategory/'+ categ.ProductCategoryId, {
            ProductCategoryId: categ.ProductCategoryId,
            ProductCategoryName: event.target.ProductCategoryName.value
         
          })
          .then((res) => {
              alert("Category Product updated succesfully!")
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
                            <h3 class="modal-title">Edit Category</h3>
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
                                <label>Id</label>
                                <input type="text"  defaultValue={categ.ProductCategoryId}  class="form-control" required disabled/>
                            </FormGroup>					
                            <FormGroup class="form-group">
                                <label>Name</label>
                                <input
                                 defaultValue={categ.ProductCategoryName} 
                                   name="ProductCategoryName" 
                                   type="text" 
                                   class="form-control" required />
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

export default editCateg
