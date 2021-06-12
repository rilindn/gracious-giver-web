import React from 'react'
import { Form, Modal} from 'react-bootstrap'
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
          className="modal fade">
            <div className ="modal-dialog">
             <div className="modal-content " >
                    <Form  onSubmit={handleSubmit}  className="p-3">
                        <div>					
                            <h4 className="modal-title">Delete Product Category</h4>
                        </div>
                        <div>				
                            <p>Are you sure you want to delete this Product Category?</p>
                            <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>	
                        <Modal.Footer>
                            <input                                                                                                  
                            onClick={onHide}
                            type="button" 
                            className="btn btn-info" 
                            data-dismiss="Modal" value="Cancel"/>
                            <input type="submit" className="btn btn-danger" value="Delete"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default deleteCateg
