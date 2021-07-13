import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import DeleteParticipant from './DeleteDonation'
import { Search } from '../dashboard/DataTable/Search'
import { Spinner } from 'react-bootstrap';
import EventMember from './Donation'
import Donation from './Donation'

const InitiativeDonators = ({InitiativeId}) => {
  const [donators, setDonators] = useState([])
  const [allDonators, setAllDonators] = useState([])
  const [deleteUserModal, setDeleteUserModal] = useState(false)
  const [donationD, setDonationD] = useState([])
  const [search, setSearch] = useState('')
  const [maxDonatorshow, setMaxDonatorshow] = useState(10)
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    getAmofDonators(maxDonatorshow)
    getAllDonators()
    setLoading(true);
  }, [maxDonatorshow,deleteUserModal])


  const getAmofDonators = async (maxDonatorshow) => {
    try {
      await axios
        .get('http://localhost:5000/api/Donation/amount/' + maxDonatorshow +"/" + InitiativeId)
        .then((res) => {
          setDonators(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const getAllDonators = async () => {
    try {
      await axios.get(`http://localhost:5000/api/Donation/initiative/` + InitiativeId)
      .then((res) => {
        setAllDonators(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const userData = useMemo(() => {
    let computedDonators = donators

    if (search) {
      setDonators(allDonators)
      computedDonators = computedDonators.filter((user) =>
        user.UserName.toLowerCase().includes(search.toLowerCase()),
      )
    }
    return computedDonators
  }, [donators, search, allDonators])

  return (
    <div>
      <Container className="container-x1">
        <Table className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <Row className="row">
                <Col className="col-sm-4">
                  <h2>
                    <b>Donators</b>
                  </h2>
                </Col>
                <Col className="col-sm-7 d-flex justify-content-end">
                  <span className="showing-res-txt">
                    Showing {userData.length} out of {allDonators.length} entries
                  </span>
                  <Search
                    onSearch={(value) => {
                      setSearch(value)
                    }}
                    style={{ float: 'right', width: '200px' }}
                  />
                  <Form.Control
                    name="ShowAmOfDonators"
                    as="select"
                    custom
                    style={{ width: '80px', marginLeft: '3px' }}
                    onChange={(e) => {
                      e.target.value === 'All'
                        ? setMaxDonatorshow(allDonators.length)
                        : setMaxDonatorshow(e.target.value)
                    }}
                    value={maxDonatorshow}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="All">All</option>
                  </Form.Control>
                </Col>
              </Row>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nr.</th>
                  <th>EventId</th>
                  <th>Fullname</th>
                  <th>Username</th>
                  <th>UserRole</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
            {loading?
              <tbody>
                {userData.map((donation, i) => (
                  <Donation
                  donation={donation}
                  onDelete={() => {
                      setDeleteUserModal(true)
                      setDonationD(donation)
                  }}
                  i={i}
                  />
                ))}
              </tbody>
              
      :<Spinner animation="border" className="m-5"/>}
            </Table>
          </div>
        </Table>
      </Container>
      <DeleteParticipant
        show={deleteUserModal}
        onHide={() => setDeleteUserModal(false)}
        onUpdate={()=>{
          getAllDonators();
          setDeleteUserModal(false)
          getAmofDonators(maxDonatorshow);
        }}
        initiative={donationD}
      />
    </div>
  )
}

export default InitiativeDonators
