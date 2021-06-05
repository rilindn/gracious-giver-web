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
    const [addCityModal,setAddCityModal] = useState(false);
    const [editCityModal,setEditCityModal] = useState(false);
    const [deleteCityModal,setDeleteCityModal] = useState(false);
    const [cityV, setCityV] = useState([]);
    const [cityD, setCityD] = useState();
    const [search,setSearch] = useState("");


        useEffect(()=>{
            getcities(); 
        },[]);

        const getcities = async () => {
            try{ 
            const data = await axios.get(`http://localhost:5000/api/city`)
            .then(res=>{
                console.log(res.data)
                setCities(res.data)
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

        const data ={}
    return (
    <div>
       
       
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-6">
                                <h2 className ="h-position"><b>Cities</b></h2>
                            </Col>
                            <Col className="col-sm-6">
                            <Search
                                  onSearch={(value)=>{
                                      setSearch(value);
                                  }}
                                />
                                <Button 
                                onClick={() => setAddCityModal(true)} 
                                className="btn btn-success" variant ="success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New City</span>
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