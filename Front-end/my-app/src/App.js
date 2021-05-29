import './App.css'
import WelcomePage from './components/reviews/Welcome'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/footer/Footer'
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
}

export default App
