import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Col, Button} from 'react-bootstrap'
import faPhotoUpload from '../../images/photoUpload.png'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'


const PostProdForm = ({loggedInUser}) => {

    let history = useHistory()
    const [categories, setCategories] = useState([]);
    const [selectedFiles,setSelectedFiles] = useState([]);
    const [selectedFilesName,setSelectedFilesName] = useState([]);
    const [lastProductId,setLastProductId] = useState([]);
    const fileInput = useRef(null);

    const handleFileInputClick = event => {
      fileInput.current.click();
    };

    useEffect(()=>{
        getCategories();
        getLastProd();
    },[selectedFiles]);

    const getLastProd = async () => {
      try{
        await axios.get("http://localhost:5000/api/product/last")
        .then((res)=>{
          setLastProductId(res.data.ProductId + 1)
        })
      }catch(e){
        console.log(e)
      }
    }

    const getCategories = async () => {
        try{
        await axios.get('http://localhost:5000/api/productcategory')
        .then(res=>{
            setCategories(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const handlePhotoSubmit = (e) => {
      e.preventDefault()
      if(e.target.files){
        const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
        setSelectedFiles((prevImages)=>prevImages.concat(fileArray));
        var fileArrayN = Array.from(e.target.files)
        setSelectedFilesName((prevImages)=>prevImages.concat(fileArrayN))
        console.log("fileArrayN");
        //console.log(fileArrayN.[0].name);
        for (let index = 0; index < e.target.files.length; index++) {
            const formdata = new FormData();
            formdata.append('image',e.target.files[index], e.target.files[index].name)
            try{
              axios.post('http://localhost:5000/api/product/SaveFile', formdata)
            }catch(e){
              console.log(e)
            }
          }
        }
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/product', {
            ProductName: event.target.ProductName.value,
            ProductCategory: event.target.ProductCategory.value,
            ProductState: event.target.ProductState.value,
            ProductPhoto: event.target.ProductPhoto.value,
            ProductDescription: event.target.ProductDescription.value,
            ProductLocation: event.target.ProductLocation.value,
            ProductComment: event.target.ProductComment.value,
            DonatorId: loggedInUser.UserId
          })
          .then(()=>{
            for (let index = 0; index < selectedFilesName.length; index++) {
              console.log("las prod");
              console.log(lastProductId);
              axios.post('http://localhost:5000/api/ProductPhotos',{
                Product: lastProductId,
                ProductPhotoPath: selectedFilesName[index].name
              }
            )}})
          .then(
            (res) => {
              history.push("/home");
              NotificationManager.success(
              'Product added succesfully!',
              '',
              2000,
              )
            },
            (error) => {
              NotificationManager.error(
                'Error while adding new product!'+{error},
                '',
                1000,
                )
            },
          )
    }

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
                className="prod-freshnes-radios"
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

          <Form.Group className="form-group-el img-prod-fgr">
          <div className="img-prod-label" >
          <Form.Label >Product Images</Form.Label></div>
            <button
            type="button"
            onClick={handleFileInputClick}
            className="imgUploadBtn"
            >
              <img src={faPhotoUpload} alt="" className="add-photo-icon" />
            {selectedFiles.map(file=>(
                <img src={file} alt="" className="postProd-img-preview" />
              ))}
            </button>
            <Form.File
            name="ProductPhoto" 
            multiple
            style={{display:"none"}}  
            hidden
            className ="d-flex"
            id="exampleFormControlFile1"
            onChange={handlePhotoSubmit}
            ref={fileInput}
            />
          </Form.Group >
            <Form.Group className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <Form.Label  >Additional Description</Form.Label>
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
