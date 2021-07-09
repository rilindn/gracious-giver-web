/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../footer/Footer'
import { useParams } from 'react-router-dom';

const InitiativeDetails = () => {

    var {InitiativeId} = useParams();
    const [initiative,setInitiative] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState([])
  
    useEffect(() => {
      ;(async () => {
        await axios
          .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
          .then((res) => {
            setLoggedInUser(res.data)
          })
      })()
      getInitiative();
    }, [])

    const getInitiative = () =>{
        try{
            axios.get('htttp://localhost:5000/api/event/'+ InitiativeId)
            .then((res)=>{
                setInitiative(res.data)
            })
        }catch(e){
            console.log(e)
        }
        
    }

//     const handleJoinedSubmit = async (event) =>  {
//         event.preventDefault();
//          axios
//         .post('http://localhost:5000/api/EventParticipants', {
//           // EventId:,
//           ParticipantId:loggedInUser.UserId,
//         })
//         .then(
//           (res) => {
//             NotificationManager.success(
//             'Joined Successfully!',
//             '',
//             2000,
//             )
//           },
//           (error) => {
//             NotificationManager.error(
//               'Error while joining!',
//               '',
//               1000,
//               )
//           },
//         )
//   }

    return (
        <div>
            <Header/>
        <div className="container bootdey">
        <div className="col-md-12">
          <section className="panel">
            <div className="panel-body">
              {/* <div className="imgorg">
                <div className="pro-img-details">
                  <img id="imgo" src={imgSrc} alt="" />
                </div>
              </div> */}
              <div className="organization-details-wrapper">
                <h4 className="pro-d-title">
                {initiative.Name} Initiative name
                </h4>
                <p style={{textAlign:"left"}}>
                 {initiative.Description} Initiative Description
                </p>
                
                <p style={{textAlign:"left"}}>
                  
                  <button style={{backgroundColor:"#d92362"}}  className="btn btn-round btn-danger" type="button">Donate</button>
                  
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer/>
      </div>
    )
}

export default InitiativeDetails
