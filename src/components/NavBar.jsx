import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">Vidly</span>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>

          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>

          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>

          {!user && (
            <>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>

              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
