import React from 'react';
import { Form, Col, Row, Button} from 'react-bootstrap'
// import UploadButton from './UploadButton'



export const PostProduct = () => {
    return (
     <div>

    <h3  style ={{fontFamily:'Hanalei Fill'}} className="new-post-t">New Post</h3>    
    <div className ="txt-post-product mx-auto ">
    <h4 style ={{fontFamily:'Hanalei Fill'}} className="new-post-p">Posting Guideliness</h4>
    <h6 className="new-post-j">Just remember that every item posted should be free, legal and family-friendly.</h6>
        <h6 className="new-post-n">No services, promotions or advertising.</h6>
        </div> 
<Form style={{width:"750px"}} className ="form-components-width mx-auto">
  <Form.Group className="form-group-el d-flex">
    <Form.Label htmlFor="inputName">Product Name</Form.Label>
    <Form.Control
    style={{width: "400px"}}
      type="text"
    />
  </Form.Group>

  <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
    <Form.Label>Product Category</Form.Label>
    <Form.Control style={{width: "400px"}} as="select" custom>
      <option>Clothes</option>
      <option>Tech</option>
      <option>Health</option>
      <option>Equipments</option>
    </Form.Control>
  </Form.Group> 

<Form.Group className="form-group-el">
      <Form.Label sm={3}>
       Product Freshness
      </Form.Label>
      <Col sm={7} style={{width: "400px"}}>
        <Form.Check inline
          type="radio"
          label="Brand New"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check inline
          type="radio"
          label="Second Hand"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check inline
          type="radio"
          label="Refurbished"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
      </Col>
    </Form.Group>

  <Form.Group className="form-group-el">
  <Form.Label text-left >Image of Product</Form.Label>
    <Form.File style={{width: "400px"}}  className ="d-flex"id="exampleFormControlFile1"/>
  </Form.Group >
    <Form.Group className="form-group-el" controlId="exampleForm.ControlTextarea1">
    <Form.Label text-left >Additional Description</Form.Label>
    <Form.Control placeholder ="Type here..." style={{width: "400px"}} as="textarea" rows={3} />
  </Form.Group>

  <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
    <Form.Label>Location</Form.Label>
    <Form.Control style={{width: "400px"}} as="select" custom>
      <option>Hogosht</option>
      <option>Kamenicë</option>
      <option>Ferizaj</option>
      <option>Malishevë</option>
      <option>Terrnoc</option>
    </Form.Control>
  </Form.Group>

<Form.Group  controlId="exampleForm.ControlTextarea1" className="form-group-el">
    <Form.Label >Comments</Form.Label>
    <Form.Control placeholder ="Type here..." style={{width: "400px"}} as="textarea" rows={3} />
  </Form.Group>
    
  <Button className="post-prodForm-btn" >Submit</Button>    
        </Form>
    </div>
  )
}

export default PostProduct