import React from 'react'
import { Form, Modal, Button, } from 'react-bootstrap'
import axios from 'axios'
const deleteCateg = ({show,onHide,ProductCategoryId}) => {
    const handleSubmit = (event) => {
        axios.delete("http://localhost:5000/api/productcategory/"+ProductCategoryId)
          .then((res) => {
              alert("Product Category deleted succesfully!")
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
            <div class ="modal-dialog">
             <div class="modal-content">
                    <Form  onSubmit={handleSubmit}>
                        <div>					
                            <h4 class="modal-title">Delete Product Category</h4>
                            <Button 
                            onClick={onHide}
                             class="modal-close-btn" 
                             data-dismiss="modal" 
                             aria-hidden="true">  
                                &times;</Button>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this Product Category?</p>
                            <p class="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input 
                            onClick={onHide}
                            type="button" 
                            class="btn btn-default" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input type="submit" class="btn btn-danger" value="Delete"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default deleteCateg
