import axios from 'axios';
import React, { useEffect } from 'react';
import  { useState } from "react";
import { Link } from "react-router-dom";


function Sidebar() {
  
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
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
    <nav className={sidebar ? "sidebar active" : "sidebar"}>
      <button className="hamburger" type="button" onClick={showSidebar}>
        <div></div>
      </button>
      <ul onClick={showSidebar}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/">Welcome</Link></li>
        <li><Link to="">Contact</Link></li>
        <li><Link to="/organizations">Organizations</Link></li>
        {loggedInUser.length!==0 && loggedInUser.UserRole==="Donator"?
        <li><Link to="/organization">Register Organization</Link></li>
        :null
        }
        
      </ul>
    </nav>
  );
}

export default Sidebar;