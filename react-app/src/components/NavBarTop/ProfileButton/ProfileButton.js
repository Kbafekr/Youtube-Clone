import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutButton from "../../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import "./ProfileButton.css";
import reloadPage from "../../../Utils/Utils";

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

  const onLogout = async (e) => {
    await dispatch(logout());
  };

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
            src={activeChannel[0].profile_picture}
            className="ProfileButtonPictureNav"
            onError={(e) => {
              e.currentTarget.src =
                "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png";
            }}
          />
        </div>

        {showMenu && (
          <div className="ProfileDropDownNav">
            <div className="ProfileDDUserOuter">
              <div className="ProfileDDUserLeft">
                <img
                  className="ProfileDropDownImage"
                  src={activeChannel[0].profile_picture}
                />
              </div>
              <div className="ProfileDDUserRight">
                <div className="ProfileDDChannelName">
                  {activeChannel[0].channel_name}
                </div>
                <Link
                  onClick={reloadPage}
                  to={{
                    pathname: `/users/${user.id}`,
                    state: { directedCategory: 5, uploadModalState: true },
                  }}
                  className="ProfileDDManageAccountManage"
                >
                  Manage Your User Account
                </Link>
              </div>
            </div>
            <div className="ProfileDDUserSection">
            <Link to={`/library`} className="ProfileDDRow">
                <i class="fa-solid fa-book"></i>
                <div>Library</div>
              </Link>
              <Link
                onClick={reloadPage}
                to={{
                  pathname: `/users/${user.id}`,
                  state: { directedCategory: 4, uploadModalState: false },
                }}
                className="ProfileDDRow"
              >
                <i class="fa-solid fa-user"></i>
                <div>My Channels</div>
              </Link>
              <Link
                onClick={reloadPage}
                to={{
                  pathname: `/users/${user.id}`,
                  state: { directedCategory: 2, uploadModalState: false },
                }}
                className="ProfileDDRow"
              >
                <i class="fa-sharp fa-solid fa-photo-film"></i>
                <div>My Videos</div>
              </Link>
              <div className="ProfileDDRow" onClick={onLogout}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <LogoutButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
