import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import HeaderLoginRegister from '../../components/Header/HeaderLoginRegister'
import Footer from '../../components/footer/Footer'
import userLogo from '../../images/username1.png'
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { MDBInputGroupText } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faQuoteLeft,faQuoteRight, faPlusCircle, faUserPlus, faRedoAlt } from '@fortawesome/free-solid-svg-icons'





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
                      
                  <MDBInput className ="lbl-position"
                  
                    icon ={faPlusCircle}
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    placeholder=" Username"
                    style={{width:"400px"}}
                  />
                  
                  <FormLabel className="label-alignin">
                    Password
                  </FormLabel >
                    <MDBInput className ="lbl-position"
                    icon="lock"
                    group
                    type="password"
                    validate
                    placeholder="Password"
                    style={{width:"400px"}}
                  />
                  <FormLabel className="label-alignin">
                  Confirm password
                  </FormLabel>
                   <MDBInput className ="lbl-position"
                  icon="lock"
                  group
                  type="password"
                  validate
                  placeholder="Confirm password"
                  style={{width:"400px"}}
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

                   <MDBInput className ="lbl-position"
                    icon="envelope"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right"
                    placeholder="Postcode"
                    style={{width:"400px"}}
                  />
                  <FormLabel className="label-alignin">
                  Email
                </FormLabel>
                  <MDBInput className ="lbl-position"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    placeholder="Email"
                    style={{width:"400px"}}
                  />
                  <FormLabel className="label-alignin">
                  Confirm your email
                  </FormLabel>
                  <MDBInput className ="lbl-position"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    placeholder="Confirm email"
                    style={{width:"400px"}}
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