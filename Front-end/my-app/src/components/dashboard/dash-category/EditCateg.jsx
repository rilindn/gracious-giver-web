import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
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
            className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Form onSubmit={handleSubmit}>
                        <div className="modal-header">						
                            <h3 className="modal-title">Edit Category</h3>
                    </div>
                        <div className="modal-body">	
                        <FormGroup className="form-group">
                                <label>Id</label>
                                <input type="text"  defaultValue={categ.ProductCategoryId}  className="form-control" required disabled/>
                            </FormGroup>					
                            <FormGroup className="form-group">
                                <label>Name</label>
                                <input
                                 defaultValue={categ.ProductCategoryName} 
                                   name="ProductCategoryName" 
                                   type="text" 
                                   className="form-control" required />
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

export default editCateg
