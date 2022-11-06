import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/session";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllChannelsThunk } from "../../store/channel";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import CommunityChannels from "./CommunitySection/OtherChannels";
import ChannelVideosSection from "./VideoSection/ChannelVideos";
import { getAllUsersThunk } from "../../store/allusers";
import { createSubscriberThunk } from "../../store/subscribers";
import "./Channel.css";

export default function HomePage({ sidePanel }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { channelId } = useParams();
  const [category, setCategory] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const channels = useSelector((state) => state.channel);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(getAllChannelsThunk());
      setLoaded(true);
    })();
  }, [dispatch, user, subscribed]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const channelsArray = Object.values(channels);

  const currentChannelNested = channelsArray.filter(
    (channel) => channel.id == channelId
  );
  const currentChannel = currentChannelNested[0];

  let createdAtDate;

  if (currentChannel != null) {
    const createdAtObject = currentChannel.created_at;
    const createdAtString = JSON.stringify(createdAtObject);
    const date = createdAtString.slice(5, 8);
    const month = createdAtString.slice(9, 12);
    const year = createdAtString.slice(13, 17);
    createdAtDate = `${month} ${date}, ${year}`;
  }

  const SubscribeButton = () => {
    if (
      currentChannel != null &&
      currentChannelNested.length >= 0 &&
      user != null
    ) {
      const subscribedState = currentChannel.subscribers.filter(
        (subscriber) => subscriber.user_id == user.id
      );
      if (subscribedState.length > 0) {
      }
      if (currentChannel.user_id != user.id) {
        return (
          <>
            {/* button that csubscribees and unsubscribes*/}
              <div
                className={subscribedState.length > 0 ? "ChannelSubscribeSectionButton": "ChannelunSubscribeSectionButton"}
                onClick={() =>
                  dispatch(createSubscriberThunk(currentChannel.id)).then(() =>
                    setSubscribed(!subscribed)
                  )
                }
              >
                {subscribedState.length > 0 ? (
                  <div className="SubscribedCSS">subscribed <div id="subscribedCheckMark">
                  <i class="fa-solid fa-check"></i>
                </div></div>
                ) : (
                  <div className="UnsubscribedCSS">subscribe</div>
                )}
              </div>
            {/* ) : (
              <div
                className="UserSectionButton"
                onClick={() =>
                  dispatch(createSubscriberThunk(currentChannel.id))
                }
              >
                Subscribe
              </div> */}
            {/* )} */}
          </>
        );
      } else
        return (
          <>
            <div
              className="UserSectionButton"
              onClick={() =>
                history.push({
                  pathname: `/users/${user.id}`,
                  state: { directedCategory: 4, uploadModalState: false },
                })
              }
            >
              Go to Channels
            </div>
          </>
        );
    } else
      return (
        <>
          <div
            className="UserSectionButton"
            onClick={() => history.push('/login')}
          >
            Sign in to subscribe
          </div>
        </>
      );
  };

  const UserInformation = () => {
    if (category == 1)
      return (
        <>
          <ChannelVideosSection currentChannel={currentChannel} />
        </>
      );
    if (category == 2)
      return (
        <>
          <CommunityChannels currentChannel={currentChannel} />
        </>
      );
    if (category == 3)
      return (
        <>
          <div className="UserAboutDetailsSectionOuter">
            <div className="UserAboutDetailsSection">
              <div className="UserAboutDetailsInnerSection">
                <div>Details</div>
                <div className="AboutUserDetailsText">{`Subscribers:    ${currentChannel.subscribers.length}`}</div>
              </div>
              <div className="UserAboutStatsInnerSection">
                <div className="AboutStatsUserInnerText">
                  <div>Stats</div>
                  <div className="AboutUserDetailsTextRight">{`Joined:    ${createdAtDate}`}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  };

  if (currentChannel != null) {
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
                src={currentChannel.banner_picture}
                alt="banner"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png";
                }}
              />
              <div className="WelcomeUserPage">
                {/* {currentChannel.channel_name} */}
              </div>
            </div>
            {/* navbar section */}
            <div className="UserPageNavBarSection">
              {/* upper section of the navbar */}
              <div className="UserPageNavBarUpper">
                <div className="ChannelDetailsNavBar">
                  <img
                    className="ChannelProfilePicNav"
                    src={currentChannel.profile_picture}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png";
                    }}
                  />
                  <div className="ChannelNameAndSubscriberSection">
                    <div className="ChannelNameNavBar">
                      {currentChannel.channel_name}
                    </div>
                    <div className="ChannelSubscriberCountNavBar">
                      {currentChannel.subscribers.length} subscribers
                    </div>
                  </div>
                </div>
                <div className="UserSectionButtonsNav">{SubscribeButton()}</div>
              </div>
              {/* bottom section of the navbar */}
              <div className="UserPageNavBarLower">
                <div
                  onClick={() => setCategory(1)}
                  className={
                    category == 1
                      ? "ActiveCategoryUserNav"
                      : "InactiveCategoryUserNav"
                  }
                >
                  Videos
                </div>
                <div
                  onClick={() => setCategory(2)}
                  className={
                    category == 2
                      ? "ActiveCategoryUserNav"
                      : "InactiveCategoryUserNav"
                  }
                >
                  Community
                </div>

                <div
                  onClick={() => setCategory(3)}
                  className={
                    category == 3
                      ? "ActiveCategoryUserNav"
                      : "InactiveCategoryUserNav"
                  }
                >
                  About
                </div>
              </div>
            </div>
            {/* info container  */}
            <div className="UserPageInfoContainer">{UserInformation()}</div>
          </div>
        </div>
      </>
    );
  }
  if (currentChannel == null && currentChannelNested.length <= 0) {
    return (
      <>
        <div>{history.push("/")}</div>
      </>
    );
  }
}
