/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../Header/Header'
import Footer from '../footer/Footer'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import Event from './Event'
import Initiative from './Initiative'
import ScrollMenu from 'react-horizontal-scrolling-menu'

const OrganizationDetails = () => {
  var { orgId } = useParams()
  const [organization, setOrganization] = useState([])
  const [loggedInUser, setLoggedInUser] = useState([])
  const [joined, setJoined] = useState()
  const [allEvents, setAllEvents] = useState([])
  const [allInitiatives, setAllInitiatives] = useState([])

  useEffect(() => {
    ;(async () => {
      await axios
        .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
        .then((res) => {
          setLoggedInUser(res.data)
          joinCheck(res.data.UserId)
        })
    })()
    getOrganization()
    getAllEvents()
    getAllInitiatives()
  }, [])

  const joinCheck = (UserId) => {
    try {
      axios
        .get(
          `http://localhost:5000/api/OrganizationMember/joined/${organization.OrganizationId}/${UserId}`,
        )
        .then((res) => {
          setJoined(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }
  const getAllEvents = async () => {
    try {
      await axios.get(`http://localhost:5000/api/Events`).then((res) => {
        console.log(res.data)
        setAllEvents(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }


  const getAllInitiatives= async () => {
    try {
      await axios.get(`http://localhost:5000/api/Iniciative`).then((res) => {
        console.log(res.data)
        setAllInitiatives(res.data)
      })
    } catch (e) {
      console.log(e)
    }
  }


  const getOrganization = () => {
    try {
      axios
        .get('http://localhost:5000/api/organization/' + orgId)
        .then((res) => {
          console.log(res.data)
          setOrganization(res.data)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const defaultImg = 'prodImg.jpg'
  const imgSrc =
    'http://localhost:5000/photos/organization/' +
    (organization.Logo === '' ? defaultImg : organization.Logo)
  console.log(organization.Logo)

  const handleJoinedSubmit = async (event) => {
    event.preventDefault()
    axios
      .post('http://localhost:5000/api/EventParticipants', {
        // EventId:,
        ParticipantId: loggedInUser.UserId,
      })
      .then(
        (res) => {
          NotificationManager.success('Joined Successfully!', '', 2000)
        },
        (error) => {
          NotificationManager.error('Error while joining!', '', 1000)
        },
      )
  }
  return (
    <div>
      <Header />
      <div className="orgdetails">
        <div className="container bootdey">
          <div className="col-md-12">
            <section className="panel">
              <div className="panel-body">
                <div className="imgorg">
                  <div className="pro-img-details">
                    <img id="imgo" src={imgSrc} alt="" />
                  </div>
                </div>
                <div className="organization-details-wrapper">
                  <h4 className="pro-d-title">{organization.Name}</h4>
                  <p style={{ textAlign: 'left' }}>
                    {organization.Description}
                  </p>

                  <p style={{ textAlign: 'left' }}>
                    {loggedInUser.OrganizationId === undefined ? (
                      joined === undefined ? (
                        <button
                          style={{ backgroundColor: '#d92362' }}
                          onClick={handleJoinedSubmit}
                          className="btn btn-round btn-danger"
                          type="button"
                        >
                          Join us
                        </button>
                      ) : (
                        <button
                          style={{ backgroundColor: '#d92362' }}
                          className="btn btn-round btn-danger"
                          type="button"
                        >
                          Joined
                        </button>
                      )
                    ) : null}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="eveent">
        <span>Events</span>
        <div className="ss"></div>
      </div>

      <div className="eventet">
        <div className="container events-sec">
          {loggedInUser.OrganizationId === organization.OrganizationId ? (
            <a href="/EventsForm">
              <button className="create-event-btn" type="button">
                <i className="fas fa-plus ml-1 fa-3x"></i>
              </button>
            </a>
          ) : null}
          <div className="events-scroller" >
            <ScrollMenu
              data={allEvents.map((event) => (
                <Event
                  key={event.EventId}
                  event={event}
                  loggedInUser={loggedInUser}
                  organization={organization}
                />
              ))}
              arrowLeft={<div className="events-scroller-arrows" >{<i class="fas fa-angle-left fa-4x"></i>}</div>}
              arrowRight={<div className="events-scroller-arrows">{<i class="fas fa-angle-right fa-4x"></i>}</div>}
            ></ScrollMenu>
          </div>
        </div>
      </div>

      <div className="inicia">
        <h1
          style={{
            color: '#555958',
            fontSize: '35px',
            fontWeight: 'bold',
            fontFamily: 'Courier New',
          }}
        >
          Initiatives
        </h1>
        <div className="ss"></div>
      </div>

      <div className="iniciativat">
      <div className="container events-sec">
          {loggedInUser.OrganizationId === organization.OrganizationId ? (
            <a href="/InitiativeForm">
              <button className="create-event-btn" type="button">
                <i className="fas fa-plus ml-1 fa-3x"></i>
              </button>
            </a>
          ) : null}
          <div className="events-scroller" >
            <ScrollMenu
              data={allInitiatives.map((iniciative) => (
                <Initiative
                  key={iniciative.IniciativeId}
                  iniciative={iniciative}
                  loggedInUser={loggedInUser}
                  organization={organization}
                />
              ))}
              arrowLeft={<div className="events-scroller-arrows" >{<i class="fas fa-angle-left fa-4x"></i>}</div>}
              arrowRight={<div className="events-scroller-arrows">{<i class="fas fa-angle-right fa-4x"></i>}</div>}
            ></ScrollMenu>
          </div>
        
        
        </div>
      </div>

      <Footer />
    </div>
  )
}
export default OrganizationDetails
