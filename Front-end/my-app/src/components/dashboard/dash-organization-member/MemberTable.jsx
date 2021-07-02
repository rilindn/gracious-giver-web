import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import DeleteMember from './DeleteMember'
import { Search } from '../DataTable/Search'
import { Spinner } from 'react-bootstrap';

const MemberTable = () => {
  const [members, setMembers] = useState([])
  const [allMembers, setAllMembers] = useState([])
  const [deleteUserModal, setDeleteUserModal] = useState(false)
  const [userV, setUserV] = useState([])
  const [userD, setUserD] = useState()
  const [search, setSearch] = useState('')
  const [maxMembershow, setMaxMembershow] = useState(10)
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    getAmofMembers(maxMembershow)
    getAllMembers()
    setLoading(true);
  }, [maxMembershow,deleteUserModal])


  const getAmofMembers = async (maxMembershow) => {
    try {
      await axios
        .get('http://localhost:5000/api/organizationmember/amount/' + maxMembershow)
        .then((res) => {
          setMembers(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const getAllMembers = async () => {
    try {
      await axios.get(`http://localhost:5000/api/organizationmember/all`).then((res) => {
        setAllMembers(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const userData = useMemo(() => {
    let computedMembers = members

    if (search) {
      setMembers(allMembers)
      computedMembers = computedMembers.filter((user) =>
        user.UserName.toLowerCase().includes(search.toLowerCase()),
      )
    }
    return computedMembers
  }, [members, search, allMembers])

  return (
    <div>
      <Container className="container-x1">
        <Table className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <Row className="row">
                <Col className="col-sm-4">
                  <h2>
                    <b>Members</b>
                  </h2>
                </Col>
                <Col className="col-sm-7 d-flex justify-content-end">
                  <span className="showing-res-txt">
                    Showing {userData.length} out of {allMembers.length} entries
                  </span>
                  <Search
                    onSearch={(value) => {
                      setSearch(value)
                    }}
                    style={{ float: 'right', width: '200px' }}
                  />
                  <Form.Control
                    name="ShowAmOfMembers"
                    as="select"
                    custom
                    style={{ width: '80px', marginLeft: '3px' }}
                    onChange={(e) => {
                      e.target.value === 'All'
                        ? setMaxMembershow(allMembers.length)
                        : setMaxMembershow(e.target.value)
                    }}
                    value={maxMembershow}
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
                  <th>OrganizationId</th>
                  <th>UserId</th>
                  <th>DateOfJoining</th>
                  <th>Actions</th>
                </tr>
              </thead>
            {loading?
              <tbody>
                {userData.map((user, i) => (
                  <tr key={user.UserId}>
                    <td>#{++i}</td>
                    <td>{user.OrganizationId}</td>
                    <td>{user.UserId}</td>
                    <td>{user.DateOfJoining}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setDeleteUserModal(true)
                          setUserD(user.UserId)
                        }}
                        className="delete"
                        variant="danger"
                        data-toggle="modal"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                        >
                          &#xE872;
                        </i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
      :<Spinner animation="border" className="m-5"/>}
            </Table>
          </div>
        </Table>
      </Container>
      <DeleteMember
        show={deleteUserModal}
        onHide={() => setDeleteUserModal(false)}
        onUpdate={()=>{
          getAllMembers();
          setDeleteUserModal(false)
          getAmofMembers(maxMembershow);
        }}
        userId={userD}
      />
    </div>
  )
}

export default MemberTable
