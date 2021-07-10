/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import Header from '../Header/Header';
import Footer from '../footer/Footer';
import { Form, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const InitiativeForm = () => {

    let history = useHistory()
    
    const [errors, setErrors] = useState({});
    const [organization, setOrganization] = useState([]);
    
    const [loggedInUser, setLoggedInUser] = useState([])
    
  

    useEffect(() => {(async () => {
      axios
       .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
       .then((res) => {
         setLoggedInUser(res.data);
       })
   })()
  
   getOrganization();
 }, [])

    const [values,setValues] = useState({
      IniciativeName:"",
      IniciativeDescription: "",
      IniciativeDate: ""
    })

    


    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]:event.target.value,
      })
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
        
        axios.post('http://localhost:5000/api/Iniciative', {
          IniciativeName: event.target.IniciativeName.value,
          IniciativeDescription: event.target.IniciativeDescription.value,
          IniciativeDate: event.target.IniciativeDate.value,
            
            OrganizationId: loggedInUser.OrganizationId,
            ReceriverId: loggedInUser.ReceriverId
          })
          .then(
            (res) => {
              history.push("/Initiativedetails/"+loggedInUser.OrganizationId);
              NotificationManager.success(
              'Initiative added succesfully!',
              '',
              2000,
              )
            },
            (error) => {
              NotificationManager.error(
                'Error while adding new Initiative!'+{error},
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
            <h2  style ={{fontFamily:'Hanalei Fill'}} className="new-post-t1">Create an Initiative</h2>
            <h6 className="new-post-j2">As an organization you can create an initiative for this request! </h6> 
        <Form 
            onSubmit={handleSubmit}
            className ="form-components-width mx-auto">
            <FormGroup className="form-group-el d-flex">
            <FormLabel htmlFor="inputName">Name</FormLabel>
            <div>
            <FormControl
                style={{width: "400px"}}
                type="text"
                name="IniciativeName"
                required
                value={values.IniciativeName}
                onChange={handleChange}
            />
            <p className="error">{errors.IniciativeName}</p>
            </div>
            </FormGroup>

            <FormGroup className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <FormLabel  >Description</FormLabel>
            <div>

            <FormControl 
            name="IniciativeDescription" 
            placeholder ="Type here..." 
            style={{width: "400px"}} 
            as="textarea" 
            rows={3} 
            required
            value={values.IniciativeDescription}
            onChange={handleChange}
            />
            <p className="error">{errors.IniciativeDescription}</p>
            </div>
            </FormGroup>

       
          

            <FormGroup className="form-group-el" controlId="exampleForm.ControlTextarea1">
            <FormLabel>Date</FormLabel>
            <div>
            <FormControl 
            name="IniciativeDate" 
            type="datetime-local"
            placeholder ="IniciativeDate" 
            style={{width:"300px", marginRight:"100px"}}  
            required
            value={values.IniciativeDate}
             onChange={handleChange}
            />
            <p className="error">{errors.IniciativeDate}</p>
            </div>
            </FormGroup>

                    

                
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

export default InitiativeForm