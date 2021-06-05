import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, {useEffect, useState } from "react";
import HeaderLoginRegister from '../../components/Header/HeaderLoginRegister'
import Footer from '../../components/footer/Footer'
import userLogo from '../../images/username1.png'
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { MDBInputGroupText } from "mdb-react-ui-kit";
import { FontAwesome } from 'react-icons/fa'
import { faPlus,faQuoteLeft,faQuoteRight, faPlusCircle, faUserPlus, faRedoAlt, FaUser, FaLock, FaMapMarked, FaEnvelope} from 'react-icons/fa'
import axios from 'axios';

const FormPage = () => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    
    useEffect(() =>{
      getStates();
      getCities();
    },[]);
    

    const getStates = async () => {
      try{
        const data = await axios.get('http://localhost:5000/api/shteti')
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
        const data = await axios.get('http://localhost:5000/api/city')
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
      axios.post('http://localhost:5000/api/DM_User', {
        UserName: event.target.username.value,
        UserPassword: event.target.password.value,
        UserState: event.target.password.value,
        UserCity: event.target.city.value,
        UserPostCode: event.target.postcode.value,
        UserRole: event.target.role.value,
        UserEmail: event.target.email.value,
        UserGender: event.target.maleFemale.value,
        UserDbo: event.target.birth.value
      })
      .then(
        (res) =>{
          alert(res)
          console.log(res); 
        },
        (error) =>{
          alert(error)
        },
      )
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
                          name="confirmPassowrd"
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
                     <div class="form-check form-check-inline text-left  lbl-position">
                       <input
                          class="form-check-input"
                          type="radio"
                          id="inlineRadio1"
                          value="F"
                          name="maleFemale"
                        />

                <label class="form-check-label" for="inlineRadio1">Female</label>
                 </div>

                   <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        value="M"
                        name="maleFemale"
                       />
                       
                <label class="form-check-label" for="inlineRadio2">Male</label>
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
                   <div class="form-check form-check-inline text-left  lbl-position">
                     <input
                        class="form-check-input"
                        type="radio"
                        id="inlineRadio1"
                        value="Donator"
                        name="role"
                    />

                <label class="form-check-label" for="inlineRadio1">Donator</label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        value="Receiver"
                        name="role"
                    />
                <label class="form-check-label" for="inlineRadio2">Receiver</label>
                 </div>
              </div>
                
                <div className="text-center py-4 mt-3">
                  <MDBBtn 
                      type="submit"
                      gradient="blue"
                      rounded
                      style={{width:"150px", }}
                      className=" btn-position"
                      onClick={handleSubmit}
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