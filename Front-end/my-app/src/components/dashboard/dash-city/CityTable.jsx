import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import AddCity from '../dash-city/AddCity'
import EditCity from './EditCity'
import DeleteCity from './DeleteCity'
import { Search } from '../DataTable/Search';



const CityTable = () => { 
 
    const [cities, setCities] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [addCityModal,setAddCityModal] = useState(false);
    const [editCityModal,setEditCityModal] = useState(false);
    const [deleteCityModal,setDeleteCityModal] = useState(false);
    const [cityV, setCityV] = useState([]);
    const [cityD, setCityD] = useState();
    const [search,setSearch] = useState("");
    const [maxCityShow, setMaxCityShow] = useState(10);


        useEffect(()=>{
            getAmOfCities(maxCityShow);
            getAllCities(); 
        },[maxCityShow,addCityModal,editCityModal,deleteCityModal]);
        
        const getAmOfCities = async (maxCityShow) =>{
            try{
              await axios.get("http://localhost:5000/api/city/amount/" + maxCityShow)
              .then(res=>{
                  setCities(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllCities = async () => {
            try{ 
            await axios.get(`http://localhost:5000/api/city`)
            .then(res=>{
                console.log(res.data)
                setAllCities(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

        const cityData = useMemo ( ()=>{
            let computedCity = cities;
    
            if(search){
                computedCity=computedCity.filter(
                    cities =>
                        cities.CityName.toLowerCase().includes(search.toLowerCase())
                )
            }
            return computedCity
    
        },[cities,search])

        
    return (
        <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>Cities</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {cityData.length} of {allCities.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfCities"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?setMaxCityShow(allCities.length):setMaxCityShow(e.target.value);
                                        }
                                    }
                                    >
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="All">All</option>
                                 </Form.Control>
                            </Col>
                            <Col className="col-sm-3">
                          
                                <Button 
                                onClick={() => setAddCityModal(true)} 
                                className="btn btn-success" 
                                variant ="success"
                                data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New City</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nr.</th>
                                <th>City Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cityData.map((city,i)=>(
                                <tr>
                                <td>#{++i}</td>
                                <td>{city.CityName}</td>
                                <td>
                                    <Button 
                                    onClick={() => 
                                        {setEditCityModal(true);
                                            setCityV(city)
                                        } }
                                    className="m-2" 
                                    variant ="warning" 
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    
                                    <Button 
                                    onClick={() => 
                                        {setDeleteCityModal(true);
                                            setCityD(city.CityId)
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
        <EditCity
         show={editCityModal}
         onHide={() => setEditCityModal(false)}
         onUpdate={()=>{
            getAllCities();
            setEditCityModal(false)
            getAmOfCities(maxCityShow);
        } }
         city={cityV}
         />
        <AddCity
        show={addCityModal}
        onHide={() => setAddCityModal(false)}
        onUpdate={()=>{
            getAllCities();
            setAddCityModal(false)
            getAmOfCities(maxCityShow);
        } }
        />

        <DeleteCity
        show={deleteCityModal}
        onHide={() => setDeleteCityModal(false)} 
        onUpdate={()=>{
            getAllCities();
            setDeleteCityModal(false)
            getAmOfCities(maxCityShow);
        } }
        cityId={cityD}
        />
    </div>
    )
}

export default CityTable