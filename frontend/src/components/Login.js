import React, { useState } from "react";
import { Link } from "react-router-dom";


const Login = ({login}) => {
  
  const initialUserState = {
    name: "",
    id: "",
  };
  const [user,setUser] = React.useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value ,loggedin : true});
  };

  const handleSubmitChange = (event) => {
    login(user);
  };
  
  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={user.name}
            id="name"
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={user.id}
            id="id"
            name="id"
          />
        </div>
        <Link to={"/"}>
        <button onClick={handleSubmitChange} className="btn btn-success">
          Login
        </button></Link>
      </div>
    </div>
  );
}

export default Login