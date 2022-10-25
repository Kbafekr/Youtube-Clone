import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './SideBar.css'
const SideBarNav = () => {
  return (
    <nav className="SideNavBarContainer">
      <div className="InternalSideBarContainer">
      <NavLink to="/" exact={true} activeClassName="active">
        Home
      </NavLink>

      <NavLink to="/login" exact={true} activeClassName="active">
        Login
      </NavLink>

      <NavLink to="/sign-up" exact={true} activeClassName="active">
        Sign Up
      </NavLink>

      <NavLink to="/users" exact={true} activeClassName="active">
        Users
      </NavLink>

      <LogoutButton />
      </div>
    </nav>
  );
};

export default SideBarNav;
