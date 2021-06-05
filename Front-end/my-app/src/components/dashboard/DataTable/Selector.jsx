import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const Selector = ({onSelectMaxP}) => {

    const [maxProdShow,setMaxProdShow] = useState(1);
    
    const onInputChange = (value) => {
        setMaxProdShow(maxProdShow+10);
        onSelectMaxP(maxProdShow);
        console.log("max updated")
        console.log(maxProdShow)
    }

    return (
        <div>
            <Form>
            <Form.Control
                name="ShowAmOfProduct" 
                as="select" 
                custom
                style={{width:"80px",marginLeft:"10px"}}
                value={maxProdShow}
                onChange={(e)=>onInputChange(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="All">All</option>
            </Form.Control>
            </Form> 
        </div>
    )
}

export default Selector
