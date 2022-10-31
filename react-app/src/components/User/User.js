import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/session";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./User.css";
import { Modal } from "../../context/Modal";
import EditUserForm from "./EditUserForm";
import CreateChannelForm from "./CreateChannelForm";
import EditChannelForm from "./EditChannelForm";
import DeleteChannelForm from "./DeleteChannelForm";
import { updateUserThunk } from "../../store/session";
import { getAllChannelsThunk } from "../../store/channel";
import { useLocation } from "react-router-dom";
function User({ sidePanel}) {
  const location = useLocation()
  // use location hook to open create video modal only once
  let uploadDataState;
  let directedCategory;
  let uploadModalState;
  if (location.state != null) {
    uploadDataState = location.state.uploadDataState
    directedCategory = uploadDataState.directedCategory
    uploadModalState = uploadDataState.uploadModalState
  }
  const [forceCategory, setForceCategory] = useState(true)

  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);

  const [category, setCategory] = useState(1);

  if (directedCategory != null && category != directedCategory && forceCategory == true) {
    setCategory(directedCategory)
    setForceCategory(false)
  }
// channels
  const [currentChannel, setCurrentChannel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
// channels


// videos
const [currentVideo, setCurrentVideo] = useState(false);
const [showModalVideo,, setShowModalVideo] = useState(false);
const [showModalCreateVideo, setShowModalCreateVideo] = useState(false);
const [showModalEditVideo, setShowModalEditVideo] = useState(false);
const [showModalDeleteVideo, setShowModalDeleteVideo] = useState(false);

// if (uploadModalState == true){
//   setShowModalCreateVideo(true)
// }
// videos


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
  }, [dispatch, showModal, showModalCreate, showModalEdit, showModalDelete]);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, showModal, showModalCreate, showModalEdit, showModalDelete]);

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
          <div className="UserSectionButton">Create Video</div>
        </>
      );
    if (category == 3)
      return (
        <>
          {/* button that changes depending on the category selected in bottom nav*/}
          <div className="UserSectionButton">Create Playlist</div>
        </>
      );
    if (category == 4)
      return (
        <>
          <div
            className="UserSectionButton"
            onClick={() => setShowModalCreate(true)}
          >
            Create Channel
            {showModalCreate && (
              <Modal onClose={() => setShowModalCreate(false)}>
                <CreateChannelForm setShowModal={setShowModalCreate} />
              </Modal>
            )}
          </div>
        </>
      );
    if (category == 5)
      return (
        <>
          <div className="UserSectionButton" onClick={() => setShowModal(true)}>
            Edit User Information
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <EditUserForm user={currentUser} setShowModal={setShowModal} />
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
          <div className="UserChannelsDetailsSectionOuter">
            <div className="UserChannelsDetailsSection">
              <div>
                {currentUser.channels.map((channel) => {
                  return (
                    <div className="ChannelArrayMappedSection">
                      <div
                        className="ChannelBannerChannelsSection"
                        key={channel.id}
                      >
                        <img
                          className="ChannelArrayProfilePic"
                          src={channel.profile_picture}
                        />
                        <img
                          className="ChannelArrayBanner"
                          src={channel.banner_picture}
                        />
                        <div className="ChannelArrayUsername">
                          {channel.channel_name}
                        </div>
                        {channel.id === currentUser.active_channel ? (
                          <div
                            id="activeChannelBanner"
                            className="UpdateActiveChannelBanner"
                          >
                            active
                            <div className="ActiveCircle" />
                          </div>
                        ) : (
                          <div
                            id="inactiveChannelBanner"
                            className="UpdateActiveChannelBanner"
                            onClick={() =>
                              dispatch(
                                updateUserThunk(
                                  userId,
                                  firstName,
                                  lastName,
                                  email,
                                  channel.id,
                                  password
                                )
                              )
                            }
                          >
                            Inactive
                            <div className="InActiveCircle" />
                          </div>
                        )}
                        {/* set inactive active toggle that dispatches edit user to set current active channel */}
                      </div>
                      <div className="EditDeleteChannelSection">
                        <div className="EditChannelFavicon">
                          {showModalEdit && (
                            <Modal onClose={() => setShowModalEdit(false)}>
                              <EditChannelForm
                                channel={currentChannel}
                                setShowModal={setShowModalEdit}
                              />
                            </Modal>
                          )}

                          <i
                            onClick={() => {
                              setShowModalEdit(true);
                              setCurrentChannel(channel);
                            }}
                            class="fa-solid fa-pen-to-square"
                          ></i>
                        </div>
                        <div className="EditChannelFavicon" id={currentUser.channels.length <= 1 ? "NoDeleteChannelsArray" : ""}>
                          {showModalDelete && currentUser.channels.length > 1 && (
                            <Modal onClose={() => setShowModalDelete(false)}>
                              <DeleteChannelForm
                                channel={currentChannel}
                                setShowModal={setShowModalDelete}
                              />
                            </Modal>
                          )}
                          <i
                            onClick={() => {
                              setShowModalDelete(true);
                              setCurrentChannel(channel);
                            }}
                            class="fa-sharp fa-solid fa-trash"
                          ></i>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="SortByFavicon">
                {/* sort by method with favicon */}
                Sort By
              </div>
            </div>
          </div>
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
