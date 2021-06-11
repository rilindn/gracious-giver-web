import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

const AddCateg = ({ show, onHide }) => {
  let history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('http://localhost:5000/api/productcategory', {
        ProductCategoryName: event.target.ProductCategoryName.value,
      })
      .then(
        (res) => {
          history.push('/home')
          NotificationManager.success(
            'Product Category added succesfully!',
            '',
            2000,
          )
        },
        (error) => {
          alert(error)
        },
      )
  }

  return (
    <div>
      <Modal show={show} class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <Form onSubmit={handleSubmit} className="p-3">
              <div class="modal-header">
                <h3 class="modal-title">Add Product Category</h3>
              </div>
              <div class="modal-body">
                <FormGroup class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="ProductCategoryName"
                    class="form-control"
                    required
                  />
                </FormGroup>
              </div>
              <Modal.Footer class="modal-footer">
                <input
                  onClick={onHide}
                  type="button"
                  class="btn btn-info"
                  data-dismiss="Modal"
                  value="Cancel"
                />
                <input type="submit" class="btn btn-success" value="Add" />
              </Modal.Footer>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AddCateg
