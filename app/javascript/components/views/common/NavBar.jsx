import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink"
import Confirm from './Confirm';
import UserProfile from './UserProfile';

const NavBar = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const logout = () => {
    const url = `/api/logout`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        handleResponse(res, (r) => {
          if (r.status == 'error') {
            const errorMessages = r.data.map((message, key) => (
              <Error key={key} message={message} />
            ));
            setErrorMessage(errorMessages);
          } else {
            navigate(`/`);
          }
        })
      })
      .catch((e) => {
        setErrorMessage('Something went wrong. <br/>Error Message: ' + e);
      })
      .finally(() => {
        UserProfile.setUser('')
      });
  };

  let sessionNavLink = (
    <>
      <li className="nav-item"><NavLink path="/signup" text="Sign Up" /></li>
      <li className="nav-item"><NavLink path="/login" text="Login" /></li>
    </>
  )

  const id = UserProfile.getId()

  if (UserProfile.getName()) {
    sessionNavLink = (
      <>
        <li className="nav-item">
          <Link className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">
            Logout
          </Link>
          <Confirm modalID="confirmModal" title={"Log out"} message="Are you sure?" confirm="Logout!" cancel="No" onConfirm={logout} />
        </li>
      </>
    )
  }

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
            {sessionNavLink}
          </ul>
        </div>
      </div>
    </nav >
  );
};

export default NavBar;