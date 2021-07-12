import './App.css'
import WelcomePage from './components/reviews/Welcome'
import 'bootstrap/dist/css/bootstrap.min.css'
import PostProduct from './components/postProduct/PostProduct'
import RequestForm from './components/Request-form/RequestForm'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/home/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications'
import ProductDetails from './components/home/ProductDetails'
import Chat from './components/chat/Chat'
import BookmarkPage from './components/Bookmark/BookmarkPage'
import EditMyUserData from './components/Settings/EditMyUserData'
import EditOrgData from './components/Settings/EditOrgData'
import Organization from './components/Organization/RegisterOrganizationForm'
import RequestDetails from './components/home/RequestDetails'
import Organizations from './components/Organization/Organizations'
import Organizationdetails from './components/Organization/Organizationdetails'
import EventDetails from './components/Organization/EventDetails'
import InitiativeDetails from './components/Organization/InitiativeDetails'
import EventsForm from './components/Organization/EventsForm'
import InitiativeForm from './components/Organization/InitiativeForm'
function App() {
  const [loggedInUser, setLoggedInUser] = useState([])

  useEffect(() => {
    ;(async () => {
      await axios
        .get('http://localhost:5000/api/loggedUser', { withCredentials: true })
        .then((res) => {
          setLoggedInUser(res.data)
        })
    })()
  }, [])

  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        <Route path="/home" exact>
          <Home loggedInUser={loggedInUser} />
        </Route>
        <Route path="/postProd" exact>
          <PostProduct loggedInUser={loggedInUser} />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/RequestForm">
          <RequestForm loggedInUser={loggedInUser} />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/chat" exact>
          <Chat />
        </Route>
        <Route path="/EventsForm" exact>
          <EventsForm />
        </Route>
        <Route path="/InitiativeForm" exact>
          <InitiativeForm />
        </Route>
        <Route path="/settings" exact>
          <EditMyUserData />
        </Route>
        <Route path="/OrgSettings" exact>
          <EditOrgData />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard loggedInUser={loggedInUser} />
        </Route>
        <Route path="/prodDetails/:productId" exact>
          <ProductDetails loggedInUser={loggedInUser} />
        </Route>
        <Route path="/reqDetails/:requestId" exact>
          <RequestDetails loggedInUser={loggedInUser} />
        </Route>
        <Route path="/bookmark" exact>
          <BookmarkPage />
        </Route>
        <Route path="/organization" exact>
          <Organization />
        </Route>
        <Route path="/organizations" exact>
          <Organizations />
        </Route>
        <Route path="/Organizationdetails/:orgId" exact>
          <Organizationdetails />
        </Route>
        <Route path="/eventdetails/:EventId" exact>
          <EventDetails />
        </Route>
        <Route path="/initiativedetails/:IniciativeId" exact>
          <InitiativeDetails />
        </Route>
        <NotificationContainer />
      </Router>
    </div>
  )
}

export default App
