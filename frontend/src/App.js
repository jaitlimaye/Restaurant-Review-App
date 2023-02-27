import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import AddReview from "./components/AddReview";
import Login from "./components/Login";
import Restaurant from "./components/Restaurant";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";

function App() {
  const initialUserState = {
    name: "",
    id: "",
    loggedin : false
  };
  const [user,setUser] = React.useState(initialUserState);
  const [restaurants, setRestaurants] = React.useState([]);

    async function login(user = null)
    {
      setUser(user);
    }
  
    async function logout()
    {
      setUser(initialUserState);
      window.location.reload(false);
    }
    return (
    <div>
      
      <Navbar user = {user} setUser = {setUser} login = {login} logout = {logout} />
            <Routes>
            <Route path="/" element={<MainPage restaurants = {restaurants} setRestaurants = {setRestaurants} user = {user} />} />
            <Route path="/restaurants" element={<MainPage restaurants = {restaurants} setRestaurants = {setRestaurants} user={user}/>} />
            <Route path="/restaurants/:id" element={<Restaurant user = {user}/>} />
            <Route path="/restaurants/:id/review"element={<AddReview user = {user}/>}/>
            <Route path="/login" element={<Login login={login} />} />
            </Routes> 
   </div>
   
  );
}

export default App;
/*
<Route path="/restaurants/:id" element={<restaurant {...props} user={user} />} />
          <Route path="/login" element={<login {...props} login={login} />} />
*/ 
/*
<nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
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
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={["/", "/restaurants"]} component={restaurant_list} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <addReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <login {...props} login={login} />
            )}
          />
        </Routes>
      </div>
*/