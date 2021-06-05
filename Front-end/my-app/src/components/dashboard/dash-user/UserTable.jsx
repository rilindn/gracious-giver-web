import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'
import { Search } from '../DataTable/Search';
import Pagination from '../DataTable/Pagination';






const UserTable = () => {
    
    const[users, setUsers]= useState([]);
    const[allUsers, setAllUsers] = useState([]);
    const[editUserModal, setEditUserModal] = useState(false);
    const[deleteUserModal, setDeleteUserModal] = useState(false);
    const[userV, setUserV] = useState ([]);
    const[userD, setUserD] =useState();
    const[search, setSearch] = useState("");
    const[maxUserShow, setMaxUserShow] = useState(1);

    useEffect(()=>{
        getAmofUsers(maxUserShow);
        getAllUsers();
    },[]);

    const getAmofUsers = async (maxUserShow) =>{
        try{
          await axios.get("http://localhost:5000/api/DM_User/amount/" + maxUserShow)
          .then(res=>{
              setUsers(res.data)
          })  
        }
        catch(e){
            console.log(e);
        }
    }

    const getAllUsers = async () => {
        try{
             await axios.get(`http://localhost:5000/api/DM_User`)
            .then(res=>{
                console.log(res.data)
                setAllUsers(res.data)
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const changeAm = () =>{
        if(maxUserShow==='All'){
            setUsers(allUsers)
        }
        else
        getAmofUsers(maxUserShow);
    }

    const userData = useMemo( ()=>{
        let computedUsers = users;

        if(search){
            computedUsers = computedUsers.filter(
                user => 
                    user.UserName.toLowerCase().includes(search.toLowerCase()) ||
                    user.UserState.toLowerCase().includes(search.toLowerCase()) ||
                    user.UserCity.toLowerCase().includes(search.toLowerCase()) ||
                    user.UserGender.toLowerCase().includes(search.toLowerCase())
            )
        }
        return computedUsers
    },[users, search])

    return(
        <div>
            <Container className = "container-x1">
                <Table className = "table-responsive">
                    <div className = "table-wrapper">
                        <div className = "table-title">
                            <Row className = "row">
                                <Col className = "col-sm-4">
                                    <h2><b>Users</b></h2>
                                </Col>
                                <Col className ="col-sm-7 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {userData.length} of {allUsers.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfUsers"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>{setMaxUserShow(e.target.value)}}
                                    value={maxUserShow}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="All">All</option>
                                 </Form.Control>
                                 <Button
                                    variant="info"
                                    onClick={changeAm}
                                    className="ml-1"
                                    style={{height:"37px"}}
                                    >
                                    Set entries
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nr.</th>
                                <th>UserName</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Postcode</th>
                                <th>Email</th>
                                <th>DateOfBirth</th>
                                <th>Gender</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user,i) =>(
                                <tr>
                                    <td>#{++i}</td>
                                    <td>{user.UserName}</td>
                                    <td>{user.UserState}</td>
                                    <td>{user.UserCity}</td>
                                    <td>{user.UserPostcode}</td>
                                    <td>{user.UserEmail}</td>
                                    <td>{user.UserDbo}</td>
                                    <td>{user.UserGender}</td>
                                    <td>{user.UserRole}</td>
                                    <td>
                                    <Button 
                                    onClick={() => {
                                        setEditUserModal(true);
                                        setUserV(user)
                                    }}
                                    className="m-2" 
                                    variant ="warning"
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    <Button 
                                     onClick={() => {
                                        setDeleteUserModal(true);
                                        setUserD(user.userId)
                                    }} 
                                     className="delete" 
                                     variant ="danger"
                                     data-toggle="modal"
                                     ><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                 </div>
            </Table>
        </Container>
        <EditUser
        show = {editUserModal}
        onHide = {()=>setEditUserModal(false)}
        user = {userV}
        />
        <DeleteUser
        show = {deleteUserModal}
        onHide = {()=>setDeleteUserModal(false)}
        userId = {userD}
        />
     </div>
    )

}

export default UserTable