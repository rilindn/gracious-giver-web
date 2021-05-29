import './App.css'
import WelcomePage from './components/reviews/Welcome'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/footer/Footer'
<<<<<<< HEAD
import PostProduct from './components/postProduct/PostProduct'
import Home from './components/home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
  <div className="App">
    <Router>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/postProd">
        <PostProduct/>
      </Route>
      <Route path="/">
        <WelcomePage/>
      </Route>
  </Router>
    </div>
  );
=======


import PostProduct from './components/postProduct/PostProduct'
import Header from './components/Header/Header';

import Home from './components/home/Home'



function App() {
  return <div className="App">

    <Header/>
    <PostProduct/>
    

    <Home/>
    

  </div>
>>>>>>> e5a55d6f03c00f5b624198a2c796ea502e624414
}

export default App
