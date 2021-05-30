import React, { Component } from 'react'
import { Form, Col, Button} from 'react-bootstrap'

class PostProdForm extends Component {

    constructor(props){
        super(props);
        this.addProduct = this.addProduct.bind(this);
    };

    addProduct(event){
        fetch('http://localhost:5000/api/Product',{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProductName: event.target.ProductName.value,
                ProductCategory: event.target.ProductCategory.value,
                ProductState: event.target.ProductState.value,
                ProductPhoto: event.target.ProductPhoto.value,
                ProductDescription: event.target.ProductDescription.value,
                ProductLocation: event.target.ProductLocation.value,
                ProductComment: event.target.ProductComment.value
            })
        })
        
            .then(res=>res.json())
            .then((result)=>{
                alert("Product added succesfully!");
            },
            (error)=>{
                alert("Failed!");
            })
        }

  render(){
    return (
        <div>
        <Form onSubmit={this.addProduct} style={{width:"750px"}} className ="form-components-width mx-auto">
          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Product Name</Form.Label>
            <Form.Control
              style={{width: "400px"}}
              type="text"
              name="ProductName"
            />
          </Form.Group>

          <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
             name="ProductCategory"
             style={{width: "400px"}} 
             as="select" 
             custom
             >
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
              <Col 
                sm={7} 
                style={{width: "400px"}}
                name="ProductState"
                >
                <Form.Check inline
                  value="Brand New"
                  name="ProductState"
                  type="radio"
                  label="Brand New"
                  id="formHorizontalRadios1"
                />
                <Form.Check inline
                  value="Second Hand"
                  name="ProductState"
                  type="radio"
                  label="Second Hand"
                  id="formHorizontalRadios2"
                />
                <Form.Check inline
                  value="Refurbished" 
                  name="ProductState"
                  type="radio"
                  label="Refurbished"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>

          <Form.Group className="form-group-el">
          <Form.Label text-left >Image of Product</Form.Label>
            <Form.File
            name="ProductPhoto" 
            style={{width: "400px"}}  
            className ="d-flex"id="exampleFormControlFile1"/>
          </Form.Group >
            <Form.Group className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <Form.Label text-left >Additional Description</Form.Label>
            <Form.Control 
            name="ProductDescription" 
            placeholder ="Type here..." 
            style={{width: "400px"}} 
            as="textarea" 
            rows={3} 
            />
          </Form.Group>

          <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label>Location</Form.Label>
            <Form.Control 
            name="ProductLocation"
            style={{width: "400px"}} 
            as="select" 
            custom
            >
              <option>Hogosht</option>
              <option>Kamenicë</option>
              <option>Ferizaj</option>
              <option>Malishevë</option>
              <option>Terrnoc</option>
            </Form.Control>
          </Form.Group>

        <Form.Group  controlId="exampleForm.ControlTextarea1" className="form-group-el">
            <Form.Label >Comments</Form.Label>
            <Form.Control 
            name="ProductComment"
            placeholder ="Type here..." 
            style={{width: "400px"}} 
            as="textarea" 
            rows={3} 
            />
          </Form.Group>
            
          <Button type="submit" className="post-prodForm-btn" >Submit</Button>    
                </Form>
        </div>
    )
}
}

export default PostProdForm
