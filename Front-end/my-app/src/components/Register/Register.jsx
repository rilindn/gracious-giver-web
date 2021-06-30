import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, {useEffect, useState } from "react";
import HeaderLoginRegister from '../../components/Header/HeaderLoginRegister'
import Footer from '../../components/footer/Footer'
import { Form,FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FaUser, FaLock, FaMapMarked, FaEnvelope} from 'react-icons/fa'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Validation from './Validation';

const FormPage = () => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});
    let history = useHistory(); 
    const [values,setValues] = useState({
      firstname:"",
      lastname:"",
      username: "",
      password: "",
      confirmPassword: "",
      state: "",
      city: "",
      postcode: "",
      role: "",
      email: "",
      confirmEmail: "",
      maleFemale: "",
      birth: "",
    })

    
    
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
   
    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]:event.target.value,
      })
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(errors)
      setErrors(Validation(values));
      if(Object.keys(errors).length===0){
      axios.post('http://localhost:5000/api/register', {
        Firstname: event.target.firstname.value,
        Lastname: event.target.lastname.value,
        UserName: event.target.username.value,
        UserPassword: event.target.password.value,
        UserConfirmPassword: event.target.confirmPassword.value,
        UserState: event.target.state.value,
        UserCity: event.target.city.value,
        UserPostCode: event.target.postcode.value,
        UserRole: event.target.role.value,
        UserEmail: event.target.email.value,
        UserConfirmEmail: event.target.confirmEmail.value,
        UserGender: event.target.maleFemale.value,
        UserDbo: event.target.birth.value
      })
      .then(
        (res) =>{
          history.push("/login")
          NotificationManager.success('You have been successfully registered as '+event.target.role.value+'!','',3000);
          console.log(res.data); 
        },
        (error) =>{ 
          NotificationManager.error('Problems while trying to register, try again later!','',500);
          console.log(error);
        },
      )
      }
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
              className="d-flex flex-column align-items-center"
               onSubmit={handleSubmit}
               style={{color:"black"}}>
                <h2 className="text-center py-2">Sign up</h2>
                <h5 className="pb-4">Ask for stuff, setup alerts and give things away.</h5>
                <div className="grey-text">
                
                <FormGroup className="icon-position-fg">
                    <FormLabel  className="label-alignin">
                        Firstname 
                    </FormLabel>
                    <FaUser className="icon-position"/>
                        <MDBInput className ="lbl-position"
                            type="text"
                            name ="firstname"
                            required
                            style={{width:"400px", paddingLeft:"30px" }}
                            value={values.firstname}
                            onChange={handleChange}
                       />
                    <p className="error">{errors.firstname}</p>
                    {errors.firstname &&
                    <ul>
                      <li className="info">{errors.firstnameNote1}</li>
                      <li className="info">{errors.firstnameNote2}</li>
                      <li className="info">{errors.firstnameNote3}</li>
                    </ul>}
                    
                </FormGroup>
                <FormGroup className="icon-position-fg">
                    <FormLabel  className="label-alignin">
                        Lastname 
                    </FormLabel>
                    <FaUser className="icon-position"/>
                        <MDBInput className ="lbl-position"
                            type="text"
                            name ="lastname"
                            required
                            style={{width:"400px", paddingLeft:"30px" }}
                            value={values.lastname}
                            onChange={handleChange}
                       />
                    <p className="error">{errors.lastname}</p> 
                    {errors.lastname &&
                    <ul>
                      <li className="info">{errors.lastnameNote1}</li>
                      <li className="info">{errors.lastnameNote2}</li>
                      <li className="info">{errors.lastnameNote3}</li>
                    </ul>}
                </FormGroup>
                <FormGroup className="icon-position-fg">
                    <FormLabel  className="label-alignin">
                        Username 
                    </FormLabel>
                    <FaUser className="icon-position"/>
                        <MDBInput className ="lbl-position"
                            type="text"
                            name ="username"
                            required
                            style={{width:"400px", paddingLeft:"30px" }}
                            value={values.username}
                            onChange={handleChange}
                       />
                    <p className="error">{errors.username}</p>
                    {errors.username &&
                    <ul>
                      <li className="info">{errors.usernameNote1}</li>
                      <li className="info">{errors.usernameNote2}</li>
                      <li className="info">{errors.usernameNote3}</li>
                      <li className="info">{errors.usernameNote4}</li>
                    </ul>}
                </FormGroup>
                <FormGroup className="icon-position-fg">
                <FormLabel className="label-alignin">
                       Password
                  </FormLabel >
                  <FaLock className="icon-position"/>
                        <MDBInput className ="lbl-position"
                            type="password"
                            name="password"
                            required
                            style={{width:"400px", paddingLeft:"30px" }}
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
                  </FormGroup>
                <FormGroup className="icon-position-fg">
                  <FormLabel className="label-alignin">
                      Confirm password
                  </FormLabel>
                  <FaLock className="icon-position"/>
                      <MDBInput className ="lbl-position"
                          type="password"
                          name="confirmPassword"
                          required
                          style={{width:"400px", paddingLeft:"30px" }}
                          value={values.confirmPassword}
                          onChange={handleChange}
                 />
                 <p className="error">{errors.confirmPassword}</p>
                 </FormGroup>
                 <FormGroup className="icon-position-fg">
                   <FormLabel className="label-alignin">
                     State
                  </FormLabel>
                      <Form.Control
                          style={{width: "400px"}} 
                          as="select" 
                          name="state"
                          custom
                          required
                          value={values.state}
                          onChange={handleChange}
                      >
                          <option></option>
                          {states.map(state=>(
                          <option value={state.Emri}>{state.Emri}</option>
                     ))}
                      </Form.Control>
                 <p className="error">{errors.state}</p>
                      </FormGroup>     
                <FormGroup className="icon-position-fg">
                    <FormLabel className="label-alignin">
                          City
                    </FormLabel>
                        <Form.Control 
                          style={{width: "400px"}} 
                          as="select" 
                          name="city"
                          custom
                          value={values.city}
                          required
                          onChange={handleChange}
                        >
                          <option></option>
                          {cities.map(city=>(
                        <option value={city.CityName}>{city.CityName}</option>
                        ))}
                        </Form.Control>
                 <p className="error">{errors.city}</p>
                        </FormGroup>      
                <FormGroup className="icon-position-fg">
                   <FormLabel className="label-alignin">
                       Postcode
                    </FormLabel>
                  <FaMapMarked className="icon-position"/>
                      <MDBInput className ="lbl-position"
                          type="text"
                          name="postcode"
                          style={{width:"400px", paddingLeft:"30px"}}
                          value={values.postcode}
                          required
                          onChange={handleChange}
                      />
                      <p className="error">{errors.postcode}</p>
                      </FormGroup>
                      <FormGroup className="icon-position-fg">

                  <FormLabel className="label-alignin">
                     Email
                   </FormLabel>
                <FaEnvelope className="icon-position"/>
                    <MDBInput className ="lbl-position"
                          type="text"
                          name="email"
                          style={{width:"400px", paddingLeft:"30px"}}
                          value={values.email}
                          required
                          onChange={handleChange}
                      />
                      <p className="error">{errors.email}</p>
                      </FormGroup>
                      <FormGroup className="icon-position-fg">
                      
                  <FormLabel className="label-alignin">
                    Confirm your email
                  </FormLabel>
                  <FaEnvelope className="icon-position"/>
                    <MDBInput className ="lbl-position"
                        type="text"
                        name="confirmEmail"
                        required
                        style={{width:"400px", paddingLeft:"30px"}}
                        value={values.confirmEmail}
                        onChange={handleChange}
                  />
                  <p className="error">{errors.confirmEmail}</p>
                  </FormGroup>
                  <FormGroup className="icon-position-fg">

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
                          required
                          name="maleFemale"
                          onChange={handleChange}
                        />

                <label className="form-check-label" htmlFor="radioFemale">Female</label>
                 </div>

                   <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="radioMale"
                        value="M"
                        required
                        name="maleFemale"
                        onChange={handleChange}
                       />
                       
                <label className="form-check-label" htmlFor="radioMale">Male</label>
                 </div>
                 
              </div>
              
                 <p className="error">{errors.maleFemale}</p>
              </FormGroup>
                <FormGroup className="icon-position-fg">

                 <FormLabel className="label-alignin">
                    Date of birth
                  </FormLabel>

                  <FormControl className="lbl-position" 
                      style={{width:"200px"}}
                      type="date"
                      placeholder="Date of birth"
                      name="birth"
                      required
                      value={values.birth}
                      onChange={handleChange}
                  ></FormControl>
                  <p className="error">{errors.birth}</p>
                  </FormGroup>
                </div>
                <FormGroup className="icon-position-fg">

              
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
                        required
                        onChange={handleChange}
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
                        required
                        onChange={handleChange}
                    />
                <label className="form-check-label" htmlFor="radioReceiver">Receiver</label>
                 </div>
              </div>
              </FormGroup>
                 <p className="error">{errors.role}</p>
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