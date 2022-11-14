import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutButton from "../../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import "./ProfileButton.css";
import reloadPage from "../../../Utils/Utils";
import { getAllNotificationsThunk } from "../../../store/notifications";

export default function NotificationsBell() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);
  const notifications = useSelector((state) => state.notifications);
  const channels = useSelector((state) => state.channel);
  const videos = useSelector((state) => state.video);


  const NotificationsAll = Object.values(notifications)
  const channelsAll = Object.values(channels)
  const VideosAll = Object.values(videos)

  let userNotifications;

  if (NotificationsAll.length > 0) {
    userNotifications = NotificationsAll.filter((notification) => notification.user_id === user.id)
  }

  useEffect(() => {
    dispatch(getAllNotificationsThunk())
}, [])
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
      <div className="NotificationBellNavBar" onClick={openMenu}>
              <i class="fa-solid fa-bell"></i>
            </div>

        {showMenu && (
          <div className="ProfileDropDownNav">
            <div className="ProfileDDUserOuter">
              <div className="NotificationsMenuText">
                Notifications
              </div>
            </div>
            <div className="ProfileDDUserSection">
              {userNotifications && userNotifications.map((notification) => {
                return (
                    <>
                    <div>
                        {}
                        <div>
                            {notification.channel_id}
                        </div>
                    </div>
                    </>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
