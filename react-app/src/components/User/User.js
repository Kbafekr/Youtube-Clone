import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/session";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./User.css";
import { Modal } from "../../context/Modal";
import EditUserForm from "./EditUserForm";

function User({ sidePanel }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);

  const [category, setCategory] = useState(1);
  const [showModal, setShowModal] = useState(false);
  let createdAtDate;
  if (currentUser.created_at) {
    const createdAtObject = currentUser.created_at;
    const createdAtString = JSON.stringify(createdAtObject);
    const date = createdAtString.slice(5, 8);
    const month = createdAtString.slice(9, 12);
    const year = createdAtString.slice(13, 17);
    createdAtDate = `${month} ${date}, ${year}`;
  }

  let activeChannel;
  // define active channel
  if (currentUser.channels) {
    activeChannel = currentUser.channels.filter(
      (channel) => channel.id == currentUser.active_channel
    );
  }
  console.log(activeChannel);
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
    })();
  }, [dispatch, showModal]);

  const ButtonChange = () => {
    if (category == 1)
      return (
        <>
          <div>Welcome Home</div>
        </>
      );
    if (category == 2)
      return (
        <>
          {/* button that changes depending on the category selected in bottom nav*/}
          <div className="UserSectionButton">Manage Videos</div>
        </>
      );
    if (category == 3)
      return (
        <>
           {/* button that changes depending on the category selected in bottom nav*/}
           <div className="UserSectionButton">Manage Playlists</div>
        </>
      );
    if (category == 4)
      return (
        <>
          <div className="UserSectionButton">
            {/* dropdown that on selecting of channel dispaches edit user changing active channel id. */}
            Create Channel
          </div>
        </>
      );
    if (category == 5)
      return (
        <>
          <div
                  className="UserSectionButton"
                  onClick={() => setShowModal(true)}
                >
                  Edit User Information
                  {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                      <EditUserForm
                        user={currentUser}
                        setShowModal={setShowModal}
                      />
                    </Modal>
                  )}
                </div>
        </>
      );
  };

  const UserInformation = () => {
    if (category == 1)
      return (
        <>
          <div>Welcome Home</div>
        </>
      );
    if (category == 2)
      return (
        <>
          <div>All Channel Videos</div>
        </>
      );
    if (category == 3)
      return (
        <>
          <div>All Your Playlists</div>
        </>
      );
    if (category == 4)
      return (
        <>
          <div>All Your Channels</div>
        </>
      );
    if (category == 5)
      return (
        <>
          <div className="UserAboutDetailsSectionOuter">
            <div className="UserAboutDetailsSection">
              <div className="UserAboutDetailsInnerSection">
                <div>Details</div>
                <div className="AboutUserDetailsText">{`Name:    ${currentUser.first_name} ${currentUser.last_name}`}</div>
                <div className="AboutUserDetailsText">{`Email:    ${currentUser.email}`}</div>
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
                src={activeChannel[0].banner_picture}
                alt="banner"
              />
              <div className="WelcomeUserPage">
                Hey {currentUser.first_name}
              </div>
            </div>
            {/* navbar section */}
            <div className="UserPageNavBarSection">
              {/* upper section of the navbar */}
              <div className="UserPageNavBarUpper">
                <div className="ChannelDetailsNavBar">
                  <img
                    className="ChannelProfilePicNav"
                    src={activeChannel[0].profile_picture}
                  />
                  <div className="ChannelNameAndSubscriberSection">
                    <div className="ChannelNameNavBar">
                      {activeChannel[0].channel_name}
                    </div>
                    <div className="ChannelSubscriberCountNavBar">
                      0 subscribers
                    </div>
                  </div>
                </div>
                <div className="UserSectionButtonsNav">{ButtonChange()}</div>
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
                  Home
                </div>
                <div
                  onClick={() => setCategory(2)}
                  className={
                    category == 2
                      ? "ActiveCategoryUserNav"
                      : "InactiveCategoryUserNav"
                  }
                >
                  Videos
                </div>
                <div
                  onClick={() => setCategory(3)}
                  className={
                    category == 3
                      ? "ActiveCategoryUserNav"
                      : "InactiveCategoryUserNav"
                  }
                >
                  Playlists
                </div>
                <div
                  onClick={() => setCategory(4)}
                  className={
                    category == 4
                      ? "ActiveCategoryUserNav"
                      : "InactiveCategoryUserNav"
                  }
                >
                  Channels
                </div>
                <div
                  onClick={() => setCategory(5)}
                  className={
                    category == 5
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
