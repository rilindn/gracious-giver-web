import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const EditCateg = ({show,onHide,categ}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        axios.put('http://localhost:5000/api/productcategory/'+ categ.ProductCategoryId, {
            ProductCategoryId: categ.ProductCategoryId,
            ProductCategoryName: event.target.ProductCategoryName.value
         
          })
          .then((res) => {
            history.push("/dashboard")
            NotificationManager.success(
            'Category edited succesfully!',
            '',
            2000,
            )
        },
            (error) => {
                NotificationManager.success(
                'Error while editing the category!'+{error},
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
                            <h3 class="modal-title">Edit Category</h3>
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

export default EditCateg
