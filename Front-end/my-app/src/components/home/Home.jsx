import React from 'react'
import { Pagination, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import prod1 from "../../images/prod1.png"
import prod2 from "../../images/prod2.png"

const Home = () => {
    return (
        <div>
            <h3>Give away or find FREE second hand stuff</h3>
            <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-3">
                <ToggleButton className="border-right m-1" style={{width:"80px"}} value={1}
                >All</ToggleButton>
                <ToggleButton className="m-1" style={{width:"80px"}} value={2}>Free</ToggleButton>
                <ToggleButton className="border-right m-1" style={{width:"80px"}} value={3}>Needed</ToggleButton>
            </ToggleButtonGroup>

            <div className="productsALL">
                <div className="rowProd" >
                    <div className="prodCol">
                        <div className="home-prod">
                            <img src={prod1} width="230px" height="230px" alt=""/>
                            <div class="itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                        Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod1} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod2} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processorrrrrr
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>

                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod1} width="230px" height="230px" alt=""/>
                            <div class="itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                        Xeon processorrr
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod1} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod2} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod2} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod2} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod2} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod2} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod2} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                    <div className="prodCol" >
                        <div className="home-prod">
                            <img src={prod2} width="230px" height="230px"/>
                            <div class="caption itemText">
                                <h5 className="prodTitle">
                                    <span class="itemTypeFree">FREE
                                    </span> 
                                    Xeon processor
                                </h5>
                                <p className="prodLocation">Balaclava, Victoria</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item >{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </div>
    )
}

export default Home
