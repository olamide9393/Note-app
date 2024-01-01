import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    // Check if a token is available in local storage
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token is available
  }, []);
  return (
    <div>
              {/* <h1>Notes</h1>

<ul
  class="nav nav-pills"
  style={{ marginLeft: "700px", fontSize: "30px", marginTop: "-50px" }}
>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
      <CgProfile />
    </a>

    {isLoggedIn ? (
      // Display "Logout" if the user is logged in
      <>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/Profile">
            PROFILE
          </Link>

          <Link className="dropdown-item" to="/login">
            LOGOUT
          </Link>
        </div>
      </>
    ) : (
      // Display "Login" and "Register" if the user is not logged in
      <>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/login">
            LOGIN
          </Link>
        </div>
      </>
    )}
  </li>
</ul> */}


      {/* <Outlet /> */}
      




      <nav className="navbar navbar-expand-md navbar-dark" >
        <Link
          to="/"
          style={{ fontSize: '30px', marginTop: '10px', color: 'black' }}
          className="navbar-brand"
        >
          Notes
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
          style={{ backgroundColor: "green" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link
                style={{
                  color: "black",
                  marginLeft: "120px",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
                className="nav-link"
                to="/"
              >
                HOME
              </Link>
            </li> */}
            <nav className="navbar navbar-expand-sm navbar-dark" style={{marginLeft:'100px'}}>
            <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" style={{fontSize:'20px',color:'black'}}>
      <CgProfile />
    </a>

    {isLoggedIn ? (
      // Display "Logout" if the user is logged in
      <>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/Profile">
            PROFILE
          </Link>

          <Link className="dropdown-item" to="/login">
            LOGOUT
          </Link>
        </div>
      </>
    ) : (
      // Display "Login" and "Register" if the user is not logged in
      <>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/login">
            LOGIN
          </Link>
        </div>
      </>
    )}
  </li>
  
         
            </nav>
          </ul>
        </div>
      </nav>
      <Outlet />

    </div>
    
  )
}

export default Navbar
