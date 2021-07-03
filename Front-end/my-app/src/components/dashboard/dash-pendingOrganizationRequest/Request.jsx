import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button} from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

const OrganizationRequest = ({request,i,loggedInUser,setRequestV,setRequestD,onUpdate}) => {

    
    // const [productName, setProductName] = useState();
    // const [requesterName, setRequesterName] = useState();
    // const dateTime = request.Request_Date.split("T")

    // useEffect(()=>{
    //     getProductName();
    //     getRequesterName();
    // },[])

    // const getProductName = async () => {
    //     try{ 
    //     await axios.get("http://localhost:5000/api/pendingorganizationsrequest/"+request.Org)
    //     .then(res=>{
    //         setProductName(res.data.ProductName)
    //     })
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    // }

    // const getRequesterName = async () => {
    //     try{ 
    //     await axios.get("http://localhost:5000/api/user/"+request.UserId)
    //     .then(res=>{
    //         setRequesterName(res.data.UserName)
    //     })
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    // }

    const defaultImg = "prodImg.jpg"
    const imgSrc = "http://localhost:5000/photos/organization/"+
    (request.Logo===''?defaultImg:request.Logo);
    console.log(request.Logo)

    const handleAcceptOrganizationRequest  = async (OId) => {
        var date = new Date().toLocaleString()
        try{
          await axios.post(`http://localhost:5000/api/organization/`,{
           Username: OId.Username,
           Password: OId.Password,
           Name: OId.Name,
           Email : OId.Email,
           Category: OId.Category,
           Description: OId.Description,
           State: OId.State,
           City: OId.City,
           Documentation:OId.Documentation,
           Logo:OId.Logo
          }) 
          .then(()=>{
            axios.put('http://localhost:5000/api/pendingorganizationsrequest/'+OId.OrganizationId, {
                OrganizationId: OId.OrganizationId,
                Username: OId.Username,
                Password: OId.Password,
                Name: OId.Name,
                Email : OId.Email,
                Category: OId.Category,
                Checked : true,
                Description: OId.Description,
                State: OId.State,
                City: OId.City,
                Documentation:OId.Documentation,
                Logo:OId.Logo,
              })
          })
          .then(()=>{
            onUpdate();
          })
          .then((res) => {
            NotificationManager.success(
            'Organization has been accepted!',
            '',
            1000,
            )},
            )
        }
        catch(e){
            console.log(e);
            }
        }

        const handleDeclinedOrganizationRequest  = async (OId) => {
            var date = new Date().toLocaleString()
            try{
                axios.put('http://localhost:5000/api/pendingorganizationsrequest/'+OId.OrganizationId, {
                    OrganizationId: OId.OrganizationId,
                    Username: OId.Username,
                    Password: OId.Password,
                    Name: OId.Name,
                    Email : OId.Email,
                    Category: OId.Category,
                    Checked : true,
                    Description: OId.Description,
                    State: OId.State,
                    City: OId.City,
                    Documentation:OId.Documentation,
                    Logo:OId.Logo,
                  })
              
              .then(()=>{
                onUpdate();
              })
              .then((res) => {
                NotificationManager.success(
                'Organization has been declined!',
                '',
                1000,
                )},
                )
            }
            catch(e){
                console.log(e);
                }
            }

  return (
      <tr key={request.RequestId} >
        <td>#{++i}</td>
        <td>{request.Name}</td>
        <td>
        <img 
        style={{width:"50px"}}
        src={"http://localhost:5000/photos/organization/"+
        (request.Logo===''?"prodImg.jpg":request.Logo)} 
        alt="." />
        </td>
        <td>{request.Category}</td>
        <td>{request.Description.substring(0,20)}...</td>
        <td>
        <a 
        style={{width:"50px"}}
        href={"http://localhost:5000/photos/organization/"+
        (request.Documentation===''?"prodImg.jpg":request.Documentation)}>
        {request.Documentation.substring(0, 7)} ...
        <i class="fas fa-download"></i></a>
        </td>
        <td>{request.State}</td>
        <td>{request.City}</td>

        <td>
            <div>
              <Button
                onClick={() => handleAcceptOrganizationRequest(request)}
                className="m-2"
                variant="success"
                data-toggle="modal"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleDeclinedOrganizationRequest(request)}
                className="m-2"
                variant="danger"
                data-toggle="modal"
              >
                Decline
              </Button>
            </div>
        </td>
      </tr>
  )
}

export default OrganizationRequest
