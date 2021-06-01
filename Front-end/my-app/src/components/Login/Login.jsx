import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBModalFooter, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import Footer from "../footer/Footer";
import HeaderLoginRegister from "../Header/HeaderLoginRegister";
import {BsPersonFill} from "react-icons/bs";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { SocialIcon } from 'react-social-icons';
import { FontAwesome } from 'react-icons/fa'
import { faPlus,faQuoteLeft,faQuoteRight, faPlusCircle, faUserPlus, faRedoAlt, FaUser, FaLock, FaMapMarked, FaEnvelope} from 'react-icons/fa'

 
const FormPage = () => {
  return (
    <div id="bodyRegister">
      <div>
        <HeaderLoginRegister>

        </HeaderLoginRegister>
      </div>
    <MDBContainer >
      <MDBRow  >
        <MDBCol md="6" >
          <MDBCard id="logincard">
            <MDBCardBody className="mx-4 ">
              <div className="text-center ">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign in</strong>
                </h3>
              </div>

              <FormLabel>
                      Username </FormLabel>
              <FaUser className="icon-position-ul"/>       
              <MDBInput className="lbl-position-lgn"
                type="email"
                error="wrong"
                success="right"
                style={{width:"400px", paddingLeft:"30px"}}
              />

            <FormLabel>
                      Password </FormLabel>
              <FaLock className="icon-position-pl"/>        
              <MDBInput className = "lbl-position-lgn"
                type="password"
                containerClass="mb-0"
                icon="BsPersonFill"
                style={{width:"400px", paddingLeft:"30px"}}
              />
              <p className="font-small blue-text d-flex-f pb-3">
                Forgot
                <a href="#!" className="blue-text ml-1">

                  Password?
                </a>
              </p>
              <div className="text-center mb-3 submit-btn-lgn">
                <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  style={{width:"100px"}}
                >
                  Sign in
                </MDBBtn>
              </div>
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                or Sign in with:
              </p>
              {/* <div className="row my-3 d-flex justify-content-center">
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="facebook-f" className="black-text text-center" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="black"
                  rounded
                  // className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="twitter" className="black-text" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="black"
                  rounded
                  className="z-depth-1a"
                >
                  <MDBIcon fab icon="google-plus-g" className="black-text" />
                </MDBBtn>
              </div> */}

        <ul className="d-flex  list-unstyled list-inline social justify-content-center list">
						<li className="list-inline-item"><a><SocialIcon url="https://facebook.com"/></a></li>
						<li className="list-inline-item"><a><SocialIcon url="https://mail.google.com/" /></a></li>
					</ul>
            </MDBCardBody>
              <p className="font-small grey-text d-flex justify-content-center">
                Not a member?
                <a href="../register" className="blue-text ml-1">

                  Sign Up
                </a>
              </p>
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

