import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../../store/session";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";

import EditVideoForm from './VideoForms/EditVideoForm';
import DeleteVideoForm from "./VideoForms/DeleteVideoForm";
import EditChannelForm from "../UserChannelSection/EditChannelForm";
import DeleteChannelForm from "../UserChannelSection/DeleteChannelForm";
// videos
import { updateUserThunk } from "../../../store/session";

import { getAllChannelsThunk } from "../../../store/channel";
import { useLocation } from "react-router-dom";

function UserVideoSection() {
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

  if (directedCategory != null && category != directedCategory && forceCategory == true) {
    setCategory(directedCategory)
    setShowModalCreateVideo(true)
    setForceCategory(false)
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
    }, [dispatch, showModal, showModalCreate, showModalEdit, showModalDelete]);

    useEffect(() => {
      dispatch(getAllChannelsThunk());
    }, [dispatch, showModal, showModalCreate, showModalEdit, showModalDelete]);

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
}

export default UserVideoSection
