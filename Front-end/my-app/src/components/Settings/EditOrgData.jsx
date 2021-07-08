import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Footer } from '../footer/Footer'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'

import { Tab } from 'semantic-ui-react'
import { Tabs } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const EditOrgData = () => {
  let history = useHistory()
  const [organization, setOrganization] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState()
  const [selectedCity, setSelectedCity] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    ;(async () => {
      await axios
        .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
        .then((res) => {
          setOrganization(res.data)
          setSelectedState(res.data.State)
          setSelectedCity(res.data.City)
          setSelectedCategory(res.data.Category)
        })
    })()
    getStates()
    getCities()
    getCategories()
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
  const getCategories = async () => {
    try {
      await axios
        .get('http://localhost:5000/api/OrganizationCategory')
        .then((res) => {
          console.log(res)
          setCategories(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .put(
        'http://localhost:5000/api/organization/' + organization.OrganizationId,
        {
          OrganizationId: organization.OrganizationId,
          Username: event.target.Username.value,
          Password: organization.Password,
          Name: event.target.Name.value,
          Logo: organization.Logo,
          Documentation: organization.Documentation,
          Email: event.target.Email.value,
          Category: event.target.Category.value,
          Description: event.target.Description.value,
          State: event.target.OrganizationState.value,
          City: event.target.City.value,
        },
      )

      .then(
        (res) => {
          NotificationManager.success('User edited succesfully!', '', 2000)
        },
        (error) => {
          NotificationManager.error('Error while editing the user!', '', 1000)
        },
      )
  }
  const handlePasswordSubmit = (event) => {
    event.preventDefault()
    const posReq = axios.create({
      withCredentials: true,
    })
    posReq
      .post('http://localhost:5000/api/changepsw/', {
        UserName: organization.Username,
        OldPassword: event.target.oldPassword.value,
        NewPassword: event.target.newPassword.value,
      })

      .then(
        (res) => {
          history.push('/OrgSettings')
          NotificationManager.success(
            'Your password has been changed!',
            '',
            2000,
          )
          window.location.reload(false)
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
  const defaultImg = 'prodImg.jpg'
  const imgSrc =
    'http://localhost:5000/photos/organization/' +
    (organization.Logo === '' ? defaultImg : organization.Logo)
  console.log(organization.Logo)

  return (
    <div className="main">
      <Header />
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8 mx-auto">
            <h2 class="h3 mb-4 page-title">Settings</h2>
            <div class="my-4">
              <Tabs defaultActiveKey="MyProfile" id="uncontrolled-tab-example">
                <Tab eventKey="MyProfile" title="My profile">
                  <form onSubmit={handleSubmit}>
                    <div class="row mt-5 align-items-center">
                      <div class="col-md-3 text-center mb-5">
                        <div class="avatar avatar-xl">
                          <img
                            src={imgSrc}
                            alt="..."
                            class="avatar-img rounded-circle"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="row align-items-center">
                          <div class="col-md-7">
                            <h4 class="mb-1">{organization.Name}</h4>
                            <p class="small mb-3">
                              <span class="badge badge-dark">
                                {organization.State}, {organization.City}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div class="row mb-4">
                          <div class="col-md-10">
                            <p class="text-muted">{organization.Description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr class="my-4" />
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="Name"> Name</label>
                        <input
                          name="Name"
                          defaultValue={organization.Name}
                          type="text"
                          class="form-control"
                          id="Name"
                          placeholder="Username"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="Username"> Username</label>
                        <input
                          name="Username"
                          defaultValue={organization.Username}
                          type="text"
                          class="form-control"
                          id="Username"
                          placeholder="Username"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input
                          name="Email"
                          defaultValue={organization.Email}
                          type="email"
                          class="form-control"
                          id="inputEmail4"
                          placeholder="brown@asher.me"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="">Category</label>
                        <select
                          name="Category"
                          id="State"
                          class="form-control"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          {categories.map((category) => (
                            <option value={category.OrganizationCategoryName}>
                              {category.OrganizationCategoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="">State</label>
                        <select
                          name="OrganizationState"
                          id="State"
                          class="form-control"
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                        >
                          {states.map((state) => (
                            <option value={state.Emri}>{state.Emri}</option>
                          ))}
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="">City</label>
                        <select
                          name="City"
                          id="City"
                          class="form-control"
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                        >
                          {cities.map((city) => (
                            <option value={city.CityName}>
                              {city.CityName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div class="form-group col-md-12">
                        <label for="inputEmail4">Description</label>
                        <textarea
                          name="Description"
                          defaultValue={organization.Description}
                          class="form-control"
                        />
                      </div>
                    </div>

                    <hr class="my-4" />

                    <button type="submit" class="btn btn-primary">
                      Save Change
                    </button>
                  </form>
                </Tab>
                <Tab eventKey="Password" title="Password">
                  <form onSubmit={handlePasswordSubmit}>
                    <hr class="my-4" />
                    <div class="row mb-4">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inputPassword4">Old Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="inputPassword5"
                            name="oldPassword"
                          />
                        </div>
                        <div class="form-group">
                          <label for="inputPassword5">New Password</label>
                          <input
                            name="newPassword"
                            type="password"
                            class="form-control"
                            id="inputPassword5"
                          />
                        </div>
                        <div class="form-group">
                          <label for="inputPassword6">Confirm Password</label>
                          <input
                            name="confirmNewPassword"
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
                          <li>At least one number</li>
                          <li>Can’t be the same as a previous password</li>
                        </ul>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Save Change
                    </button>
                  </form>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default EditOrgData
