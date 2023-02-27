import React from 'react'
import {Link} from "react-router-dom";

const Navbar = ({user,setUser,login, logout }) => {
  return (
    <div><nav className="navbar navbar-expand bg-light">
    <div class="container-fluid">
    
    <Link to={"/"} className="navbar-brand">
        Restaurant Reviews
      </Link>
   
    </div>
      <div className="navbar-nav mr-auto">
      <div class="container-fluid">
        <li className="nav-item" >
          { user.loggedin ? (
            <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
              Logout {user.name} 
            </a>
          ) : (            
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
          )}

        </li>
        </div>
      </div>
      </nav></div>
  )
}

export default Navbar