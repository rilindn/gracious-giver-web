import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import faPhotoUpload from '../../images/photoUpload.png'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import Footer from '../footer/Footer';
import Header from '../Header/Header';

const RequestForm = ({loggedInUser}) => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/Request/', {
            RequestDescription: event.target.RequestDescription.value,
            RequestName: event.target.RequestName.value,
            RequestPhoto: event.target.RequestPhoto.value,
            RequestCategory: event.target.RequestCategory.value,
            RequestLocation: event.target.RequestLocation.value,
            RequestComment: event.target.RequestComment.value,
            ReceiverId: loggedInUser.UserId
          })
          .then(()=>{
            axios.get("http://localhost:5000/api/request/last")
            .then((res)=>{
              for (let index = 0; index < selectedFilesName.length; index++) {
                axios.post('http://localhost:5000/api/RequestPhotos',{
                  Request: res.data.RequesttId,
                  RequestPhotoPath: selectedFilesName[index].name
                }
              )}})
          })
          .then(
            (res) => {
              history.push("/home");
              NotificationManager.success(
              'Request added succesfully!',
              '',
              2000,
              )
            },
            (error) => {
              NotificationManager.error(
                'Error while adding new request!'+{error},
                '',
                1000,
                )
            },
          )
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
              axios.post('http://localhost:5000/api/request/SaveFile/Request', formdata)
            }catch(e){
              console.log(e)
            }
          }
        }
      }

    return (
       <div>
        <Header>

        </Header>
        
        <div className="pt-3 prod-form-wrapper mx-auto">
        <h2  style ={{fontFamily:'Hanalei Fill'}} className="new-post-t1">Post a requirement</h2>
            <h6 className="new-post-j1">As a receiver you can post requirements for the product you need!</h6>    
            <div className ="txt-post-product1 mx-auto ">
                </div>
        <Form 
        onSubmit={handleSubmit}
        style={{width:"750px"}} 
        className ="form-components-width mx-auto">
          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Request Name</Form.Label>
            <Form.Control
              style={{width: "400px"}}
              type="text"
              name="RequestName"
            />
          </Form.Group>

          <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label>Request Category</Form.Label>
            <Form.Control
             name="RequestCategory"
             style={{width: "400px"}} 
             as="select" 
             custom
             >
             {categories.map(categorie=>(
              <option>{categorie.ProductCategoryName}</option>
             ))}
            </Form.Control>
          </Form.Group> 

            
            <Form.Group className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <Form.Label  >Request Description</Form.Label>
            <Form.Control 
            name="RequestDescription" 
            placeholder ="Type here..." 
            style={{width: "400px"}} 
            as="textarea" 
            rows={3} 
            />
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
            name="RequestPhoto" 
            multiple
            style={{display:"none"}}  
            hidden
            className ="d-flex"
            id="exampleFormControlFile1"
            onChange={handlePhotoSubmit}
            ref={fileInput}
            />
          </Form.Group >

          <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label>Location</Form.Label>
            <Form.Control 
            name="RequestLocation"
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
            <Form.Label >Request Comments</Form.Label>
            <Form.Control 
            name="RequestComment"
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
         <div>
            <Footer/>
        </div>
        </div>
        
    )
}

export default RequestForm