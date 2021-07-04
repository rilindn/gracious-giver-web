import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { useState } from "react";
import Footer from "../footer/Footer";
import HeaderLoginRegister from "../Header/HeaderLoginRegister";
import { Form, FormLabel,FormGroup,Spinner } from "react-bootstrap";
import { SocialIcon } from 'react-social-icons';
import { FaUser, FaLock} from 'react-icons/fa'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

 
const FormPage = () => {

  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[logged,setLogged]=useState(false)
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault()
    const posReq = axios.create({
      withCredentials:true
    })
    setTimeout(()=>{
      posReq.post('http://localhost:5000/api/login',{
          UserName: username,
          UserPassword: password
        })
      .then(
        (res) =>{
            console.log(res.data)
            if(res.data.OrganizationId!==undefined)
            {
              history.push('/Organizationdetails/'+res.data.OrganizationId);
              NotificationManager.success(`You have been successfully logged in as Organization!`,'',3000);
            }
            else{
              history.push('/home');
              NotificationManager.success(`You have been successfully logged in as ${res.data.UserRole}!`,'',3000);
            }
            setLogged(false);
        },
        (error) =>{
          NotificationManager.error('Username or password incorrect!','',500);
          setLogged(false);
        },
      )
    },2000)
    
  }

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
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center"
            >
              <FormGroup className="icon-position-fg">
              <FormLabel className="label-alignin">
                      Username </FormLabel>
              <FaUser className="icon-position"/>       
              <MDBInput className="lbl-position"
                type="text"
                error="wrong"
                success="right"
                name="username"
                onChange={e=>setUsername(e.target.value)}
                style={{width:"400px", paddingLeft:"30px",marginBottom:"5px"}}
              />
              </FormGroup>

              <FormGroup className="icon-position-fg">
            <FormLabel className="label-alignin">
                      Password </FormLabel>
              <FaLock className="icon-position"/>        
              <MDBInput className = "lbl-position"
                type="password"
                containerClass="mb-0"
                icon="BsPersonFill"
                name="password"
                onChange={e=>setPassword(e.target.value)}
                style={{width:"400px", paddingLeft:"30px"}}
              />
              </FormGroup>
              <p className="font-small blue-text d-flex-f pb-3">
                Forgot
                <a href="#!" className="blue-text ml-1">

                  Password?
                </a>
              </p>
              <div className="text-center mb-3 submit-btn-lgn d-flex justify-content-center">
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  style={{width:"150px",margin:"0"}}
                  onClick={()=>setLogged(true)}
                >
                  
                  {logged?<span>Loading...<Spinner animation="border" style={{width:"20px",height:"20px",marginLeft:"10px"}} /></span> :"Sign in"}
                </MDBBtn>
                
              </div>
              </Form>
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                or Sign in with:
              </p>
        <ul className="d-flex  list-unstyled list-inline social justify-content-center list">
						<li className="list-inline-item"><a href="https://facebook.com"><SocialIcon url="https://facebook.com"/></a></li>
						<li className="list-inline-item"><a href="https://mail.google.com/"><SocialIcon url="https://mail.google.com/" /></a></li>
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

