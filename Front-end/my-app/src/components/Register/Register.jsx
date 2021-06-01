import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import HeaderLoginRegister from '../../components/Header/HeaderLoginRegister'
import Footer from '../../components/footer/Footer'
import userLogo from '../../images/username1.png'
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { MDBInputGroupText } from "mdb-react-ui-kit";
import { FontAwesome } from 'react-icons/fa'
import { faPlus,faQuoteLeft,faQuoteRight, faPlusCircle, faUserPlus, faRedoAlt, FaUser, FaLock, FaMapMarked, FaEnvelope} from 'react-icons/fa'







const FormPage = () => {

  
  
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
              <Form style={{color:"black"}}>
                <h2 className="text-center py-2">Sign up</h2>
                <h5 className="pb-4">Ask for stuff, setup alerts and give things away.</h5>
                <div className="grey-text">
                
                
                  <FormLabel  className="label-alignin">
                   Username </FormLabel>
                   <FaUser className="icon-position"/>
                  <MDBInput className ="lbl-position pad"
                    type="text"
                    error="wrong"
                    success="right"
                    style={{width:"400px", paddingLeft:"30px" }}
                  />
                  
                  <FormLabel className="label-alignin">
                    Password
                  </FormLabel >
                  <FaLock className="icon-position-p"/>
                    <MDBInput className ="lbl-position"
                    type="password"
                    style={{width:"400px", paddingLeft:"30px" }}
                  />
                  <FormLabel className="label-alignin">
                  Confirm password
                  </FormLabel>
                  <FaLock className="icon-position-c"/>
                   <MDBInput className ="lbl-position"
                  type="password"
                  validate
                  style={{width:"400px", paddingLeft:"30px" }}
                 />
                
                   <FormLabel className="label-alignin">
                     State
                  </FormLabel>
                  
                      <Form.Control className ="lbl-position-d"
                      style={{width: "400px"}} 
                      as="select" 
                      custom
                      >
                        <option>Albania</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Italy</option>
                      </Form.Control>
          
          
                      <FormLabel className="label-alignin">
                        City
                  </FormLabel>
                        <Form.Control className ="lbl-position-d"
                        style={{width: "400px"}} 
                        as="select" 
                        custom
                        >
                          <option>Gjilan</option>
                          <option>Ferizaj</option>
                          <option>Prishtine</option>
                          <option>Prizren</option>
                        </Form.Control>
                   <FormLabel className="label-alignin">
                   Postcode
                  </FormLabel>
                  <FaMapMarked className="icon-position-pc"/>
                   <MDBInput className ="lbl-position"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right"
                    style={{width:"400px", paddingLeft:"30px"}}
                  />
                  <FormLabel className="label-alignin">
                  Email
                </FormLabel>
                <FaEnvelope className="icon-position-e"/>
                  <MDBInput className ="lbl-position"
                    type="email"
                    error="wrong"
                    success="right"
                    style={{width:"400px", paddingLeft:"30px"}}
                  />
                  <FormLabel className="label-alignin">
                  Confirm your email
                  </FormLabel>
                  <FaEnvelope className="icon-position-ce"/>
                  <MDBInput className ="lbl-position"
                    type="text"
                    validate
                    error="wrong"
                    success="right"
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
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineRadio1">Female</label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
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
                  name="DateOfBirth"
                  required
                  placeholder="Date of birth"
                  ></FormControl>
                </div>

              
                
                <div className="text-center py-4 mt-3">
                  <MDBBtn 
                  type="button"
                  gradient="blue"
                  rounded
                  style={{width:"100px"}}
                  className="btn-block z-depth-1a btn-position">
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