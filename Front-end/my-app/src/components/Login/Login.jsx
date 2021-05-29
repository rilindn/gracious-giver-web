import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBModalFooter, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import Footer from "../footer/Footer";
import HeaderLoginRegister from "../Header/HeaderLoginRegister";
import {BsPersonFill} from "react-icons/bs";

 
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
              <MDBInput
                label="Your email"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                placeholder="your email"
                

              />
              <MDBInput
               
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
                placeholder="xxxxxxx"
                icon="BsPersonFill"
              />
              <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                <a href="#!" className="blue-text ml-1">

                  Password?
                </a>
              </p>
              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Sign in
                </MDBBtn>
              </div>
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                or Sign in with:
              </p>
              <div className="row my-3 d-flex justify-content-center">
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="twitter" className="blue-text" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="z-depth-1a"
                >
                  <MDBIcon fab icon="google-plus-g" className="blue-text" />
                </MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small grey-text d-flex justify-content-end">
                Not a member?
                <a href="#!" className="blue-text ml-1">

                  Sign Up
                </a>
              </p>
            </MDBModalFooter>
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

