import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const EditCateg = ({show,onHide,categ,onUpdate}) => {

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/productcategory/'+ categ.ProductCategoryId, {
            ProductCategoryId: categ.ProductCategoryId,
            ProductCategoryName: event.target.ProductCategoryName.value
         
          })
          .then(()=>{
            onUpdate();
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
                NotificationManager.erorr(
                'Error while editing the category!',
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
                            <input type="submit" onClick={onHide} className="btn btn-info" value="Save"/>
                        </Modal.Footer>
                    </Form>
                </div>
            </div>
        </Modal>
        </div>
    )
}

export default EditCateg
