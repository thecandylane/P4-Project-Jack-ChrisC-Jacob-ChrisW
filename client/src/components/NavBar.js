import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h1>Taskmaster</h1>
      </div>
      <div className="nav-links">
        <NavLink exact to="/home" activeClassName="active-link">
          Home
        </NavLink>
        <NavLink to="/projects" activeClassName="active-link">
          Projects
        </NavLink>
        <NavLink to="/tasks" activeClassName="active-link">
          Tasks
        </NavLink>
        <NavLink to="/profile" activeClassName="active-link">
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
