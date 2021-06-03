import axios from 'axios';
import React, { Component, useEffect, useRef, useState } from 'react'
import { Form, Col, Button} from 'react-bootstrap'

const PostProdForm = () => {

    
    const [categories, setCategories] = useState([]);
    const [selectedFile,setSelectedFile] = useState(null);
    const fileInput = useRef(null);

    const handleFileInputClick = event => {
      fileInput.current.click();
    };

    useEffect(()=>{
        getCategories();
    },[]);

    const getCategories = async () => {
        try{
        const data = await axios.get('http://localhost:5000/api/productcategory')
        .then(res=>{
            console.log(res)
            setCategories(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const handlePhotoSubmit = (event) => {
      event.preventDefault()
      setSelectedFile(event.target.files[0])
      const formdata = new FormData();
      formdata.append('image',event.target.files[0], event.target.files[0].name)
      axios.post('http://localhost:5000/api/product/SaveFile', formdata)
        .then(
          (res) => {
          },
          (error) => {
            alert(error)
          },
        )
  }

    const handleSubmit = (event) => {
        axios.post('http://localhost:5000/api/product', {
            ProductName: event.target.ProductName.value,
            ProductCategory: event.target.ProductCategory.value,
            ProductState: event.target.ProductState.value,
            ProductPhoto: event.target.ProductPhoto.value,
            ProductDescription: event.target.ProductDescription.value,
            ProductLocation: event.target.ProductLocation.value,
            ProductComment: event.target.ProductComment.value
          })
          .then(
            (res) => {
              alert(res)
            },
            (error) => {
              alert(error)
            },
          )
    }
    //  const handleFileSelected = (event) => {
    //     event.preventDefault()
    //     selectedFile = event.target.files[0].name
    //     const formData = new FormData()
    //     formData.append('myFile', event.target.files[0], event.target.files[0].name)
    //     fetch(process.env.REACT_APP_API + 'product/SaveFile', {
    //       method: 'POST',
    //       body: formData,
    //     })
    //       .then((res) => res.json())
    //       .then(
    //         (result) => {
    //           this.imagesrc = process.env.REACT_APP_PHOTOPATH + result
    //         },
    //         (error) => {
    //           alert(error)
    //         },
    //       )
    //   }

    return (
        <div>
        <Form 
        onSubmit={handleSubmit}
        style={{width:"750px"}} 
        className ="form-components-width mx-auto">
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
             {categories.map(categorie=>(
                
              <option>{categorie.ProductCategoryName}</option>
             ))}
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
            <Button
            onClick={handleFileInputClick}
            >
              Upload
            </Button>
            <Form.File
            name="ProductPhoto" 
            style={{display:"none"}}  
            hidden
            className ="d-flex"
            id="exampleFormControlFile1"
            onChange={handlePhotoSubmit}
            ref={fileInput}
            />
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
              <option>London</option>
              <option>Manchester</option>
              <option>Oxford</option>
              <option>Edinburgh</option>
              <option>Glasgow</option>
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
            
          <Button 
          type="submit" 
          className="post-prodForm-btn"
          >Submit</Button>    
                </Form>
        </div>
    )
}

export default PostProdForm
