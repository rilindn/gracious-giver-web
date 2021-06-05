import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../../Header/HeaderLoginRegister'
import AddCity from '../dash-city/AddCity'
import EditCity from './EditCity'
import DeleteCity from './DeleteCity'
import { Search } from '../DataTable/Search';
import Pagination from '../DataTable/Pagination';



const CityTable = () => { 
 
    const [cities, setCities] = useState([]);
    const[allCities, setAllCities] = useState([]);
    const [addCityModal,setAddCityModal] = useState(false);
    const [editCityModal,setEditCityModal] = useState(false);
    const [deleteCityModal,setDeleteCityModal] = useState(false);
    const [cityV, setCityV] = useState([]);
    const [cityD, setCityD] = useState();
    const [search,setSearch] = useState("");
    const [maxCityShow, setMaxCityShow] = useState(1);


        useEffect(()=>{
            getAmOfCities(maxCityShow);
            getAllCities(); 
        },[]);
        
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

        const changeAm = () =>{
            if(maxCityShow==='All'){
                setCities(allCities)
            }
            else
            getAmOfCities(maxCityShow);
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

        const data ={}
    return (
        <div>
        <Container class="container-xl">
            <Table class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <Row class="row">
                            <Col class="col-sm-6">
                                <h2><b>Cities</b></h2>
                            </Col>
                            <Col className ="col-sm-7 d-flex justify-content-end">
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
                                    onChange={e=>{setMaxCityShow(e.target.value)}}
                                    value={maxCityShow}
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
                            <Col class="col-sm-6">
                          
                                <Button 
                                onClick={() => setAddCityModal(true)} 
                                class="btn btn-success" 
                                variant ="success"
                                data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New City</span>
                                </Button>					
                            </Col>
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>City Id</th>
                                <th>City Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cityData.map(city=>(
                                <tr>
                                <td>{city.CityId}</td>
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
        <EditCity
         show={editCityModal}
         onHide={() => setEditCityModal(false)}
         city={cityV}
         />
        <AddCity
        show={addCityModal}
        onHide={() => setAddCityModal(false)}
        
        />

        <DeleteCity
        show={deleteCityModal}
        onHide={() => setDeleteCityModal(false)} 
        cityId={cityD}
        />
    </div>
    )
}

export default CityTable