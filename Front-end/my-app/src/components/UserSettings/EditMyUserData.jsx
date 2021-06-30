import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Footer } from '../footer/Footer'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'

const EditMyUserData = () => {
  const [loggedInUser, setLoggedInUser] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState,setSelectedState] = useState()
  const [selectedCity,setSelectedCity] = useState()
  const [selectedRole,setSelectedRole] = useState()

  useEffect(() => {
    ;(async () => {
      await axios
        .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
        .then((res) => {
          setLoggedInUser(res.data)
          setSelectedCity(res.data.UserCity)
          setSelectedState(res.data.UserState)
          setSelectedRole(res.data.UserRole)
        })
    })()
    getStates()
    getCities()
  }, [])

  const getStates = async () => {
    try {
      await axios.get('http://localhost:5000/api/shteti').then((res) => {
        console.log(res)
        setStates(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }
  const getCities = async () => {
    try {
      await axios.get('http://localhost:5000/api/city').then((res) => {
        console.log(res)
        setCities(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .put('http://localhost:5000/api/user/' + loggedInUser.UserId, {
        UserId: loggedInUser.UserId,
        UserName: event.target.UserName.value,
        UserPassword: loggedInUser.UserPassword,
        UserState: event.target.UserState.value,
        UserCity: event.target.UserCity.value,
        UserPostcode: loggedInUser.UserPostcode,
        UserRole: loggedInUser.UserRole,
        UserEmail: event.target.UserEmail.value,
        UserGender: loggedInUser.UserGender,
        UserDbo: loggedInUser.UserDbo,
      })

      .then(
        (res) => {
          NotificationManager.success('User edited succesfully!', '', 2000)
        },
        (error) => {
          NotificationManager.erorr(
            'Error while editing the user!' + { error },
            '',
            1000,
          )
        },
      )
  }

  return (
    <div className="main">
      <Header />
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8 mx-auto">
            <h2 class="h3 mb-4 page-title mt-3">Settings</h2>
            <div class="my-4">
              <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="false"
                  >
                    Profile
                  </a>
                </li>
              </ul>
              <form onSubmit={handleSubmit}>
                <div class="row mt-5 align-items-center">
                  <div class="col-md-3 text-center mb-5">
                    <div class="avatar avatar-xl">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        alt="..."
                        class="avatar-img rounded-circle"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="row align-items-center">
                      <div class="col-md-7">
                        <h4 class="mb-1">{loggedInUser.UserName}</h4>
                        <p class="small mb-3">
                          <span class="badge badge-dark">{loggedInUser.UserCity}, {loggedInUser.UserState}</span>
                        </p>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-7">
                        <p
                          defaultValue={loggedInUser.UserRole}
                          class="text-muted"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Mauris blandit nisl ullamcorper, rutrum metus
                          in, congue lectus. In hac habitasse platea dictumst.
                          Cras urna quam, malesuada vitae risus at, pretium
                          blandit sapien.
                        </p>
                      </div>
                      <div class="col">
                        <p class="small mb-0 text-muted">
                          Nec Urna Suscipit Ltd
                        </p>
                        <p class="small mb-0 text-muted">
                          P.O. Box 464, 5975 Eget Avenue
                        </p>
                        <p class="small mb-0 text-muted">(537) 315-1481</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="Username"> Username</label>
                    <input
                      name="UserName"
                      defaultValue={loggedInUser.UserName}
                      type="text"
                      class="form-control"
                      id="Username"
                      placeholder="Username"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input
                      name="UserEmail"
                      defaultValue={loggedInUser.UserEmail}
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="brown@asher.me"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="">Date Of Birth</label>
                  <input
                    name="UserDbo"
                    value={loggedInUser.UserDbo}
                    type="date"
                    class="form-control"
                    id="inputAddress5"
                    placeholder=""
                  />
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

                  <div class="form-group col-md-6">
                    <label for="inputZip5">Zip</label>
                    <input
                      name="UserPostcode"
                      defaultValue={loggedInUser.UserPostcode}
                      type="text"
                      class="form-control"
                      id="inputZip5"
                      placeholder="98232"
                    />
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
                <div class="row mb-4">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="inputPassword4">Old Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="inputPassword5"
                      />
                    </div>
                    <div class="form-group">
                      <label for="inputPassword5">New Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="inputPassword5"
                      />
                    </div>
                    <div class="form-group">
                      <label for="inputPassword6">Confirm Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="inputPassword6"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <p class="mb-2">Password requirements</p>
                    <p class="small text-muted mb-2">
                      To create a new password, you have to meet all of the
                      following requirements:
                    </p>
                    <ul class="small text-muted pl-4 mb-0">
                      <li>Minimum 8 character</li>
                      <li>At least one special character</li>
                      <li>At least one number</li>
                      <li>Can’t be the same as a previous password</li>
                    </ul>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">
                  Save Change
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default EditMyUserData