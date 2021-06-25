import React from 'react';
import  { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <nav className={sidebar ? "sidebar active" : "sidebar"}>
      <button className="hamburger" type="button" onClick={showSidebar}>
        <div></div>
      </button>
      <ul onClick={showSidebar}>
        <li><Link to="">Home</Link></li>
        <li><Link to="">Services</Link></li>
        <li><Link to="">Contact</Link></li>
        <li><Link to="/organization">Register Organization</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;