import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutButton from "../../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import "./ProfileButton.css";
import reloadPage from "../../../Utils/Utils";
import { getAllNotificationsThunk } from "../../../store/notifications";
import { updateNotificationThunk } from "../../../store/notifications";

export default function NotificationsBell() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);
  const notifications = useSelector((state) => state.notifications);
  const channels = useSelector((state) => state.channel);
  const videos = useSelector((state) => state.video);

  const NotificationsAll = Object.values(notifications);
  const channelsAll = Object.values(channels);
  const VideosAll = Object.values(videos);
  let unsortedNotifications;
  let userNotifications;
  let numberNotifications;

  if (NotificationsAll.length > 0) {
    unsortedNotifications = NotificationsAll.filter(
      (notification) => notification.user_id === user.id
    );
    numberNotifications = NotificationsAll.filter(
      (notification) =>
        notification.user_id === user.id && notification.is_read == false
    );
  }

  if (NotificationsAll.length > 0) {
    userNotifications = unsortedNotifications.sort((a, b) => b.id - a.id);
  }

  useEffect(() => {
    dispatch(getAllNotificationsThunk());
  }, []);
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
      {numberNotifications != null ? (

          <div className="NumberofNotifications">
        {numberNotifications.length != 0 ? (
            <div className="BlueCircleNotificationButton"></div>
            ) : (
              ""
              )}
              </div>
               ) : (
                ""
                )}
        <div className="NotificationBellNavBar" onClick={openMenu}>
          <i class="fa-solid fa-bell"></i>
        </div>

        {showMenu && (
          <div className="NotificationDropDownNav">
            <div className="ProfileDDUserOuter">
              <div className="NotificationsMenuText">Notifications</div>
            </div>
            {/* map throughout each video, channel */}
            <div className="ProfileDDUserSection">
              {userNotifications &&
                userNotifications.map((notification) => {
                  return (
                    <>
                      {channelsAll &&
                        channelsAll.map((channel) => {
                          return (
                            <>
                              {VideosAll &&
                                VideosAll.map((video) => {
                                  return (
                                    <>
                                      {video.id == notification.video_id &&
                                      channel.id == notification.channel_id ? (
                                        <>
                                          <Link
                                            className="notificationRowMenu"
                                            to={`/videos/${video.id}`}
                                            onClick={() =>
                                              dispatch(
                                                updateNotificationThunk(
                                                  notification.id,
                                                  notification.channel_id,
                                                  notification.video_id,
                                                  notification.user_id,
                                                  true
                                                )
                                              )
                                            }
                                          >
                                            {notification.is_read == false ? (
                                              <div className="BlueCircleNotification"></div>
                                            ) : (
                                              <div className="IsReadNotification"></div>
                                            )}
                                            <img
                                              className="NotificationMenuChannelPic"
                                              src={channel.profile_picture}
                                            ></img>
                                            <div className="videoTitleNotificationMenu">
                                              {video.title}
                                            </div>
                                          </Link>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  );
                                })}
                            </>
                          );
                        })}
                    </>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
