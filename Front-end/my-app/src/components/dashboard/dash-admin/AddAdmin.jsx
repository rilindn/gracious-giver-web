import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, FormGroup, Modal, FormLabel, FormControl } from 'react-bootstrap'
import { MDBInput } from 'mdb-react-ui-kit'
import { NotificationManager } from 'react-notifications'

const AddAdmin = ({ show, onHide, onUpdate }) => {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
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
      .post('http://localhost:5000/api/register', {
        Firstname: event.target.Firstname.value,
        Lastname: event.target.Lastname.value,
        UserName: event.target.AdminName.value,
        UserPassword: event.target.AdminPassword.value,
        UserConfirmPassword: event.target.confirmPassword.value,
        UserState: event.target.state.value,
        UserCity: event.target.city.value,
        UserPostCode: event.target.postcode.value,
        UserRole: 'Admin',
        UserEmail: event.target.AdminEmail.value,
        UserConfirmEmail: event.target.confirmEmail.value,
        UserGender: event.target.maleFemale.value,
        UserDbo: event.target.birth.value,
      })
      .then(() => {
        onUpdate()
      })
      .then(
        (res) => {
          NotificationManager.success('New admin has been added!', '', 2000)
        },
        (error) => {
          NotificationManager.error(
            'Error while adding new admin!' + { error },
            '',
            1000,
          )
        },
      )
  }
  return (
    <div>
      <Modal show={show} className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content" style={{ width: '360px' }}>
            <Form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h3 className="modal-title">Add Admin</h3>
              </div>
              <div className="modal-body">
                <FormGroup className="form-group">
                  <label>Firstname</label>
                  <input
                    type="text"
                    name="Firstname"
                    className="form-control"
                    required
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <label>Lastname</label>
                  <input
                    type="text"
                    name="Lastname"
                    className="form-control"
                    required
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="AdminName"
                    className="form-control"
                    required
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="AdminPassword"
                    className="form-control"
                    required
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>State</label>
                  <select
                    as="select"
                    name="state"
                    className="form-control"
                    custom
                  >
                    {states.map((state) => (
                      <option>{state.Emri}</option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>City</label>
                  <select
                    as="select"
                    name="city"
                    className="form-control"
                    custom
                  >
                    {cities.map((city) => (
                      <option>{city.CityName}</option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Postcode</label>
                  <input
                    type="number"
                    name="postcode"
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="AdminEmail"
                    className="form-control"
                    required
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <label>Confirm Email</label>
                  <input
                    type="email"
                    name="confirmEmail"
                    className="form-control"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Gender</label>

                  <div className="d-flex justify-content-start">
                    <div className="form-check form-check-inline text-left ">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio1"
                        value="F"
                        name="maleFemale"
                      />

                      <label className="form-check-label" for="inlineRadio1">
                        Female
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        value="M"
                        name="maleFemale"
                      />

                      <label className="form-check-label" for="inlineRadio2">
                        Male
                      </label>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <label>Date of birth</label>

                  <input
                    className="form-control"
                    type="date"
                    required
                    placeholder="Date of birth"
                    name="birth"
                  ></input>
                </FormGroup>
              </div>
              <Modal.Footer className="modal-footer">
                <input
                  onClick={onHide}
                  type="button"
                  className="btn btn-info"
                  data-dismiss="Modal"
                  value="Cancel"
                />
                <input type="submit" className="btn btn-success" value="Add" />
              </Modal.Footer>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AddAdmin
