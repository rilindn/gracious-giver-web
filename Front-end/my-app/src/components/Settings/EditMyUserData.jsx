import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Footer } from '../footer/Footer';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import maleUser from '../../images/maleUser.png'
import femaleUser from '../../images/femaleUser.png'

import { Tab } from 'semantic-ui-react';
import { Tabs } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const EditMyUserData = () => {

        let history = useHistory();
        const [loggedInUser, setLoggedInUser] = useState([])
        const [states, setStates] = useState([]);
        const [cities, setCities] = useState([]);
        const [selectedState,setSelectedState] = useState()
        const [selectedCity,setSelectedCity] = useState()
        const [selectedRole,setSelectedRole] = useState()
        

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
                Firstname: event.target.Firstname.value,
                Lastname: event.target.Lastname.value,
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
                    NotificationManager.error(
                    'Error while editing the user!',
                    '',
                    1000,
                    )
                },
              )
        }
          const handlePasswordSubmit = (event) => {
            event.preventDefault()
            const posReq = axios.create({
            withCredentials:true
            })
            posReq.post('http://localhost:5000/api/changepsw/',{
                UserName: loggedInUser.UserName,
                OldPassword: event.target.oldPassword.value,
                NewPassword: event.target.newPassword.value
              })
              
              .then((res) => {
                    history.push("/settings")
                    NotificationManager.success(
                    'Your password has been changed!',
                    '',
                    2000,
                )
                window.location.reload(false);
                },
                (error) => {
                    NotificationManager.error(
                    'Error while changing the password!',
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
            <div class="my-4">
            
            <Tabs defaultActiveKey="MyProfile" id="uncontrolled-tab-example">
               <Tab eventKey="MyProfile" title="My profile" >
               <form onSubmit={handleSubmit}>
                
                <hr class="my-4" />
                <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="Firstname"> Firstname</label>
                    <input  name="Firstname" defaultValue={loggedInUser.Firstname} type="text" class="form-control" id="Firstname" placeholder="Firstname" />
                </div>
              
                <div class="form-group col-md-6">
                    <label for="Lastname">Lastname</label>
                    <input  name="Lastname" defaultValue={loggedInUser.Lastname} type="text" class="form-control" id="Lastname" placeholder="Lastname" />
                </div>
                </div>
                <div class="form-row">
                <div class="form-group  col-md-6">
                    <label for="Username"> Username</label>
                    <input  name="UserName" defaultValue={loggedInUser.UserName} type="text" class="form-control" id="Username" placeholder="Username" />
                </div>
              
                <div class="form-group  col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input  name="UserEmail" defaultValue={loggedInUser.UserEmail} type="email" class="form-control" id="inputEmail4" placeholder="brown@asher.me" />
                </div>
                </div>
                
             
                
   
                <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">State</label>
                    <select
                      name="UserState"
                      id="State"
                      class="form-control"
                      value={selectedState}
                      onChange={(e)=>setSelectedState(e.target.value)}
                    >
                      {states.map((state) => (
                        <option>{state.Emri}</option>
                      ))}
                    </select>
                  </div>
                    <div class="form-group col-md-6">
                    <label for="">City</label>
                    <select name="UserCity" id="City" class="form-control" value={selectedCity}
                    onChange={(e)=>setSelectedCity(e.target.value)}
                    >
                      {cities.map((city) => (
                        <option value={city.CityName}>{city.CityName}</option>
                      ))}
                    </select>
                  </div>
                    <div class="form-group col-md-4">
                      <label for="">DateOfBirth</label>
                      <input  name="UserDbo" value={loggedInUser.UserDbo} type="date" class="form-control" id="inputAddress5" placeholder="" />
                  </div>
                    <div class="form-group col-md-2">
                        <label for="inputZip5">Zip</label>
                        <input  name="UserPostcode" defaultValue={loggedInUser.UserPostcode} type="text" class="form-control" id="inputZip5" placeholder="98232" />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="">Role</label>
                    <select
                      name="UserRole"
                      id="Role"
                      class="form-control"
                      value={selectedRole}
                      onChange={(e)=>setSelectedRole(e.target.value)}
                    >
                      <option value="Donator">Donator</option>
                      <option value="Receiver">Receiver</option>
                    </select>
                  </div>

                   
                </div>
              
                <hr class="my-4" />
                
                <button type="submit" class="btn btn-primary block">Save Change</button>
            </form>
    
                </Tab>
                <Tab eventKey="Password" title="Password" >
                <form onSubmit={handlePasswordSubmit}>
                <hr class="my-4" />
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputPassword4">Old Password</label>
                            <input type="password" class="form-control" id="inputPassword5" name="oldPassword" />
                        </div>
                        <div class="form-group">
                            <label for="inputPassword5">New Password</label>
                            <input  name="newPassword" type="password" class="form-control" id="inputPassword5" />
                        </div>
                        <div class="form-group">
                            <label for="inputPassword6">Confirm Password</label>
                            <input name="confirmNewPassword" type="password" class="form-control" id="inputPassword6" />
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