import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
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
            await axios.get(`http://localhost:5000/api/GG_Admin`)
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
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin,i)=>(
                                <tr>
                                <td>#{i}</td>
                                <td>{admin.AdminName}</td>
                                <td>{admin.AdminEmail}</td>
                                <td>{admin.AdminGender}</td>
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
        onHide={() => setDeleteAdminModal(false)} 
        adminId={adminD}
        />
    </div>
    )
}

export default AdminTable