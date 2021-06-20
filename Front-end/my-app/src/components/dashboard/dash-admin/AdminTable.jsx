import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import EditAdmin from './EditAdmin'
import DeleteAdmin from './DeleteAdmin'
import { Search } from '../DataTable/Search'

const AdminTable = () => {
  const [Admins, setAdmins] = useState([])
  const [allAdmins, setAllAdmins] = useState([])
  const [editAdminModal, setEditAdminModal] = useState(false)
  const [deleteAdminModal, setDeleteAdminModal] = useState(false)
  const [AdminV, setAdminV] = useState([])
  const [AdminD, setAdminD] = useState()
  const [search, setSearch] = useState('')
  const [maxAdminshow, setMaxAdminshow] = useState(10)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    getAmofAdmins(maxAdminshow)
    getAllAdmins()
  }, [maxAdminshow,editAdminModal,deleteAdminModal, updated])


  const getAmofAdmins = async (maxAdminshow) => {
    try {
      await axios
        .get('http://localhost:5000/api/Admin/amount/' + maxAdminshow)
        .then((res) => {
          setAdmins(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const getAllAdmins = async () => {
    try {
      await axios.get(`http://localhost:5000/api/user/role/admin`).then((res) => {
        setAllAdmins(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const AdminData = useMemo(() => {
    let computedAdmins = Admins

    if (search) {
      setAdmins(allAdmins)
      computedAdmins = computedAdmins.filter((Admin) =>
        Admin.AdminName.toLowerCase().includes(search.toLowerCase()),
      )
    }
    return computedAdmins
  }, [Admins, search, allAdmins])

  return (
    <div>
      <Container className="container-x1">
        <Table className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <Row className="row">
                <Col className="col-sm-4">
                  <h2>
                    <b>Admins</b>
                  </h2>
                </Col>
                <Col className="col-sm-7 d-flex justify-content-end">
                  <span className="showing-res-txt">
                    Showing {AdminData.length} out of {allAdmins.length} entries
                  </span>
                  <Search
                    onSearch={(value) => {
                      setSearch(value)
                    }}
                    style={{ float: 'right', width: '200px' }}
                  />
                  <Form.Control
                    name="ShowAmOfAdmins"
                    as="select"
                    custom
                    style={{ width: '80px', marginLeft: '3px' }}
                    onChange={(e) => {
                      e.target.value === 'All'
                        ? setMaxAdminshow(allAdmins.length)
                        : setMaxAdminshow(e.target.value)
                    }}
                    value={maxAdminshow}
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
                  <th>AdminName</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Postcode</th>
                  <th>Email</th>
                  <th>DateOfBirth</th>
                  <th>Gender</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {AdminData.map((Admin, i) => (
                  <tr key={Admin.AdminId}>
                    <td>#{++i}</td>
                    <td>{Admin.AdminName}</td>
                    <td>{Admin.Adminstate}</td>
                    <td>{Admin.AdminCity}</td>
                    <td>{Admin.AdminPostcode}</td>
                    <td>{Admin.AdminEmail}</td>
                    <td>{Admin.AdminDbo.substring(0, 10)}</td>
                    <td>{Admin.AdminGender}</td>
                    <td>{Admin.AdminRole}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setEditAdminModal(true)
                          setAdminV(Admin)
                        }}
                        className="m-2"
                        variant="warning"
                        data-toggle="modal"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                        >
                          &#xE254;
                        </i>
                      </Button>
                      <Button
                        onClick={() => {
                          setDeleteAdminModal(true)
                          setAdminD(Admin.AdminId)
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
            </Table>
          </div>
        </Table>
      </Container>
      <EditAdmin
        show={editAdminModal}
        onHide={() => {
            setEditAdminModal(false)
            setUpdated(!updated)
        }}
        Admin={AdminV}
      />
      <DeleteAdmin
        show={deleteAdminModal}
        onHide={() => setDeleteAdminModal(false)}
        AdminId={AdminD}
      />
    </div>
  )
}

export default AdminTable
