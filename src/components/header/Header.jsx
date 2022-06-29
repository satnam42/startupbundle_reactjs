import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./header.css";

const Header = () => {
  const history = useHistory();
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container py-2">
        <NavLink className="navbar-brand" exact to="/">
          Start Up Bundle
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/gallary">
                Gallary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/chat">
                Chat
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-dark ml-3"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  localStorage.removeItem("id");
                  history.push("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
