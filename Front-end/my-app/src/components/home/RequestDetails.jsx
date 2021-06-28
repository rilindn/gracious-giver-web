import Header from '../Header/Header'
import Footer from '../footer/Footer'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Form } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications';

const RequestDetails = ({loggedInUser}) => {
  
  var {requestId} = useParams();
  const [request, setrequest] = useState([]);
  const [donator,setDonator] = useState([]);
  const [requestPhotos,setrequestPhotos] = useState([])
  const [bigImg,setBigImg] = useState()
  
 
    useEffect(()=>{
      getrequestData();
    // eslint-disable-next-line
    },[]);


    const getrequestData = async () => {
        try{
        await axios.get(`http://localhost:5000/api/request/`+requestId)
        .then(res=>{
            setrequest(res.data)
            axios.get("http://localhost:5000/api/requestphotos/"+res.data.requestId)
            .then(resu=>{
              setrequestPhotos(resu.data)
            })
            axios.get("http://localhost:5000/api/user/"+res.data.DonatorId)
            .then(don=>{
              setDonator(don.data)
            })
        })
        }
        catch(e){
            console.log(e);
        }
    }
      if(request.requestPhoto!==undefined){
        const defaultImg = "prodImg.jpg"
        var imgSrc = "http://localhost:5000/photos/"+
        (request.requestPhoto===''?defaultImg:(request.requestPhoto).replace("C:\\fakepath\\", ""))
      }
      

      const displaySelectedImage = (e) => {
        var imgSrc = `http://localhost:5000/photos/${e}`
        setBigImg(imgSrc);
      }

      

      const insertRequest = (event) => {
      
          var date = new Date().toLocaleString()
          console.log(date)
          axios.post('http://localhost:5000/api/request_Request', {
            UserId: loggedInUser.UserId,
            requestId: request.requestId,
            Message: event.target.Message.value,
            Request_Date: date,
            checkedR : false
          })
          .then(
            (res) =>{
              console.log(res.data); 
              NotificationManager.success('Your request has been sent!','',3000);
              event.target.Message.value=null
            },
            (error) =>{
              console.log(error)
              NotificationManager.error('Problems while requesting the request!','',3000);
            },
          )
        }
      

  return (
   
    
    <div className="">
        <Header search={false}/>
        {/* <div className="container p-4 my-4 border">
          <div className="row">
           <div className="col-sm-6 ">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem magnam sequi repellat enim fugiat temporibus. Sint non totam facere aperiam labore. Quod nisi incidunt quis impedit, mollitia rem sapiente consequatur.</p>
              </div>
           <div className="col-sm-6 ">
             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt odio hic quas impedit iusto omnis rerum fugiat fuga dignissimos quos, veniam animi totam deleniti? Voluptates debitis beatae ea eius ab!</p>
             </div>


             <section className="mb-5"></section> */}
            <div className="col-12">
        <div className="container p-3 my-3 border" id="prdetail">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <div id="mdb-lightbox-ui"></div>

              <div className="mdb-lightbox">
                <div className="row request-gallery mx-1">
                  <div className="col-12 mb-0">
                    <figure
                      id="figure01"
                      className="view overlay rounded z-depth-1 main-img"
                    >
                      <img src={bigImg?bigImg:imgSrc} className="img-fluid z-depth-1 prodDetails-img" alt=""></img>
                    </figure>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      {
                        requestPhotos.map((requestPhoto,i) => (
                          <div key={requestPhoto.PhotoId} className="col-3 mb-3">
                          <div className="view overlay rounded z-depth-1 gallery-item">
                            <img
                              src={`http://localhost:5000/photos/${requestPhoto.requestPhotoPath}`}
                              className="img-fluid z-depth-1 prodDetails-2img"
                              alt=""
                              onClick={() => displaySelectedImage(requestPhoto.requestPhotoPath)}
                            />
                          </div>
                        </div>
                        ))
                      }
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="prDetail" className="col-md-6 prDetail">
              <h5>{request.requestName}</h5>
              <p className="mb-2 text-muted text-uppercase small">{request.requestState}</p>

              <p>
                <span className="mr-1">
                  <strong>value </strong> indefinite
                </span>
              </p>
              <p className="pt-1">
              {request.requestDescription}
              </p>
              <div className="table-responsive">
                <table className="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th className="pl-0 w-25" scope="row">
                        <strong>Category</strong>
                      </th>
                      <td>{request.requestCategory}</td> 
                    </tr>
                    <tr>
                      <th className="pl-0 w-25" scope="row">
                        <strong>Location</strong>
                      </th>
                      <td>{request.requestLocation}</td>
                    </tr>
                    <tr>
                      <th className="pl-0 w-25" scope="row">
                        <strong>Donator</strong>
                      </th>
                      <td>{donator.UserName}</td>
                    </tr>
                    <tr>
                      <th className="pl-0 w-25" scope="row">
                        <strong>Comment</strong>
                      </th>
                      <td>{request.requestComment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {loggedInUser.length===0?null:
              <Form onSubmit={(event) => insertRequest(event)}  className="d-flex justify-content-start align-items-start">
                <textarea
                name = "Message"
                placeholder="I need this request because..."
                rows="3"
                className="pl-2 req-prod-textarea"
                >

                </textarea>
              <button type="submit" className="btn btn-primary btn-md mr-1 mb-2">
                Request{' '}
              </button>
              </Form>}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default RequestDetails
