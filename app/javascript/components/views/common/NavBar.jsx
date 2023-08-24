import React from "react";
import NavLink from "./NavLink"

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light mb-3" style={{ backgroundColor: '#e3f2fd' }}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink path="/" text="Home" />
            </li>
            <li className="nav-item">
              <NavLink path="/categories" text="Categories" />
            </li>
          </ul>
        </div>
      </div>
    </nav >
  );
};

export default NavBar;