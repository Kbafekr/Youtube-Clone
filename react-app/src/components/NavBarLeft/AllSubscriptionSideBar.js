import "./SideBar.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllChannelsThunk } from "../../store/channel";

export function AllSubscriptionsSideBar({setshowMoreSubscriptions}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);

  const channelsArray = Object.values(channels);
  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);

  if (user) {
    if (user.subscriptions.length > 6) {
        setshowMoreSubscriptions(true)
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
                      <div className="SideNavRowContainer">
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
