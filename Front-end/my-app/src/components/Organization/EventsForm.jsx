import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

    const [values,setValues] = useState({
      EventName:"",
      EventDescription: "",
      EventDate: "",
      City: ""
    })

    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]:event.target.value,
      })
    }

    useEffect(()=>{
     
    },[]);
    
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
            OrganizationId: loggedInUser.OrganizationId
          })
          .then(
            (res) => {
              history.push("/home");
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

      return (
        <div>
        <Header/>
        <div className="pt-3 prod-form-wrapper3 mx-auto">
            <h2  style ={{fontFamily:'Hanalei Fill'}} className="new-post-t1">Create an Event</h2>
            <h6 className="new-post-j2">As an organization you can create events to help people!</h6> 
        <Form 
            onSubmit={handleSubmit}
            style={{width:"750px"}} 
            className ="form-components-width mx-auto">
            <FormGroup className="form-group-el d-flex">
            <FormLabel htmlFor="inputName">EventName</FormLabel>
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
            <FormLabel  >Event Description</FormLabel>
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

            <FormGroup className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <FormLabel  >Event Date</FormLabel>
            <div>
            <FormControl 
            name="EventDate" 
            type="datetime-local"
            placeholder ="EventDate" 
            style={{width:"200px", marginRight:"200px"}}  
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