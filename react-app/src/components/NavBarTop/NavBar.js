import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// import searchbar
import { SearchBar } from "./SearchBar/SearchBar";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  if (user) {
    return (
      <div className="TopNavBarContainer">
        <NavLink to="/" className='CreateAccountRedirect' exact={true} activeClassName="active">
          Home
        </NavLink>

        <SearchBar />

        {/* <NavLink to="/users" exact={true} activeClassName="active">
        Users
      </NavLink> */}

        <LogoutButton />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="TopNavBarContainer">
        <NavLink to="/" className='CreateAccountRedirect' exact={true} activeClassName="active">
          Home
        </NavLink>

        <SearchBar />

        <NavLink to="/login" className='CreateAccountRedirect' exact={true} activeClassName="active">
          Login
        </NavLink>

      </div>
    );
  }
};

export default NavBar;
