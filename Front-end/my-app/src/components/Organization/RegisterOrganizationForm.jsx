import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Col, Button} from 'react-bootstrap'
import faPhotoUpload from '../../images/photoUpload.png'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import Footer from '../footer/Footer';
import Header from '../Header/HeaderLoginRegister';
import ValidationOrganization from './ValidationOrganization';

const RegisterOrganizationForm = ({loggedInUser}) => {

    let history = useHistory()
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [photoName, setPhotoName] = useState();
    const [fileName, setFileName] = useState();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const fileInput = useRef(null);
    const logoInput = useRef(null);

    const [values,setValues] = useState({
      username:"",
      password:"",
      name: "",
      
      email: "",
    })

    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]:event.target.value,
      })
    }

    const handleFileInputClick = event => {
      fileInput.current.click();
    };
    const handleLogoInputClick = event => {
      logoInput.current.click();
    };

    useEffect(()=>{
        getCategories();
        getStates();
        getCities();
    },[]);

    const getStates = async () => {
      try{
        await axios.get('http://localhost:5000/api/shteti')
        .then(res=>{
          console.log(res)
          setStates(res.data)
        })
      }
      catch(e){
        console.log(e);
      }
    }

    const getCities = async () => {
      try{
        await axios.get('http://localhost:5000/api/city')
        .then(res=>{
          console.log(res)
          setCities(res.data)
        })
      }
      catch(e){
        console.log(e);
      }
    }

    const getCategories = async () => {
        try{
        await axios.get('http://localhost:5000/api/organizationcategory')
        .then(res=>{
          console.log(res.data)
            setCategories(res.data)
        })
        }
        catch(e){
            console.log(e);
        }
    }

    const handleFileSubmit = (e) => {
      e.preventDefault()
      if(e.target.files.length!==0){
      setFileName(e.target.files[0].name);
      const formData = new FormData()
      formData.append('myFile',e.target.files[0],e.target.files[0].name)
            try{
              axios.post('http://localhost:5000/api/Organization/SaveFile/Organization', formData)
            }catch(e){
              console.log(e)
            }
        }
      }
    const handlePhotoSubmit = (e) => {
      e.preventDefault()
      if(e.target.files.length!==0){
      setPhotoName(e.target.files[0].name);
      const formData = new FormData()
      formData.append('myFile',e.target.files[0],e.target.files[0].name)
            try{
              axios.post('http://localhost:5000/api/Organization/SaveFile/Organization', formData)
            }catch(e){
              console.log(e)
            }
          }
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(ValidationOrganization(values));
        if(Object.keys(errors).length===0){
        axios.post('http://localhost:5000/api/pendingorganizationsrequest', {
            Username: event.target.username.value,
            Password: event.target.password.value,
            Name: event.target.name.value,
            Email: event.target.email.value,
            Logo: photoName,
            Documentation: fileName,
            Category: event.target.category.value,
            Description: event.target.description.value,
            State: event.target.state.value,
            City: event.target.city.value,
            Checked: false
          })
          .then(
            (res) => {
              history.push("/home");
              NotificationManager.success(
              'Organization added succesfully!',
              '',
              2000,
              )
            },
            (error) => {
              NotificationManager.error(
                'Error while adding new organization!'+{error},
                '',
                1000,
                )
            },
          )
    }
  }
    return (
        <div>
              <Header/>
            <div className="pt-3 prod-form-wrapper2 mx-auto">
            <h2  style ={{fontFamily:'Hanalei Fill'}} className="new-post-t1">Register as Organization</h2>
            <h6 className="new-post-j1">As an organization you can create events and initiatives to help people!</h6> 
        <Form 
        onSubmit={handleSubmit}
        style={{width:"750px"}} 
        className ="form-components-width mx-auto">
          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Username</Form.Label>
            <div>
            <Form.Control
              style={{width: "400px"}}
              type="text"
              name="username"
              required
              value={values.username}
              onChange={handleChange}
            />
              <p className="error">{errors.username}</p>
                    {errors.username &&
                    <ul>
                      <li className="info">{errors.usernameNote1}</li>
                      <li className="info">{errors.usernameNote2}</li>
                    </ul>}
              </div>
            
          </Form.Group>

          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Password </Form.Label>
            <div>
            <Form.Control
              style={{width: "400px"}}
              type="password"
              name="password"
              required
              value={values.password}
              onChange={handleChange}
            />
               <p className="error">{errors.password}</p>
                   {errors.password &&
                    <ul>
                      <li className="info">{errors.passwordNote1}</li>
                      <li className="info">{errors.passwordNote2}</li>
                      <li className="info">{errors.passwordNote3}</li>
                      <li className="info">{errors.passwordNote4}</li>
                    </ul>}
             </div>
          </Form.Group>

          
          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Name </Form.Label>
            <div>
            <Form.Control
              style={{width: "400px"}}
              type="text"
              name="name"
              required
              value={values.name}
              onChange={handleChange}
            />
             <p className="error">{errors.name}</p>
                    {errors.name &&
                    <ul>
                      <li className="info">{errors.nameNote1}</li>
                      <li className="info">{errors.nameNote2}</li>
                    </ul>}
              </div>
          </Form.Group>

          <Form.Group className="form-group-el d-flex">
            <Form.Label htmlFor="inputName">Email </Form.Label>
            <div>
            <Form.Control
              style={{width: "400px"}}
              type="email"
              name="email"
              required
              value={values.email}
              onChange={handleChange}
            />
            <p className="error">{errors.email}</p>
            </div>
          </Form.Group>

          <Form.Group className="form-group-el d-flex justify-content-start">
            <Form.Label htmlFor="inputName"
            style={{marginRight:"90px"}}
            >Logo </Form.Label>
            <button
            type="button"
            onClick={handleLogoInputClick}
            className="orgUploadBtn"
            
            >
              {photoName?photoName:"Choose file"}
            </button>
            <Form.Control
              style={{width: "400px",display:"none"}}
              type="file"
              name="logo"
              onChange={handlePhotoSubmit}
              ref={logoInput}
              required
            />
            
          </Form.Group>

          <Form.Group className="form-group-el d-flex justify-content-start">
            <Form.Label htmlFor="inputName">Documentation </Form.Label>
            <button
            type="button"
            onClick={handleFileInputClick}
            className="orgUploadBtn"
           
            >
              {fileName?fileName:"Choose file"}
            </button>
            <Form.Control
              style={{width: "400px",display:"none"}}
              type="file"
              name="documentation"
              onChange={handleFileSubmit}
              ref={fileInput}
              required
            />
          </Form.Group>

          <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label> Category</Form.Label>
            <Form.Control
             name="category"
             style={{width: "400px"}} 
             as="select" 
             custom
             required
             >
              {categories.map(categorie=>(
              <option>{categorie.OrganizationCategoryName}</option>
             ))}
            </Form.Control>
          </Form.Group> 
            <Form.Group className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <Form.Label  >Description</Form.Label>
            <div>
            <Form.Control 
            name="description" 
            placeholder ="Type here..." 
            style={{width: "400px"}} 
            as="textarea" 
            rows={3} 
            required
            value={values.description}
            onChange={handleChange}
            />
            <p className="error">{errors.description}</p>
            </div>
          </Form.Group>

          <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label>State</Form.Label>
            <Form.Control
             style={{width: "400px"}} 
             as="select" 
             name="state"
             custom
             required
            >
             {states.map(state=>(
             <option value={state.Emri}>{state.Emri}</option>
            ))}
         </Form.Control>
          </Form.Group>            
          <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label>City</Form.Label>
            <Form.Control
             style={{width: "400px"}} 
             as="select" 
             name="city"
             custom
             required
            >
            {cities.map(city=>(
             <option value={city.CityName}>{city.CityName}</option>
             ))}
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

export default RegisterOrganizationForm
