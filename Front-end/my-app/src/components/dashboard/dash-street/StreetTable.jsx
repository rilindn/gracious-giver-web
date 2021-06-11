import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import AddStreet from '../dash-street/AddStreet'
import EditStreet from './EditStreet'
import DeleteStreet from './DeleteStreet'
import { Search } from '../DataTable/Search';


const StreetTable = () => { 
 
    const [streets, setStreets] = useState([]);
    const[allStreets, setAllStreets] = useState([]);
    const [addStreetModal,setAddStreetModal] = useState(false);
    const [editStreetModal,setEditStreetModal] = useState(false);
    const [deleteStreetModal,setDeleteStreetModal] = useState(false);
    const [streetV, setStreetV] = useState([]);
    const [streetD, setStreetD] = useState();
    const[search, setSearch] = useState("");
    const[maxStreetShow, setMaxStreetShow] = useState(1);


        useEffect(()=>{
            getAmOfStreets(maxStreetShow);
            getAllStreets(); 
        },[maxStreetShow]);

        
    const getAmOfStreets = async (maxStreetShow) =>{
        try{
          await axios.get("http://localhost:5000/api/Street/amount/" + maxStreetShow)
          .then(res=>{
            setStreets(res.data)
          })  
        }
        catch(e){
            console.log(e);
        }
    }

        const getAllStreets = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/Street`)
            .then(res=>{
                console.log(res.data)
                setAllStreets(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }
    
        const streetData = useMemo( ()=>{
            let computedStreets = streets;
    
            if(search){
                computedStreets = computedStreets.filter(
                    street => 
                        street.StreetName.toLowerCase().includes(search.toLowerCase()) 
                        
                )
            }
            return computedStreets
        },[streets, search])
    


    return (
        <div>
        <Container class="container-xl">
            <Table class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <Row class="row">
                            <Col class="col-sm-6">
                                <h2><b>Streets</b></h2>
                            </Col>
                            <Col className ="col-sm-7 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {streetData.length} of {allStreets.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfStreet"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setMaxStreetShow(allStreets.length):setMaxStreetShow(e.target.value);
                                        }
                                    }
                                    value={maxStreetShow}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="All">All</option>
                                 </Form.Control>
                            </Col>
                            <Col class="col-sm-6">
                          
                                <Button 
                                onClick={() => setAddStreetModal(true)} 
                                class="btn btn-success" 
                                variant ="success"
                                data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Street</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Street Id</th>
                                <th>Street Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {streets.map(street=>(
                                <tr>
                                <td>{street.StreetId }</td>
                                <td>{street.StreetName}</td>
                                <td >
                                    <Button 
                                    onClick={() => {setEditStreetModal(true)
                                        setStreetV(street)
                                    }
                                    } 
                                    className="m-2" 
                                    variant="warning"
                                    data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                onClick={() => {
                                    setDeleteStreetModal(true);
                                        setStreetD(street.StreetId)
                                        }
                                    } 
                                     class="delete" 
                                     variant="danger"
                                     data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                     </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    
                </div>
            </Table>  

        </Container>
        <EditStreet
         show={editStreetModal}
         onHide={() => setEditStreetModal(false)}
         street={streetV}
         />
        <AddStreet
        show={addStreetModal}
        onHide={() => setAddStreetModal(false)}
        />

        <DeleteStreet
        show={deleteStreetModal}
        onHide={() => setDeleteStreetModal(false)} 
        streetId={streetD}
        />
    </div>
    )
}

export default StreetTable