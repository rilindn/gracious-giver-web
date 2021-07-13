import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import {  Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Search } from '../DataTable/Search'
import { Spinner } from 'react-bootstrap';
import InitiativeRequest from './InitiativeRequest';

const OrgInitiativeRequestTable = () => {
  const [requests, setRequests] = useState([])
  const [allRequests, setAllRequests] = useState([])
  const [search, setSearch] = useState('')
  const [maxRequestshow, setMaxRequestshow] = useState(10)
  const [loading,setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState([])

  useEffect(() => {
    (async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
            getAmofRequests(maxRequestshow,res.data.OrganizationId)
            getAllRequests(res.data.OrganizationId)
            setLoading(true);
          })
      })()
  }, [maxRequestshow])


  const getAmofRequests = async (maxRequestshow,orgId) => {
    try {
      await axios
        .get('http://localhost:5000/api/InitiativeRequest/amount/' + maxRequestshow+"/"+orgId)
        .then((res) => {
          setRequests(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const getAllRequests = async (orgId) => {
    try {
      await axios.get(`http://localhost:5000/api/InitiativeRequest/`+orgId)
      .then((res) => {
        setAllRequests(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const requestData = useMemo(() => {
    let computedRequests = requests

    if (search) {
      setRequests(allRequests)
      computedRequests = computedRequests.filter((user) =>
        user.UserId.toLowerCase().includes(search.toLowerCase()),
      )
    }
    return computedRequests
  }, [requests, search, allRequests])

  return (
    <div>
      <Container className="container-x1">
        <Table className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <Row className="row">
                <Col className="col-sm-4">
                  <h2>
                    <b>Requests</b>
                  </h2>
                </Col>
                <Col className="col-sm-7 d-flex justify-content-end">
                  <span className="showing-res-txt">
                    Showing {requestData.length} out of {allRequests.length} entries
                  </span>
                  <Search
                    onSearch={(value) => {
                      setSearch(value)
                    }}
                    style={{ float: 'right', width: '200px' }}
                  />
                  <Form.Control
                    name="ShowAmOfRequests"
                    as="select"
                    custom
                    style={{ width: '80px', marginLeft: '3px' }}
                    onChange={(e) => {
                      e.target.value === 'All'
                        ? setMaxRequestshow(allRequests.length)
                        : setMaxRequestshow(e.target.value)
                    }}
                    value={maxRequestshow}
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
                  <th>Name</th>
                  <th>Descrition</th>
                  <th>Organization</th>
                  <th>Requester</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
            {loading?
              <tbody>
                {requestData.map((request, i) => (
                  <InitiativeRequest
                  request={request}
                  onUpdate={() => {
                    getAmofRequests(maxRequestshow)
                    getAllRequests()
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
    </div>
  )
}

export default OrgInitiativeRequestTable
