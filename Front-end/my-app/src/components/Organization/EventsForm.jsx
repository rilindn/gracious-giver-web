/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import Header from '../Header/Header';
import Footer from '../footer/Footer';
import { Form, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const EventsForm = () => {

    let history = useHistory()
    
    const [errors, setErrors] = useState({});
    const [organization, setOrganization] = useState([]);
    const[cities, setCities] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState([])
    const [photoName, setPhotoName] = useState();
    const logoInput = useRef(null);

    useEffect(() => {(async () => {
      axios
       .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
       .then((res) => {
         setLoggedInUser(res.data);
       })
   })()
   getCities();
   getOrganization();
 }, [])

    const [values,setValues] = useState({
      EventName:"",
      EventDescription: "",
      EventDate: "",
      City: ""
    })

    
    const handleLogoInputClick = event => {
      logoInput.current.click();
    };

    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]:event.target.value,
      })
    }
    

     const getCities = async () => {
         try{ 
         await axios.get(`http://localhost:5000/api/City`)
         .then(res=>{
             console.log(res.data)
             setCities(res.data)
             
         })
         }
         catch(e){
             console.log(e);
         }
     }


    const getOrganization = async () => {
        try{
          await axios.get('http://localhost:5000/api/Organization')
          .then(res=>{
            console.log(res)
            setOrganization(res.data)
          })
        }
        catch(e){
          console.log(e);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:5000/api/Events', {
            EventName: event.target.EventName.value,
            EventDescription: event.target.EventDescription.value,
            EventDate: event.target.EventDate.value,
            City: event.target.City.value,
            Photo:photoName,
            OrganizationId: loggedInUser.OrganizationId
          })
          .then(
            (res) => {
              history.push("/Organizationdetails/"+loggedInUser.OrganizationId);
              NotificationManager.success(
              'Event added succesfully!',
              '',
              2000,
              )
            },
            (error) => {
              NotificationManager.error(
                'Error while adding new Event!'+{error},
                '',
                1000,
                )
            },
          )
       
      }

      const handlePhotoSubmit = (e) => {
        e.preventDefault()
        if(e.target.files.length!==0){
        setPhotoName(e.target.files[0].name);
        const formData = new FormData()
        formData.append('myFile',e.target.files[0],e.target.files[0].name)
              try{
                axios.post('http://localhost:5000/api/Events/SaveFile', formData)
              }catch(e){
                console.log(e)
              }
            }
          }

      return (
        <div>
        <Header/>
        <div className="pt-3 prod-form-wrapper3 mx-auto">
            <h2  style ={{fontFamily:'Hanalei Fill'}} className="new-post-t1">Create an Event</h2>
            <h6 className="new-post-j2">As an organization you can create events to help people!</h6> 
        <Form 
            onSubmit={handleSubmit}
            className ="form-components-width mx-auto">
            <FormGroup className="form-group-el d-flex">
            <FormLabel htmlFor="inputName">Name</FormLabel>
            <div>
            <FormControl
                style={{width: "400px"}}
                type="text"
                name="EventName"
                required
                value={values.EventName}
                onChange={handleChange}
            />
            <p className="error">{errors.EventName}</p>
            </div>
            </FormGroup>

            <FormGroup className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <FormLabel  >Description</FormLabel>
            <div>
            <FormControl 
            name="EventDescription" 
            placeholder ="Type here..." 
            style={{width: "400px"}} 
            as="textarea" 
            rows={3} 
            required
            value={values.EventDescription}
            onChange={handleChange}
            />
            <p className="error">{errors.EventDescription}</p>
            </div>
            </FormGroup>

            <Form.Group className="form-group-el d-flex justify-content-start">
            <Form.Label htmlFor="inputName"
            style={{marginRight:"138px"}}
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

            <FormGroup className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <FormLabel>Date</FormLabel>
            <div>
            <FormControl 
            name="EventDate" 
            type="datetime-local"
            placeholder ="EventDate" 
            style={{width:"300px", marginRight:"100px"}}  
            required
            value={values.EventDate}
             onChange={handleChange}
            />
            <p className="error">{errors.EventDate}</p>
            </div>
            </FormGroup>

            <Form.Group className="form-group-el" controlId="exampleForm.SelectCustom">
            <Form.Label>City</Form.Label>
            <Form.Control
             style={{width: "400px"}} 
             as="select" 
             name="City"
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

export default  EventsForm