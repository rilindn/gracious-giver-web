import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Col, Button} from 'react-bootstrap'
import faPhotoUpload from '../../images/photoUpload.png'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import Footer from '../footer/Footer';
import HeaderLoginRegister from "../Header/HeaderLoginRegister";


const PostProdForm = ({loggedInUser}) => {

    let history = useHistory()
    const [categories, setCategories] = useState([]);
    const [selectedFiles,setSelectedFiles] = useState([]);
    const [selectedFilesName,setSelectedFilesName] = useState([]);
    const fileInput = useRef(null);

    const handleFileInputClick = event => {
      fileInput.current.click();
    };

    useEffect(()=>{
        getCategories();
    },[selectedFiles]);

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
        //console.log("fileArrayN");
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
            axios.get("http://localhost:5000/api/product/last")
            .then((res)=>{
              for (let index = 0; index < selectedFilesName.length; index++) {
                axios.post('http://localhost:5000/api/ProductPhotos',{
                  Product: res.data.ProductId,
                  ProductPhotoPath: selectedFilesName[index].name
                }
              )}})
          })
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
                    <HeaderLoginRegister>

                </HeaderLoginRegister>
            <div className="pt-3 prod-form-wrapper mx-auto">
            <h2  style ={{fontFamily:'Hanalei Fill'}} className="new-post-t1">Register as Organization</h2>
            <h6 className="new-post-j1">As an organization you can create events and iniciatives to help people!</h6>    
            <div className ="txt-post-product1 mx-auto ">
                </div> 
        <Form 
        onSubmit={handleSubmit}
        style={{width:"750px"}} 
        className ="form-components-width mx-auto">
          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Username</Form.Label>
            <Form.Control
              style={{width: "400px"}}
              type="text"
              name="ProductName"
            />
          </Form.Group>

          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Password </Form.Label>
            <Form.Control
              style={{width: "400px"}}
              type="password"
              name="ProductName"
            />
          </Form.Group>

          
          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Name </Form.Label>
            <Form.Control
              style={{width: "400px"}}
              type="text"
              name="ProductName"
            />
          </Form.Group>

          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Email </Form.Label>
            <Form.Control
              style={{width: "400px"}}
              type="email"
              name="ProductName"
            />
          </Form.Group>

          <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label> Category</Form.Label>
            <Form.Control
             name="ProductCategory"
             style={{width: "400px"}} 
             as="select" 
             custom
             >
            </Form.Control>
          </Form.Group> 
            <Form.Group className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <Form.Label  >Description</Form.Label>
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
          <Button 
          type="submit" 
          className="post-prodForm-btn"
          >Submit</Button>    
          </Form>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
    )
}

export default PostProdForm
