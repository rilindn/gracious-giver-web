import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Modal, Table } from 'react-bootstrap';
import HeaderLoginRegister from '../Header/HeaderLoginRegister'
import ProductTable from './dash-prod/ProductTable';
import CityTable from './dash-city/CityTable';
import StateTable from './dash-state/StateTable';
import StreetTable from'./dash-street/StreetTable';

// document.ready(function(){
// 	// Activate tooltip
// 	'[data-toggle="tooltip"]'.tooltip();
	
// 	// Select/Deselect checkboxes
// 	var checkbox = 'table tbody input[type="checkbox"]';
// 	"#selectAll".click(function(){
// 		if(this.checked){
// 			checkbox.each(function(){
// 				this.checked = true;                        
// 			});
// 		} else{
// 			checkbox.each(function(){
// 				this.checked = false;                        
// 			});
// 		} 
// 	});
// 	checkbox.click(function(){
// 		if(!this.checked){
// 			"#selectAll".prop("checked", false);
// 		}
// 	});
// });


const Dashboard = () => {

    

    return (
    <div>
        <ProductTable/>
        <CityTable/>
        <StateTable/>
        <StreetTable/>
    </div>
    )
}

export default Dashboard

