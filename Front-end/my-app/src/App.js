import './App.css'
import WelcomePage from './components/reviews/Welcome'
import 'bootstrap/dist/css/bootstrap.min.css'
import PostProduct from './components/postProduct/PostProduct'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/home/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/postProd" exact>
          <PostProduct />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
      </Router>
    </div>
  )
}

export default App
