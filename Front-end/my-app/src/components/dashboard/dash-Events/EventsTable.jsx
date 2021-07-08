import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import EditEvents from './EditEvents'
import DeleteEvents from './DeleteEvents'
import { Search } from '../DataTable/Search';


const EventsTable = () => { 
 
    const [events, setEvents] = useState([]);
    const[allEvents, setAllEvents] = useState([]);
    const [editEventModal,setEditEventModal] = useState(false);
    const [deleteEventModal,setDeleteEventModal] = useState(false);
    const [eventV, setEventV] = useState([]);
    const [eventD, setEventD] = useState();
    const[search, setSearch] = useState("");
    const[maxEventShow, setMaxEventShow] = useState(10);



        useEffect(()=>{
            getAmOfEvents(maxEventShow);
            getAllEvents(); 
        },[maxEventShow,editEventModal,deleteEventModal]);

        
    const getAmOfEvents = async (maxEventShow) =>{
        try{
          await axios.get("http://localhost:5000/api/Events/amount/" + maxEventShow)
          .then(res=>{
            setEvents(res.data)
          })  
        }
        catch(e){
            console.log(e);
        }
    }

        const getAllEvents = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/Events`)
            .then(res=>{
                console.log(res.data)
                setAllEvents(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }
    
        const eventData = useMemo( ()=>{
            let computedEvents = events;
    
            if(search){
                computedEvents = computedEvents.filter(
                    eventss => 
                        eventss.EventName.toLowerCase().includes(search.toLowerCase()) 
                        
                )
            }
            return computedEvents
        },[events, search])
    


    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>Events</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {eventData.length} of {allEvents.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfEvents"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setMaxEventShow(allEvents.length):setMaxEventShow(e.target.value);
                                        }
                                    }
                                    value={maxEventShow}
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
                                <th>Event Name</th>
                                <th>Event Description</th>
                                <th>Event Date</th>
                                <th>Event Time</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((eventss,i)=>(
                                <tr>
                                <td>#{++i}</td>
                                <td>{eventss.EventName}</td>
                                <td>{eventss.EventDescription}</td>
                                <td>{eventss.EventDate.substring(0,10)}</td>
                                <td>{eventss.EventDate.substring(11,20)}</td>
                                <td>{eventss.City}</td>


                                <td >
                                    <Button 
                                    onClick={() => {setEditEventModal(true)
                                        setEventV(eventss)
                                    }
                                    } 
                                    className="m-2" 
                                    variant="warning"
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                onClick={() => {
                                    setDeleteEventModal(true);
                                        setEventD(eventss.EventId)
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
        <EditEvents
         show={editEventModal}
         onHide={() => setEditEventModal(false)}
         onUpdate={()=>{
            getAllEvents();
            setEditEventModal(false)
            getAmOfEvents(maxEventShow);
        } }
         ev={eventV}
         />

        <DeleteEvents
        show={deleteEventModal}
        onHide={() => setDeleteEventModal(false)}
        onUpdate={()=>{
            getAllEvents();
            setDeleteEventModal(false)
            getAmOfEvents(maxEventShow);
        } } 
        EventId={eventD}
        />
    </div>
    )
}

export default EventsTable