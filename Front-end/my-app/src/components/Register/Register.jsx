import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, {useEffect, useState } from "react";
import HeaderLoginRegister from '../../components/Header/HeaderLoginRegister'
import Footer from '../../components/footer/Footer'
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { FaUser, FaLock, FaMapMarked, FaEnvelope} from 'react-icons/fa'
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const FormPage = () => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [redirect, setRedirect] = useState(false);
    
    useEffect(() =>{
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


    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:5000/api/register', {
        UserName: event.target.username.value,
        UserPassword: event.target.password.value,
        UserState: event.target.state.value,
        UserCity: event.target.city.value,
        UserPostCode: event.target.postcode.value,
        UserRole: event.target.role.value,
        UserEmail: event.target.email.value,
        UserGender: event.target.maleFemale.value,
        UserDbo: event.target.birth.value
      })
      .then(
        (res) =>{
          alert("Succesfully registered")
          console.log(res.data); 
        },
        (error) =>{
          alert(error)
        },
      )
      setRedirect(true);
    }

    if(redirect){
    return <Redirect to="/login"/>
    }

  return (
    <div id="bodyRegister">
        <div>
            <HeaderLoginRegister/>
        </div>
    <MDBContainer id="bodyRegister">
      <MDBRow >
        <MDBCol md="6" >
          <MDBCard id="CardRegister" >
            <MDBCardBody >
              <Form
               onSubmit={handleSubmit}
               style={{color:"black"}}>
                <h2 className="text-center py-2">Sign up</h2>
                <h5 className="pb-4">Ask for stuff, setup alerts and give things away.</h5>
                <div className="grey-text">
                
                
                  <FormLabel  className="label-alignin">
                        Username 
                  </FormLabel>
                    <FaUser className="icon-position"/>
                        <MDBInput className ="lbl-position pad"
                            type="text"
                            name ="username"
                            style={{width:"400px", paddingLeft:"30px" }}
                       />
                  
                  <FormLabel className="label-alignin">
                       Password
                  </FormLabel >
                  <FaLock className="icon-position-p"/>
                        <MDBInput className ="lbl-position"
                            type="password"
                            name="password"
                            style={{width:"400px", paddingLeft:"30px" }}
                    />
                  <FormLabel className="label-alignin">
                      Confirm password
                  </FormLabel>
                  <FaLock className="icon-position-c"/>
                      <MDBInput className ="lbl-position"
                          type="password"
                          name="confirmPassword"
                          style={{width:"400px", paddingLeft:"30px" }}
                 />
                
                   <FormLabel className="label-alignin">
                     State
                  </FormLabel>
                      <Form.Control className ="lbl-position-d"
                          style={{width: "400px"}} 
                          as="select" 
                          name="state"
                          custom
                      >
                          {states.map(state=>(
                          <option>{state.Emri}</option>
                     ))}
                      </Form.Control>
                    <FormLabel className="label-alignin">
                          City
                    </FormLabel>
                        <Form.Control className ="lbl-position-d"
                          style={{width: "400px"}} 
                          as="select" 
                          name="city"
                          custom
                        >
                          {cities.map(city=>(
                
                        <option>{city.CityName}</option>
                        ))}
                        </Form.Control>
                   <FormLabel className="label-alignin">
                       Postcode
                    </FormLabel>
                  <FaMapMarked className="icon-position-pc"/>
                      <MDBInput className ="lbl-position"
                          type="text"
                          name="postcode"
                          style={{width:"400px", paddingLeft:"30px"}}
                      />

                  <FormLabel className="label-alignin">
                     Email
                   </FormLabel>
                <FaEnvelope className="icon-position-e"/>
                    <MDBInput className ="lbl-position"
                          type="email"
                          name="email"
                          style={{width:"400px", paddingLeft:"30px"}}
                      />
                      
                  <FormLabel className="label-alignin">
                    Confirm your email
                  </FormLabel>
                  <FaEnvelope className="icon-position-ce"/>
                    <MDBInput className ="lbl-position"
                        type="text"
                        name="confirmEmail"
                        style={{width:"400px", paddingLeft:"30px"}}
                  />

                  <FormLabel className="label-alignin">
                    Gender
                  </FormLabel>

                  <div className="d-flex justify-content-start ml-3 ">
                     <div className="form-check form-check-inline text-left  lbl-position">
                       <input
                          className="form-check-input"
                          type="radio"
                          id="radioFemale"
                          value="F"
                          name="maleFemale"
                        />

                <label className="form-check-label" htmlFor="radioFemale">Female</label>
                 </div>

                   <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="radioMale"
                        value="M"
                        name="maleFemale"
                       />
                       
                <label className="form-check-label" htmlFor="radioMale">Male</label>
                 </div>
              </div>

                 <FormLabel className="label-alignin">
                    Date of birth
                  </FormLabel>

                  <FormControl className="lbl-position" 
                      style={{width:"200px"}}
                      type="date"
                      required
                      placeholder="Date of birth"
                      name="birth"
                  ></FormControl>
                </div>

              
                <FormLabel className="label-alignin">
                    Role
                </FormLabel>

                <div className="d-flex justify-content-start ml-3 ">
                   <div className="form-check form-check-inline text-left  lbl-position">
                     <input
                        className="form-check-input"
                        type="radio"
                        id="radioDonator"
                        value="Donator"
                        name="role"
                    />

                <label className="form-check-label" htmlFor="radioDonator">Donator</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="radioReceiver"
                        value="Receiver"
                        name="role"
                    />
                <label className="form-check-label" htmlFor="radioReceiver">Receiver</label>
                 </div>
              </div>
                
                <div className="text-center py-4 mt-3">
                  <MDBBtn 
                      type="submit"
                      gradient="blue"
                      rounded
                      style={{width:"150px", }}
                      className=" btn-position"
                      >
                      
                    Register
                  </MDBBtn>

                  <MDBCardBody>
                    <p className="font-small grey-text d-flex justify-content-center">
                      Already have an Account?
                       <a href="../Login" className="blue-text ml-1">
                           Sign in
                       </a>
                   </p>
               </MDBCardBody>
                </div>
              </Form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div>
        <Footer/>
    </div>
    </div>
  
  );
};

export default FormPage;