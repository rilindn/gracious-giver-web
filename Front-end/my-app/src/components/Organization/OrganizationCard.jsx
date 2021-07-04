
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { useHistory } from 'react-router-dom'

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBCardImage,
    MDBCol,
    MDBCardFooter,
  } from 'mdb-react-ui-kit'
const OrganizationCard = ({organization}) => {

    const defaultImg = "prodImg.jpg"
    const imgSrc = "http://localhost:5000/photos/organization/"+
    (organization.Logo===''?defaultImg:organization.Logo);
    console.log(organization.Logo)

    const [loggedInUser, setLoggedInUser] = useState([])
    
    useEffect(() => {(async () => {
         axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
          })
      })()
    }, [])

    const handleSubmit = async (event) =>  {
      var date = new Date().toLocaleString()
      event.preventDefault();
       axios
      .post('http://localhost:5000/api/OrganizationMemberRequest', {
        DateOfJoining: date,
        OrganizationId: organization.OrganizationId,
        UserId:loggedInUser.UserId,
        Checked : false
      })
      .then(
        (res) => {
          NotificationManager.success(
          'Joined Successfully!',
          '',
          2000,
          )
        },
        (error) => {
          NotificationManager.error(
            'Error while joining!'+{error},
            '',
            1000,
            )
        },
      )
}
    return (

        <MDBCol className="p-3">
              <MDBCard className="h-100">
                <MDBCardImage
                  src={imgSrc}
                  alt="..."
                  position="top"
                  className="org-card-img"
                />
                <MDBCardBody>
                  <MDBCardTitle>{organization.Name}</MDBCardTitle>
                  <MDBCardText>
                  {organization.Description}
                  </MDBCardText>
                </MDBCardBody>

                <MDBCardFooter>
                  <MDBBtn href={`/OrganizationDetails/${organization.OrganizationId}`} className="org-card-btn">Read More</MDBBtn>
                  <MDBBtn href="#" className="org-card-btn org-card-btn-join" onClick={handleSubmit}>Join</MDBBtn>
                </MDBCardFooter>
              </MDBCard>
    </MDBCol>
    )
}

export default OrganizationCard
