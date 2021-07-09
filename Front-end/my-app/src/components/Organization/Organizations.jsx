import React, { useState } from 'react'
import { MDBRow} from 'mdb-react-ui-kit'
import Footer from '../footer/Footer'
import Header from './../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import { useEffect } from 'react'
import OrganizationCard from './OrganizationCard'
const Organizations = () => {

  const [organizations,setOrganizations] = useState([]);
  
  useEffect(()=>{
    getOrganizations();
  },[])
  
  const getOrganizations = () =>{
    try{
    axios.get('http://localhost:5000/api/organization')
    .then((res)=>{
      console.log(res.data)
      setOrganizations(res.data)
    })
  }
  catch(e){
    console.log(e)
  }
  }

  return (
    <div className="bodyorganizations">
      <div>
        <Sidebar />
        <Header />
      </div>
      <div>
        <div className="p-5 text-left bg-light org-heading mt-4" id="ORGheaderimage">
          <h1 className="mb-3">Our organizations</h1>
          <h5 className="mb-3">
            We have incorporated organizations in out platform because with the
            help of them we will be able to help more people by creating
            different events and initiatives.
          </h5>
        </div>
        
        <div className="organizationbody">
          <MDBRow className="row-cols-1 row-cols-md-3 g-4 organizationbody">
            {organizations.map(organization=>(
              <OrganizationCard
              organization={organization}
            />
            ))}
          </MDBRow>
          
        </div>
      </div>
     
      <div>
        <Footer />
      </div>
    </div>
  )
}
export default Organizations