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
<<<<<<< HEAD
=======
<<<<<<< HEAD
import Chat from './components/chat/chat'
=======
>>>>>>> d7f545d5345be4a35ede00ccfe509c2c4f522321
import Chat from './components/chat/Chat'
>>>>>>> 9483422a88dc41409dbc4d853900b9af295aed0c
import BookmarkPage from './components/Bookmark/BookmarkPage'
<<<<<<< HEAD
import EditMyUserData from './components/UserSettings/editUser'
import Organization from './components/Organization/Organization'

=======
import EditMyUserData from './components/UserSettings/EditMyUserData'
>>>>>>> d7f545d5345be4a35ede00ccfe509c2c4f522321

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
        <Route path="/editmydata" exact>
          <EditMyUserData />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard loggedInUser={loggedInUser} />
        </Route>
        <Route path="/prodDetails/:productId" exact>
          <ProductDetails loggedInUser={loggedInUser} />
        </Route>
        <Route path="/bookmark" exact>
          <BookmarkPage />
        </Route>
        <Route path="/settings" exact>
          <EditMyUserData/>
        </Route>
        <Route path="/organization" exact>
          <Organization/>
        </Route>
        <NotificationContainer />
      </Router>
    </div>
  )
}

export default App
