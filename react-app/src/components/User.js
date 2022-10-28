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
          <ul>
            <li>
              <strong>User Id</strong> {userId}
            </li>
            <li>
              <strong>First Name</strong> {currentUser.first_name}
            </li>
            <li>
              <strong>Last Name</strong> {currentUser.last_name}
            </li>
            <li>
              <strong>Email</strong> {currentUser.email}
            </li>
          </ul>
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
