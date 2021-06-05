import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddAdmin from '../dash-admin/AddAdmin'
import EditAdmin from './EditAdmin'
import DeleteAdmin from './DeleteAdmin'




const AdminTable = () => { 
 
    const [admins, setAdmins] = useState([]);
    const [addAdminModal,setAddAdminModal] = useState(false);
    const [editAdminModal,setEditAdminModal] = useState(false);
    const [deleteAdminModal,setDeleteAdminModal] = useState(false);
    const [adminV, setAdminV] = useState([]);
    const [adminD, setAdminD] = useState();

        useEffect(()=>{
            getAdmins(); 
        },[]);

        const getAdmins = async () => {
            try{ 
            const data = await axios.get(`http://localhost:5000/api/GG_Admin`)
            .then(res=>{
                console.log(res.data)
                setAdmins(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

    return (
    <div>
       
       
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-6">
                                <h2 className ="h-position"><b>Admins</b></h2>
                            </Col>
                            <Col className="col-sm-6">
                                <Button 
                                onClick={() => setAddAdminModal(true)} 
                                className="btn btn-success" variant ="success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Admin</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Admin Id</th>
                                <th>Admin Name</th>
                                <th>Admin Password</th>
                                <th>Admin Email</th>
                                <th>Admin Gender</th>
                                <th>Admin Date of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(admin=>(
                                <tr>
                                <td>{admin.AdminId}</td>
                                <td>{admin.AdminName}</td>
                                <td>{admin.AdminPassword}</td>
                                <td>{admin.AdminEmail}</td>
                                <td>{admin.AdminGender}</td>
                                <td>{admin.AdminDbo}</td>
                                <td>
                                    <Button 
                                    onClick={() => 
                                        {setEditAdminModal(true);
                                            setAdminV(admin)
                                        } }
                                    className="m-2" 
                                    variant ="warning" 
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => 
                                        {setDeleteAdminModal(true);
                                            setAdminD(admin.AdminId)
                                        }} 
                                     className="delete" 
                                     variant ="danger"
                                     data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="clearfix">
                        <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                        <ul className="pagination">
                            <li className="page-item disabled"><a href="#">Previous</a></li>
                            <li className="page-item"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item active"><a href="#" className="page-link">3</a></li>
                            <li className="page-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item"><a href="#" className="page-link">Next</a></li>
                        </ul>
                    </div>             
                </div>
            </Table>  

        </Container>
        <EditAdmin
         show={editAdminModal}
         onHide={() => setEditAdminModal(false)}
         admin={adminV}
         />
        <AddAdmin
        show={addAdminModal}
        onHide={() => setAddAdminModal(false)}
        
        />

        <DeleteAdmin
        show={deleteAdminModal}
        onHide={() => setDeleteCityModal(false)} 
        adminId={adminD}
        />
    </div>
    )
}

export default CityTable