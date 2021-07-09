import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import EditInitiatives from './EditInitiatives'
import DeleteInitiatives from './DeleteInitiatives'
import { Search } from '../DataTable/Search';


const InitiativesTable = () => { 
 
    const [initiatives, setInitiatives] = useState([]);
    const[allInitiatives, setAllInitiatives] = useState([]);
   const [editInitiativeModal,setEditInitiativeModal] = useState(false);
   const [deleteInitiativeModal,setDeleteInitiativeModal] = useState(false);
    const [initiativeV, setInitiativeV] = useState([]);
   const [initiativeD, setInitiativeD] = useState();
    const[search, setSearch] = useState("");
    const[maxInitiativeShow, setMaxInitiativeShow] = useState(10);



        useEffect(()=>{
            getAmOfInitiatives(maxInitiativeShow);
            getAllInitiatives(); 
        },[maxInitiativeShow,editInitiativeModal,deleteInitiativeModal]);

        
    const getAmOfInitiatives = async (maxInitiativeShow) =>{
        try{
          await axios.get("http://localhost:5000/api/Iniciative/amount/" + maxInitiativeShow)
          .then(res=>{
            setInitiatives(res.data)
          })  
        }
        catch(e){
            console.log(e);
        }
    }

        const getAllInitiatives = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/Iniciative`)
            .then(res=>{
                console.log(res.data)
                setAllInitiatives(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }
    
        const initiativeData = useMemo( ()=>{
            let computedInitiatives = initiatives;
    
            if(search){
                computedInitiatives = computedInitiatives.filter(
                    initiativess => 
                    initiativess.IniciativeName.toLowerCase().includes(search.toLowerCase()) 
                        
                )
            }
            return computedInitiatives
        },[initiatives, search])
    


    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>Initiatives</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {initiativeData.length} of {allInitiatives.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfInitiatives"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setMaxInitiativeShow(allInitiatives.length):setMaxInitiativeShow(e.target.value);
                                        }
                                    }
                                    value={maxInitiativeShow}
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
                                <th>Initiatives Name</th>
                                <th>Initiatives Description</th>
                                <th>Initiatives Date</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {initiatives.map((initiativess,i)=>(
                                <tr>
                                <td>#{++i}</td>
                                <td>{initiativess.IniciativeName}</td>
                                <td>{initiativess.IniciativeDescription}</td>
                                <td>{initiativess.IniciativeDate.substring(0,10)}</td>
                               


                                <td >
                                    <Button 
                                    onClick={() => {setEditInitiativeModal(true)
                                        setInitiativeV(initiativess)
                                    }
                                    } 
                                    className="m-2" 
                                    variant="warning"
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                onClick={() => {
                                    setDeleteInitiativeModal(true);
                                        setInitiativeD(initiativess.IniciativeId)
                                        }
                                    } 
                                     className="delete" 
                                     variant="danger"
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
        <EditInitiatives
         show={editInitiativeModal}
         onHide={() => setEditInitiativeModal(false)}
         onUpdate={()=>{
            getAllInitiatives();
            setEditInitiativeModal(false)
            getAmOfInitiatives(maxInitiativeShow);
        } }
         inc={initiativeV}
         />

    <DeleteInitiatives
        show={deleteInitiativeModal}
        onHide={() => setDeleteInitiativeModal(false)}
        onUpdate={()=>{
            getAllInitiatives();
            setDeleteInitiativeModal(false)
            getAmOfInitiatives(maxInitiativeShow);
        } } 
        IniciativeId={initiativeD}
        />
    </div>
    )
}

export default InitiativesTable