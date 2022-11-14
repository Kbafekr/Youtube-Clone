import "./SideBar.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllNotificationsThunk } from "../../store/notifications";
import { getAllChannelsThunk } from "../../store/channel";

export function AllSubscriptionsSideBar({ setshowMoreSubscriptions }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);
  const notifications = useSelector((state) => state.notifications);

  const NotificationsAll = Object.values(notifications);

  let counterObject = {};
  let filteredNotifications = [];
  let userNotifications;

  if (NotificationsAll.length > 0) {
    userNotifications = NotificationsAll.filter(
      (notification) => notification.user_id === user.id
    );
  }

  //   loop through filtered array and remove duplicates
  // access the channel_id key in each filtered notification
  if (NotificationsAll.length > 0) {
    for (let i = 0; i < userNotifications.length; i++) {
      let notification = userNotifications[i];
      // if none, set to true to prevent duplicates
      if (!counterObject[userNotifications[i]["channel_id"]]) {
        counterObject[userNotifications[i]["channel_id"]] = true;
        filteredNotifications.push(notification);
      }
    }
  }

  const channelsArray = Object.values(channels);
  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);

  if (user) {
    if (user.subscriptions.length > 6) {
      setshowMoreSubscriptions(true);
    }
  }

  if (!user)
    return (
      <>
        <div className="SubscriptionsSignedOutSideBar">
          <div>Sign in to like videos, comment, and subscribe</div>
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
      </>
    );
  else
    return (
      <>
        {user.subscriptions.map((subscription) => {
          return (
            <>
              {channelsArray.map((channel) => {
                return (
                  <>
                    {channel.id == subscription.channel_id ? (
                      <div className="SideNavRowContainerSubscriptions">
                        <div className="SideNavRowContainerSubscriptionsinner">
                          <Link
                            className="imgsidebarLink"
                            to={`/channels/${channel.id}`}
                          >
                            <img
                              className="channelPictureSideBarSubscriptions"
                              src={channel.profile_picture}
                            ></img>
                          </Link>
                          <Link
                            className="ChannelNameSideBar"
                            to={`/channels/${channel.id}`}
                          >
                            {channel.channel_name}
                          </Link>
                        </div>
                        <div className="NotificationsSideBarSubscriptions">
                          {filteredNotifications &&
                            filteredNotifications.map((notification) => {
                              return (
                                <>
                                  {notification.channel_id ==
                                    subscription.channel_id &&
                                  channel.id == subscription.channel_id ? (
                                    <>
                                      {notification.is_read == false ? (
                                        <div className="BlueCircleNotification"></div>
                                      ) : (
""                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            })}
                        </div>
                      </div>
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
}
