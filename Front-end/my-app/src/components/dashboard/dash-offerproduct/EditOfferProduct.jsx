import React from 'react'
import { Form, FormGroup, Modal } from 'react-bootstrap'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'

const EditOfferProduct = ({show,onHide,OfferProduct,onUpdate}) => {

    

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/OfferProduct/'+ OfferProduct.OfferProductId, {
            OfferProductId: OfferProduct.OfferProductId,
            ProductProviderId: OfferProduct.ProductProviderId,
            ReceiverId: OfferProduct.ReceiverId,
            Message: event.target.Message.value,
            OfferDate: event.target.OfferDate.value,
            CheckOffer: event.target.CheckOffer.value,
          })
          .then(()=>{
            onUpdate();
        })
          .then((res) => {
               
                NotificationManager.success(
                'OfferProduct edited succesfully!',
                '',
                2000,
            )
            },
            (error) => {
                NotificationManager.success(
                'Error while editing theOfferProduct!'+{error},
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
                            <h3 className="modal-title">OfferProduct</h3>
                    </div>
                        <div className="modal-body">	
                        <FormGroup className="form-group">
                                <label> OfferProduct Id</label>
                                <input type="text" 
                                 name="offerProductId"
                                 defaultValue={OfferProduct.OfferProductId}  
                                 className="form-control" 
                                 required disabled/>
                            </FormGroup>	
                            <FormGroup className="form-group">
                                <label>  ProductProvider Id</label>
                                <input 
                                name="ProductProviderId"
                                type="text"
                                  defaultValue={OfferProduct.ProductProviderId} 
                                   className="form-control" required
                                    disabled/>
                            </FormGroup>
                            <FormGroup className="form-group">
                                <label>Receiver Id</label>
                                <input type="text" 
                                 name="receiverId"
                                  defaultValue={OfferProduct.ReceiverId}  className="form-control" required disabled/>
                            </FormGroup>				
                            <FormGroup className="form-group">
                                <label>Message</label>
                                <input
                                 defaultValue={OfferProduct.Message} 
                                   name="Message" 
                                   type="text" 
                                   className="form-control" required />
                            </FormGroup>	
                            <FormGroup className="form-group">
                                <label> OfferDate</label>
                                <input
                                 defaultValue={OfferProduct.OfferDate} 
                                   name="OfferDate" 
                                  
                                   className="form-control" required  disabled/>
                            </FormGroup>	
                            <FormGroup className="form-group">
                                <label>CheckOffer</label>
                                <input
                                 defaultValue={OfferProduct.CheckOffer} 
                                   name="CheckOffer" 
                                   
                                   className="form-control" required  disabled/>
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

export default EditOfferProduct
