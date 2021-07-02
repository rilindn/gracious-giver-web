import React from 'react'
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
                  <MDBBtn href="#" className="org-card-btn">Read More</MDBBtn>
                  <MDBBtn href="#" className="org-card-btn org-card-btn-join">Join</MDBBtn>
                </MDBCardFooter>
              </MDBCard>
    </MDBCol>
    )
}

export default OrganizationCard
