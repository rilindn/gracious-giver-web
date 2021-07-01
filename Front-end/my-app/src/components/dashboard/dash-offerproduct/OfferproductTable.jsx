import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Form,  Row, Table } from 'react-bootstrap';
import EditOfferProduct from './EditOfferProduct'
import DeleteOfferProduct from './DeleteOfferProduct'
import { Search } from '../DataTable/Search';


const OfferProductTable = () => {

    const [OfferProducts, setOfferProduct] = useState([]);
    const [allOfferProduct, setAllOfferProduct]= useState([]);
    const [editOfferProductModal,setEditOfferProductModal] = useState(false);
    const [deleteOfferProductModal,setDeleteOfferProductModal] = useState(false);
    const [OfferProductV, setOfferProductV] = useState([]);
    const [OfferProductD, setOfferProductD] = useState();
    const [search,setSearch] = useState("");
    const [maxOfferProductShow, SetMaxOfferProductShow] = useState(10);

        useEffect(()=>{
            
            getAmOfOfferProduct(maxOfferProductShow);
            getAllOfferProduct();
            
        },[maxOfferProductShow,editOfferProductModal,deleteOfferProductModal]);
        

        const getAmOfOfferProduct = async (maxOfferProductShow) =>{
            try{
              await axios.get("http://localhost:5000/api/OfferProduct/amount/" + maxOfferProductShow)
              .then(res=>{
                console.log(res.data)
                  setOfferProduct(res.data)
              })  
            }
            catch(e){
                console.log(e);
            }
        }

        const getAllOfferProduct = async () => {
            try{
             await axios.get(`http://localhost:5000/api/OfferProduct`)
            .then(res=>{
                console.log(res.data)
                setAllOfferProduct(res.data)
            })
            }
            catch(e){
                console.log(e);
            }
        }

        const OfferProductData = useMemo( ()=>{
            let computedOfferProduct = OfferProducts;
    
            if(search){
                computedOfferProduct=computedOfferProduct.filter(
                    OfferProduct  =>
                    OfferProduct.Message.toLowerCase().includes(search.toLowerCase())
    
                )
            }
            return computedOfferProduct
    
        },[OfferProducts,search])

    return (
    <div>
        <Container className="container-xl">
            <Table className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <Row className="row">
                            <Col className="col-sm-3">
                                <h2><b>OfferProductData</b></h2>
                            </Col>
                            <Col className ="col-sm-6 d-flex justify-content-end">
                                 <span className="showing-res-txt">Showing {OfferProductData.length} of {allOfferProduct.length} entries</span>
                                 <Search
                                    onSearch={(value)=>{
                                        setSearch(value);
                                    }}
                                    style ={{float:"right", width:"200px"}}
                                 />
                                 <Form.Control
                                    name = "ShowAmOfOfferProductData"
                                    as="select" 
                                    custom
                                    style={{width:"80px",marginLeft:"3px"}}
                                    onChange={e=>
                                        {
                                            e.target.value==='All'?SetMaxOfferProductShow(allOfferProduct.length):SetMaxOfferProductShow(e.target.value);
                                        }
                                    }
                                    value={maxOfferProductShow}
                                    >
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value='All'>All</option>
                                 </Form.Control>
                            </Col>
                        
                        </Row>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>OfferProduct Id</th>
                                <th>ProductProvider Id</th>
                                <th>Receiver Id</th>
                                <th>Message</th>
                                <th>OfferDate</th>
                                <th>Check Offer</th>
                            </tr>
                        </thead>
                        <tbody>
                            { OfferProductData.map( OfferProduct=>(
                                <tr>
                                <td>{ OfferProduct.OfferProductId}</td>
                                <td>{ OfferProduct.ProductProviderId}</td>
                                <td>{ OfferProduct.ReceiverId}</td>
                                <td>{ OfferProduct.Message}</td>
                                <td>{ OfferProduct.OfferDate}</td>
                                <td>{ OfferProduct.CheckOffer}</td>
                                <td>
                                    <Button 
                                    onClick={() => {
                                        setEditOfferProductModal(true);
                                        setOfferProductV(OfferProduct)
                                    }}
                                    className="m-2" 
                                    variant ="warning"
                                    data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </Button>
                                    <Button 
                                     onClick={() => {
                                        setDeleteOfferProductModal(true);
                                        setOfferProductD(OfferProduct.OfferProductId)
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
        
       
        <EditOfferProduct
        show={editOfferProductModal}
        onHide={() => setEditOfferProductModal(false)}
        onUpdate={()=>{
            getAllOfferProduct();
            setEditOfferProductModal(false)
            getAmOfOfferProduct(maxOfferProductShow);
        } }
        OfferProduct={OfferProductV}
        />
         <DeleteOfferProduct
        show={deleteOfferProductModal}
        onHide={() => setDeleteOfferProductModal(false)} 
        onUpdate={()=>{
            getAllOfferProduct();
            setDeleteOfferProductModal(false)
            getAmOfOfferProduct(maxOfferProductShow);
        } }
        OfferProductId={OfferProductD}
        />
    </div>
    )
}

export default OfferProductTable