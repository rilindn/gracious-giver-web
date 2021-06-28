import React, { useEffect, useState } from 'react';
import Header from './../Header/Header';
import Sidebar from './../Sidebar/Sidebar';
import { Footer } from './../footer/Footer';
import axios from 'axios';
import { MDBRadio } from 'mdb-react-ui-kit';
import { NotificationManager } from 'react-notifications';

import { Tab } from 'semantic-ui-react';
import { Tabs } from 'react-bootstrap';

import { MDBBtn } from 'mdb-react-ui-kit';

      

     
     const EditMyUserData = () => {
        const [loggedInUser, setLoggedInUser] = useState([])
        const [states, setStates] = useState([]);
        const [cities, setCities] = useState([]);
        

        useEffect(() => {(async () => {
            await axios
              .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
              .then((res) => {
                setLoggedInUser(res.data)
              })
          })()
          getStates()
          getCities()
        }, [])

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
            event.preventDefault()
                axios.put('http://localhost:5000/api/user/'+ loggedInUser.UserId, {
                UserId: loggedInUser.UserId,
                UserName: event.target.UserName.value,
                UserPassword:loggedInUser.UserPassword,
                UserState: event.target.UserState.value,
                UserCity: event.target.UserCity.value,
                UserPostcode: loggedInUser.UserPostcode,
                UserRole: loggedInUser.UserRole,
                UserEmail: event.target.UserEmail.value,
                UserGender: loggedInUser.UserGender,
                UserDbo: loggedInUser.UserDbo
              })
              
              .then((res) => {
                    NotificationManager.success(
                    'User edited succesfully!',
                    '',
                    2000,
                )
                },
                (error) => {
                    NotificationManager.erorr(
                    'Error while editing the user!'+{error},
                    '',
                    1000,
                    )
                },
              )
        }
      
      
            return (


               <div className="main">
                   <Header/>
                <div class="container">
               <div class="row justify-content-center">
                 <div class="col-12 col-lg-10 col-xl-8 mx-auto">
                 <h2 class="h3 mb-4 page-title">Settings</h2>
            <div class="my-4">
            
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
               <Tab eventKey="MyProfile" title="Myprofile">
               <form onSubmit={handleSubmit}>
                <div class="row mt-5 align-items-center">
                    <div class="col-md-3 text-center mb-5">
                        <div class="avatar avatar-xl">
                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="..." class="avatar-img rounded-circle" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="row align-items-center">
                            <div class="col-md-7">
                                <h4 class="mb-1">Brown, Asher</h4>
                                <p class="small mb-3"><span class="badge badge-dark">New York, USA</span></p>
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-md-7">
                                <p defaultValue={loggedInUser.UserRole} class="text-muted">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus. In hac habitasse platea dictumst. Cras urna quam, malesuada vitae risus at,
                                    pretium blandit sapien.
                                </p>
                            </div>
                            <div class="col">
                                <p class="small mb-0 text-muted" defaultValue={loggedInUser.UserName}>Nec Urna Suscipit Ltd</p>
                                <p class="small mb-0 text-muted">P.O. Box 464, 5975 Eget Avenue</p>
                                <p class="small mb-0 text-muted">(537) 315-1481</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-4" />
                <div class="form-group">
                    <label for="Username"> Username</label>
                    <input  name="UserName" defaultValue={loggedInUser.UserName} type="text" class="form-control" id="Username" placeholder="Username" />
                </div>
              
                <div class="form-group">
                    <label for="inputEmail4">Email</label>
                    <input  name="UserEmail" defaultValue={loggedInUser.UserEmail} type="email" class="form-control" id="inputEmail4" placeholder="brown@asher.me" />
                </div>
                <div class="form-group">
                    <label for="">DateOfBirth</label>
                    <input  name="UserDbo" value={loggedInUser.UserDbo} type="date" class="form-control" id="inputAddress5" placeholder="" />
                </div>
             
                
   
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="">State</label>
                        <select name="UserState"  defaultValue={loggedInUser.UserState} id="State" class="form-control">
                        {states.map(state=>(
                          <option >{state.Emri}</option>
                     ))}
                         
                        </select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="">City</label>
                        <select  name="UserCity" id="City" class="form-control">
                        {cities.map(city=>(
                
                <option>{city.CityName}</option>
                ))}
                        </select>
                    </div>
                    
                    <div class="form-group col-md-2">
                        <label for="inputZip5">Zip</label>
                        <input  name="UserPostcode" defaultValue={loggedInUser.UserPostcode} type="text" class="form-control" id="inputZip5" placeholder="98232" />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="">Role</label>
                        <select name="UserRole"  defaultValue={loggedInUser.UserRole} id="Role" class="form-control">
                            <option   selected="">Choose...</option>
                            <option>Donator</option>
                            <option>Giver</option>
                        </select>
                    </div>

                   
                </div>
              
                <hr class="my-4" />
                
                <button type="submit" class="btn btn-primary">Save Change</button>
            </form>
    
                </Tab>
                <Tab eventKey="Password" title="Password">
                <form onSubmit={handleSubmit}>
                <hr class="my-4" />
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputPassword4">Old Password</label>
                            <input type="password" class="form-control" id="inputPassword5" />
                        </div>
                        <div class="form-group">
                            <label for="inputPassword5">New Password</label>
                            <input  name="UserPassword" type="password" class="form-control" id="inputPassword5" />
                        </div>
                        <div class="form-group">
                            <label for="inputPassword6">Confirm Password</label>
                            <input name="UserPassword" type="password" class="form-control" id="inputPassword6" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <p class="mb-2">Password requirements</p>
                        <p class="small text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
                        <ul class="small text-muted pl-4 mb-0">
                            <li>Minimum 8 character</li>
                            <li>At least one special character</li>
                            <li>At least one number</li>
                            <li>Can’t be the same as a previous password</li>
                        </ul>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save Change</button>
            </form>
                </Tab>
            </Tabs>
            </div>
    </div>
</div>

</div>
<Footer/>
</div>
            )
        }
        export default EditMyUserData;