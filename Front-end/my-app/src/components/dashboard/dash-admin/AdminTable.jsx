import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import EditAdmin from './EditAdmin'
import DeleteAdmin from './DeleteAdmin'
import AddAdmin from './AddAdmin'
import { Search } from '../DataTable/Search'

const AdminTable = () => {
  const [admins, setAdmins] = useState([])
  const [allAdmins, setAllAdmins] = useState([])
  const [addAdminModal,setAddAdminModal] = useState(false);
  const [editAdminModal, setEditAdminModal] = useState(false)
  const [deleteAdminModal, setDeleteAdminModal] = useState(false)
  const [adminV, setAdminV] = useState([])
  const [adminD, setAdminD] = useState()
  const [search, setSearch] = useState('')
  const [maxAdminShow, setMaxAdminShow] = useState(10)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    getAmOfAdmins(maxAdminShow)
    getAllAdmins()
  }, [maxAdminShow,addAdminModal,editAdminModal,deleteAdminModal, updated])


  const getAmOfAdmins = async (maxAdminShow) => {
    try {
      await axios
        .get('http://localhost:5000/api/user/role/Admin/amount/' + maxAdminShow)
        .then((res) => {
          setAdmins(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const getAllAdmins = async () => {
    try {
      await axios.get(`http://localhost:5000/api/user/role/admin`).then(res => {
        setAllAdmins(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const adminData = useMemo(() => {
    let computedAdmins = admins

    if (search) {
      setAdmins(allAdmins)
      computedAdmins = computedAdmins.filter(
        admin =>
         admin.UserName.toLowerCase().includes(search.toLowerCase()),
      )
    }
    return computedAdmins
  }, [admins, search, allAdmins])

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
                    Showing {adminData.length} out of {allAdmins.length} entries
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
                        ? setMaxAdminShow(allAdmins.length)
                        : setMaxAdminShow(e.target.value);
                    }}
                    value={maxAdminShow}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="All">All</option>
                  </Form.Control>

                  <Col className="col-sm-3">
                          
                          <Button 
                          onClick={() => setAddAdminModal(true)} 
                          className="btn btn-success" 
                          variant ="success"
                          data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Admin</span>
                          </Button>					
                      </Col>
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
                {adminData.map((admin, i) => (
                  <tr key={admin.AdminId}>
                    <td>#{++i}</td>
                    <td>{admin.UserName}</td>
                    <td>{admin.UserState}</td>
                    <td>{admin.UserCity}</td>
                    <td>{admin.UserPostcode}</td>
                    <td>{admin.UserEmail}</td>
                    <td>{admin.UserDbo.substring(0, 10)}</td>
                    <td>{admin.UserGender}</td>
                    <td>{admin.UserRole}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setEditAdminModal(true)
                          setAdminV(admin)
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
                          setAdminD(admin.AdminId)
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

      <AddAdmin
        show={addAdminModal}
        onHide={() => setAddAdminModal(false)}
        onUpdate={()=>{
            getAllAdmins();
            setAddAdminModal(false)
            getAmOfAdmins(maxAdminShow);
        } }
        />
      <EditAdmin
        show={editAdminModal}
        onHide={() => setEditAdminModal(false)}
        onUpdate={()=>{
          getAllAdmins();
          setEditAdminModal(false)
          getAmOfAdmins(maxAdminShow);
        }}
        admin={adminV}
      />
      <DeleteAdmin
        show={deleteAdminModal}
        onHide={() => setDeleteAdminModal(false)}
        onUpdate={()=>{
          getAllAdmins();
          setDeleteAdminModal(false)
          getAmOfAdmins(maxAdminShow);
        }}
        adminId={adminD}
      />
    </div>
  )
}

export default AdminTable
