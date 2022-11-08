import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/session";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./User.css";
import { Modal } from "../../context/Modal";
import EditUserForm from "./EditUserForm";
// channels
import CreateChannelForm from "./UserChannelSection/CreateChannelForm";
// videos
import CreateVideoForm from "./UserVideoSection/VideoForms/CreateVideoForm";

// import uuid from 'react-uuid'


import { updateUserThunk } from "../../store/session";
import { getAllChannelsThunk } from "../../store/channel";
import { useLocation } from "react-router-dom";

import UserVideoSection from "./UserVideoSection/UserVideoSection";
import UserChannelSection from "./UserChannelSection/UserChannelSection";
function User({ sidePanel }) {
  const history = useHistory()
  const location = useLocation();
  // use location hook to open create video modal only once
  let uploadDataState;
  let directedCategory;
  let uploadModalState;
  if (location.state != null) {
    directedCategory = location.state.directedCategory;
    uploadModalState = location.state.uploadModalState;
  }
  const [forceCategory, setForceCategory] = useState(true);

  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);

  const [category, setCategory] = useState(1);

  // channels
  const [currentChannel, setCurrentChannel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  // channels

  // videos
  const [currentVideo, setCurrentVideo] = useState(false);
  const [showModalVideo, , setShowModalVideo] = useState(false);
  const [showModalCreateVideo, setShowModalCreateVideo] = useState(false);
  const [showModalEditVideo, setShowModalEditVideo] = useState(false);
  const [showModalDeleteVideo, setShowModalDeleteVideo] = useState(false);

  if (
    directedCategory == 2 &&
    category != directedCategory &&
    forceCategory == true
  ) {
    setCategory(directedCategory);
    setForceCategory(false);
    if (uploadModalState == true) {
      setShowModalCreateVideo(true);
    }
  }
  if (
    directedCategory == 4 &&
    category != directedCategory &&
    forceCategory == true
  ) {
    setCategory(directedCategory);
    setForceCategory(false);
    if (uploadModalState == true) {
      setShowModalCreate(true);
    }
  }
  if (
    directedCategory == 5 &&
    category != directedCategory &&
    forceCategory == true
  ) {
    setCategory(directedCategory);
    setForceCategory(false);
    if (uploadModalState == true) {
      setShowModal(true);
    }
  }
  let createdAtDate;
  if (currentUser.created_at) {
    const createdAtObject = currentUser.created_at;
    const createdAtString = JSON.stringify(createdAtObject);
    const date = createdAtString.slice(5, 8);
    const month = createdAtString.slice(9, 12);
    const year = createdAtString.slice(13, 17);
    createdAtDate = `${month} ${date}, ${year}`;
  }

  const firstName = currentUser.first_name;
  const lastName = currentUser.last_name;
  const email =
    "fsdaiufgh3w9832f23wkjqfhwejkfasdbff9843wqeyrwdjkafhsdf@gmail.com";
  const password = "password";

  let activeChannel;
  // define active channel
  if (currentUser.channels) {
    activeChannel = currentUser.channels.filter(
      (channel) => channel.id == currentUser.active_channel
    );
  }
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
    })();
  }, [
    dispatch,
    showModal,
    showModalCreate,
    showModalEdit,
    showModalDelete,
    showModalCreateVideo,
  ]);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [
    dispatch,
    showModal,
    showModalCreate,
    showModalEdit,
    showModalDelete,
    showModalCreateVideo,
  ]);

if (userId != currentUser.id) {
  history.push('/')
}

  const ButtonChange = () => {
    if (category == 1)
      return (
        <>

        </>
      );
    if (category == 2)
      return (
        <>
          {/* button that changes depending on the category selected in bottom nav*/}
          {showModalCreateVideo && (
            <Modal onClose={() => setShowModalCreateVideo(false)}>
              <CreateVideoForm setShowModal={setShowModalCreateVideo} />
            </Modal>
          )}
          <div
            className="UserSectionButton"
            onClick={() => setShowModalCreateVideo(true)}
          >
            Create Video
          </div>
        </>
      );
    if (category == 4)
      return (
        <>
          {showModalCreate && (
            // <Modal onClose={() => setShowModalCreate(false)}>
            <Modal onClose={() => setShowModalCreate(false)}>
              <CreateChannelForm setShowModal={setShowModalCreate} />
            </Modal>
          )}
          <div
            className="UserSectionButton"
            onClick={() => setShowModalCreate(true)}
          >
            Create Channel
          </div>
        </>
      );
    if (category == 5)
      return (
        <>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <EditUserForm user={currentUser} setShowModal={setShowModal} />
              </Modal>
            )}
          <div className="UserSectionButton" onClick={() => setShowModal(true)}>
            Edit User Information
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
          <UserVideoSection />
        </>
      );
    if (category == 4)
      return (
        <>
          <UserChannelSection />
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
                onError={e => { e.currentTarget.src = "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png"; }}
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
                    onError={e => { e.currentTarget.src = "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png"; }}
                  />
                  <div className="ChannelNameAndSubscriberSection">
                    <div className="ChannelNameNavBar">
                      {activeChannel[0].channel_name}
                    </div>
                    <div className="ChannelSubscriberCountNavBar">
                      {activeChannel[0].subscribers.length} subscribers
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
