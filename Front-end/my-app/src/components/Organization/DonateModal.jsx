import axios from 'axios';
import React from 'react'
import { Form, Modal, FormGroup } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const DonateModal = ({show, onHide,Initiative,loggedInUser}) => {

    const handleSubmit = async (event) =>  {
        var date = new Date().toLocaleString()
        event.preventDefault();
         axios
        .post('http://localhost:5000/api/Donation', {
          Donator:loggedInUser.UserId,
          Date: date,
          Amount: event.target.Amount.value,
          Initiative:Initiative.IniciativeId
        })
        .then(
          (res) => {
            NotificationManager.success(
            'You have donated to '+Initiative.IniciativeName+' !',
            '',
            2000,
            )
          },
          (error) => {
            NotificationManager.error(
              'Error while donating!',
              '',
              1000,
              )
          },
        )
    }
    return (
        <div>
    <Modal show={show} className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content" style={{ width: '360px' }}>
            <Form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h3 className="modal-title">Donate</h3>
              </div>
              <div className="modal-body">
                <FormGroup className="form-group">
                  <label>Set your amount</label>
                  <input
                    type="number"
                    name="Amount"
                    className="form-control"
                    required
                    placeholder="EUR"
                  />
                </FormGroup>
              </div>
              <Modal.Footer className="modal-footer">
                <input
                  onClick={onHide}
                  type="button"
                  className="btn btn-info"
                  data-dismiss="Modal"
                  value="Cancel"
                />
                <input 
                    type="submit" 
                    className="btn btn-success" 
                    value="Add" 
                    onClick={onHide}
                />
              </Modal.Footer>
            </Form>
          </div>
        </div>
      </Modal>
        </div>
    )
}

export default DonateModal
