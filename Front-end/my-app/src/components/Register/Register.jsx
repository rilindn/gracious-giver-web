import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import HeaderLoginRegister from '../../components/Header/HeaderLoginRegister'
import Footer from '../../components/footer/Footer'




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
              <form>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                
                  <MDBInput
                    label="User Name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    placeholder=" User Name"
                  />
                    <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    placeholder="XXXXXX"

                  />
                   <MDBInput
                  label="Confirm password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  placeholder="XXXXXX"
                 />
                
             <div> 
           <select   className="browser-default custom-select" >
            <option>Kosovo</option>
            <option value="1">France</option>
          <option value="2">Albania</option>
            <option value="3"> Germany</option>
            </select>
            </div>  
            <p>State</p> 
            <div> 
            
                  <select   className="browser-default custom-select" >
                   <option>Prishtine</option>
                   <option value="1">Gjilan</option>
                 <option value="2">Ferizaj</option>
                   <option value="3"> Malisheve</option>
                   </select>
                   </div>  
                   <p>City</p> 
      
                   <MDBInput
                    label="Postcode"
                    icon="envelope"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right"
                    placeholder="Postcode"
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    placeholder="xxxxxxx@gmail.com"
                  />
                  <MDBInput
                    label="Confirm your email"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    placeholder="xxxxxxx@gmail.com"
                  />
                     
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio1"
    value="option1"
  />
  <label class="form-check-label" for="inlineRadio1">F</label>
</div>

<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio2"
    value="option2"
  />
  <label class="form-check-label" for="inlineRadio2">M</label>
</div>
<p>Gender</p>


                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn 
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a">
                    Register
                  </MDBBtn>
                </div>
              </form>
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