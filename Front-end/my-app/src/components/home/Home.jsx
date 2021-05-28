import React from 'react'
import { Badge, Button, ButtonGroup, Card, Col, Container, Form, Image, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Item } from 'semantic-ui-react'
import prod1 from "../../images/prod1.png"
import prod2 from "../../images/prod2.png"

const Home = () => {
    return (
        <div>
            <h3>Give away or find FREE second hand stuff</h3>
            <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-3">
                <ToggleButton className="border-right m-1" style={{width:"80px"}} value={1}>All</ToggleButton>
                <ToggleButton className="m-1" style={{width:"80px"}} value={2}>Free</ToggleButton>
                <ToggleButton className="border-right m-1" style={{width:"80px"}} value={3}>Needed</ToggleButton>
            </ToggleButtonGroup>
            <div className="d-flex justify-content-center">
                <div className="d-flex rowProd justify-content-center" >
                    <Col xs={12} md={4} sm={6} lg={4} className="prodCol" >
                        <div className="itemIcon">
                                <div className="cropDiv">
                                <Image width="100%" src={prod1} rounded></Image>
                            </div>
                            <div className="caption itemText">
                                <h5>
                                    <span className="itemTypeFree">FREE</span>
                                    xeon processor
                                </h5>
                                    Melbourne,Victoria
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} sm={6} lg={4} className="prodCol">
                    <div className="itemIcon">
                                <div className="cropDiv">
                                <Image width="100%" src={prod1} rounded></Image>
                            </div>
                            <div className="caption itemText">
                                <h5>
                                    <span className="itemTypeFree">FREE</span>
                                    xeon processor
                                </h5>
                                    Melbourne,Victoria
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} sm={6} lg={4} className="prodCol">
                    <div className="itemIcon">
                                <div className="cropDiv">
                                <Image width="100%" src={prod1} rounded></Image>
                            </div>
                            <div className="caption itemText">
                                <h5>
                                    <span className="itemTypeFree">FREE</span>
                                    xeon processor
                                </h5>
                                    Melbourne,Victoria
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        </div>
    )
}

export default Home
