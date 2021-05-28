import './App.css'
import WelcomePage from './components/reviews/Welcome'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/footer/Footer'


import PostProduct from './components/postProduct/PostProduct'
import Header from './components/Header/Header';

import Home from './components/home/Home'



function App() {
  return <div className="App">

    <Header/>
    <PostProduct/>
    

    <Home/>
    

  </div>
}

export default App
