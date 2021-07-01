
import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardImage, MDBRow,MDBCol,MDBCardFooter,} from 'mdb-react-ui-kit';
import Footer from '../footer/Footer';
import Header from './../Header/Header'
import Sidebar from '../Sidebar/Sidebar';
export default function App() {
  return (
      
     <div className="bodyorganizations">
        <div>
            <Sidebar/>
            <Header/>
        </div>
       <div>
       
       <div className='  p-5 text-center bg-light' id="ORGheaderimage">
        <h1 className='mb-3'>Heading</h1>
        <h4 className='mb-3'>Subheading</h4>
        <a className='btn btn-primary' href='' role='button'>
          Call to action
        </a>
      </div>
      
      
      <div className="organizationbody">
      <MDBRow className='row-cols-1 row-cols-md-3 g-4 organizationbody'>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='http://www.socsc.hku.hk/ExCEL3/wp-content/uploads/2013/02/Module4.png'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This is a longer card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
            </MDBCardText>
          </MDBCardBody>
          
          < MDBCardFooter>
          <MDBBtn href='#'>Read More</MDBBtn>
          <MDBBtn href='#'>Join</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://www.standardsboostbusiness.org/images/illustrations/organizations.jpg'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This card has supporting text below as a natural lead-in to additional content.
            </MDBCardText>
          </MDBCardBody>
          < MDBCardFooter>
          <MDBBtn href='#'>Read More</MDBBtn>
          <MDBBtn href='#'>Join</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://reformjudaism.org/sites/default/files/FriendshipCircle.jpg'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This is a wider card with supporting text below as a natural lead-in to additional content. This
              card has even longer content than the first to show that equal height action.
            </MDBCardText>
          </MDBCardBody>
          
          < MDBCardFooter>
          <MDBBtn href='#'>Read More</MDBBtn>
          <MDBBtn href='#'>Join</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      
    </MDBRow>
    <MDBRow className='row-cols-1 row-cols-md-3 g-4 organizationbody'>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbcdn.b-cdn.net/img/new/standard/city/044.jpg'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This is a longer card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
            </MDBCardText>
          </MDBCardBody>
          < MDBCardFooter>
          <MDBBtn href='#'>Read More</MDBBtn>
          <MDBBtn href='#'>Join</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://www.ibdaahub.com/wp-content/uploads/2014/06/organization.jpg'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This card has supporting text below as a natural lead-in to additional content.
            </MDBCardText>
          </MDBCardBody>
          < MDBCardFooter>
          <MDBBtn href='#'>Read More</MDBBtn>
          <MDBBtn href='#'>Join</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage 
            src='https://cdn.corporatefinanceinstitute.com/assets/types-of-organizations1.jpeg'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This is a wider card with supporting text below as a natural lead-in to additional content. This
              card has even longer content than the first to show that equal height action.
            </MDBCardText>
          </MDBCardBody>
          
          < MDBCardFooter>
          <MDBBtn href='#'>Read More</MDBBtn>
          <MDBBtn href='#'>Join</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      
    </MDBRow>
    </div>
      </div>
     <div>
         <Footer/>
     </div>
    </div>
  );
}