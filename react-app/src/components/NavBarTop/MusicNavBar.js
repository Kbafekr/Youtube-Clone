import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import ProfileButton from "./ProfileButton/ProfileButton";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import logo from "../../icons/hootubemusic.png";
import reloadPage from "../../Utils/Utils";
// import searchbar
import { SearchBar } from "./SearchBar/SearchBar";
import { useLocation } from "react-router-dom";
import { newChannelThunk } from "../../store/channel";
import { getAllChannelsThunk } from "../../store/channel";
import { updateUserThunk } from "../../store/session";
import { authenticate } from "../../store/session";

import NotificationsBell from "./Notifications/Notiifications";

const MusicNavBar = ({ sidePanel, setSidePanel }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);

  if (user && user.active_channel != null) {
    return (
      <div className="TopNavBarOuter">
        <div className="TopNavBarContainer">
          <div className="LeftmostContainerTopNav">
            <div
              className="NavOptionBarsContainer"
              onClick={() => setSidePanel(!sidePanel)}
            >
              <div className="NavOptionBars">
                <i class="fa-solid fa-bars"></i>
              </div>
            </div>
            <NavLink
              to="/hootubemusic"
              className="NavBarLogoLink"
              exact={true}
              activeClassName="active"
            >
              <img
                src={logo}
                alt="logo"
                className="LogoImageMusicNavBar"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png";
                }}
              />
            </NavLink>
          </div>

          <div className="MiddleContainerTopNav">
            <NavLink exact to="/hootubemusic">
              <button className="homeButton" addEvent>
                Home
              </button>
            </NavLink>
            <NavLink exact to="/hootubemusic/explore">
              <button className="homeButton" addEvent>
                Explore
              </button>
            </NavLink>
            <NavLink exact to="/hootubemusic/library">
              <button className="homeButton" addEvent>
                Library
              </button>
            </NavLink>
            <div className="MiddleContainerInternalTopNav">
              <SearchBar />
            </div>
          </div>

          {/* <NavLink to="/users" exact={true} activeClassName="active">
        Users
      </NavLink> */}
          <div className="RightContainerTopNav">
            <ProfileButton />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="TopNavBarOuter">
        <div className="TopNavBarContainer">
          <div className="LeftmostContainerTopNav">
            <div
              className="NavOptionBarsContainer"
              onClick={() => setSidePanel(!sidePanel)}
            >
              <div className="NavOptionBars">
                <i class="fa-solid fa-bars"></i>
              </div>
            </div>
            <NavLink
              to="/"
              className="NavBarLogoLink"
              exact={true}
              activeClassName="active"
            >
              <img
                src={logo}
                alt="logo"
                className="LogoImageNavBar"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png";
                }}
              />
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
            <NavLink
              to="/login"
              className="CreateAccountRedirect"
              exact={true}
              activeClassName="active"
            >
              <div className="SignInbuttonNav">
                <i class="fa-regular fa-user"></i>
                Sign in
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
};

export default MusicNavBar;
