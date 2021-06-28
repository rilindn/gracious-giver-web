import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Button} from 'react-bootstrap'
// import faPhotoUpload from '../../images/photoUpload.png'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import Footer from '../footer/Footer';
import Header from '../Header/Header';

const RequestForm = () => {
    let history = useHistory()
    const [categories, setCategories] = useState([]);
    const [selectedFiles,setSelectedFiles] = useState([]);
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
            RequestCategory: event.target.RequestCategory.value,
            RequestLocation: event.target.RequestLocation.value,
            RequestComment: event.target.RequestComment.value,
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