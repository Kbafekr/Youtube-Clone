import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../../icons/you2oobLogo.png";

// import searchbar
import { SearchBar } from "./SearchBar/SearchBar";

const NavBar = ({sidePanel, setSidePanel}) => {
  const user = useSelector((state) => state.session.user);
  if (user) {
    return (
      <div className="TopNavBarOuter">
        <div className="TopNavBarContainer">
          <div className="LeftmostContainerTopNav">
            <div className="NavOptionBarsContainer">
              <div className="NavOptionBars" onClick={() => setSidePanel(!sidePanel)}>
                <i class="fa-solid fa-bars"></i>
              </div>
            </div>
            <NavLink
              to="/"
              className="NavBarLogoLink"
              exact={true}
              activeClassName="active"
            >
              <img src={logo} alt="logo" className="LogoImageNavBar" />
            </NavLink>
          </div>

          <div className="MiddleContainerTopNav">
            <div className="MiddleContainerInternalTopNav">
              <SearchBar />
            </div>
          </div>

          {/* <NavLink to="/users" exact={true} activeClassName="active">
        Users
      </NavLink> */}
          <div className="RightContainerTopNav">
            <div className="UploadCameraNavBar">
            <i class="fa-sharp fa-solid fa-video"></i>
            </div>
            <div className="NotificationBellNavBar">
              <i class="fa-solid fa-bell"></i>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="TopNavBarContainer">
        <NavLink
          to="/"
          className="CreateAccountRedirect"
          exact={true}
          activeClassName="active"
        >
          Home
        </NavLink>

        <SearchBar />

        <NavLink
          to="/login"
          className="CreateAccountRedirect"
          exact={true}
          activeClassName="active"
        >
          Login
        </NavLink>
      </div>
    );
  }
};

export default NavBar;
