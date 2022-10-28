import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./User.css";

function User({ sidePanel }) {
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);

  if (userId == currentUser.id) {
    return (
      <>
        <div
          className={
            sidePanel == true ? "homeContainer" : "homeContainerClosed"
          }
        >
          <div className="UserPageOuterContainer">
            {/* channel banner */}
            <div className="UserPageChannelBannerSection">
              <img
                className="UserPageChannelBanner"
                src={currentUser.channels[0].banner_picture}
                alt="banner"
              />
              <div className="WelcomeUserPage">
                Hey {currentUser.first_name}
              </div>
            </div>
            {/* navbar section */}
            <div className="UserPageNavBar">
              <h1>fsadfawsd</h1>
              <h1>fasd</h1>
              <h1>fsadfawsd</h1>
            </div>
            {/* info container  */}
            <div className="UserPageInfoContainer"></div>
          </div>
        </div>
      </>
    );
  } else
    return (
      <>
        <div
          className={
            sidePanel == true ? "homeContainer" : "homeContainerClosed"
          }
        >
          <div>You are unauthorized to view this page</div>
        </div>
      </>
    );
}
export default User;
