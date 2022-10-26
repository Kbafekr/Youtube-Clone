import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './NavBar.css'

// import searchbar
import { SearchBar } from "./SearchBar/SearchBar";

const NavBar = () => {
  return (
    <nav className="TopNavBarContainer">
      <NavLink to="/" exact={true} activeClassName="active">
        Home
      </NavLink>

      <NavLink to="/login" exact={true} activeClassName="active">
        Login
      </NavLink>

      <SearchBar />

      <NavLink to="/sign-up" exact={true} activeClassName="active">
        Sign Up
      </NavLink>

      <NavLink to="/users" exact={true} activeClassName="active">
        Users
      </NavLink>

      <LogoutButton />
    </nav>
  );
};

export default NavBar;
