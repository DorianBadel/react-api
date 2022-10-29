import React, { useState } from 'react'
import './nav.css'



function Navigation() {
  const [isToggled, setIsToggled] = useState(false);
  function toggle(){
    setIsToggled(t => !t)
  }
  return (
    <nav>
    <div className="nav-center">
      <div className="nav-header">
        <img src="./assets/logo.svg" alt="logo" className="logo"/>
        <button className="nav-toggle" onClick={toggle}>
          x
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <ul className={isToggled ? "links show-links" : "links"}>
        <li>
          <a href="index.html">home</a>
        </li>
        <li>
          <a href="about.html">about</a>
        </li>
        <li>
          <a href="projects.html">projects</a>
        </li>
        <li>
          <a href="contact.html">contact</a>
        </li>
      </ul>
      <ul className="social-icons">
        <li>
          <a href="https://www.twitter.com">
            <i className="fab fa-facebook"></i>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <i className="fab fa-behance"></i>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <i className="fab fa-sketch"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  )
}

export default Navigation
