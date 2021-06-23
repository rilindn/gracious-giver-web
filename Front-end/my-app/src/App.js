import './App.css'
import WelcomePage from './components/reviews/Welcome'
import 'bootstrap/dist/css/bootstrap.min.css'
import PostProduct from './components/postProduct/PostProduct'
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
import Chat from './components/chat/chat'


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
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/chat" exact>
          <Chat />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard loggedInUser={loggedInUser} />
        </Route>
        <Route path="/prodDetails/:productId" exact>
          <ProductDetails loggedInUser={loggedInUser} />
        </Route>
        <NotificationContainer />
      </Router>
    </div>
  )
}

export default App
