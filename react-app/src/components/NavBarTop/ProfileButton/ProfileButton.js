import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutButton from "../../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileButton.css";

export default function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  let activeChannel;
  // define active channel
  if (user.channels) {
    activeChannel = user.channels.filter(
      (channel) => channel.id == user.active_channel
    );
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <div>
        <div className="ProfileButtonOuter" onClick={openMenu}>
          <img
            src={activeChannel.profile_picture}
            className="ProfileButtonPictureNav"
          />
        </div>

        {showMenu && <LogoutButton />}
      </div>
    </>
  );
}
