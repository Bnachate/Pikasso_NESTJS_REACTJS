import React from 'react'
import '../App.css'
import ping from '../images/pingouin.jpg'

import { Link } from 'react-router-dom'



function notFound() {

  
  return (
   <div className="countainer404">
          <h1>404</h1>
          <h2>Are you lost?</h2>
          <img className="countainer404IMG" src={ping} height="400" width="300" alt="ping, are you lost?"/>
          <p>page was not found...</p>
          <div className="linkHomepage">
            <Link to="/">Homepage</Link>
          </div>
        
     
    </div>
  );
}

export default notFound;
