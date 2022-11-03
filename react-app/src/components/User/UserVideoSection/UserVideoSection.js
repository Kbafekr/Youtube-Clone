import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../../store/session";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import ReactPlayer from "react-player";
import "./UserVideoSection.css";
import logo from "../../../icons/you2oobLogo.png";
import EditVideoForm from "./VideoForms/EditVideoForm";
import DeleteVideoForm from "./VideoForms/DeleteVideoForm";
import TagsVideos from "./TagsSection/TagsVideos";

// videos

import { getAllChannelsThunk } from "../../../store/channel";

function UserVideoSection() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);

  // videos
  const [currentVideo, setCurrentVideo] = useState(false);
  const [showModalVideo, , setShowModalVideo] = useState(false);
  const [showModalCreateVideo, setShowModalCreateVideo] = useState(false);
  const [showModalEditVideo, setShowModalEditVideo] = useState(false);
  const [showModalDeleteVideo, setShowModalDeleteVideo] = useState(false);

  //   change into function that returns video creation date
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
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
    })();
  }, [
    dispatch,
    showModalVideo,
    showModalCreateVideo,
    showModalEditVideo,
    showModalDeleteVideo,
  ]);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [
    dispatch,
    showModalVideo,
    showModalCreateVideo,
    showModalEditVideo,
    showModalDeleteVideo,
  ]);

  return (
    <>
      <div className="UserChannelsDetailsSectionOuter">
        <div className="UserChannelsDetailsSection">
          <div id="ManageVideosArraySection">
            {activeChannel[0].videos.map((video) => {
              return (
                <>
                  <div className="VideosArrayUserContainer">
                    <div className="EditDeleteChannelSection">
                      <div className="EditChannelFavicon">
                        {showModalEditVideo && (
                          <Modal onClose={() => setShowModalEditVideo(false)}>
                            <EditVideoForm
                              video={currentVideo}
                              setShowModal={setShowModalEditVideo}
                            />
                          </Modal>
                        )}

                        <i
                          onClick={() => {
                            setShowModalEditVideo(true);
                            setCurrentVideo(video);
                          }}
                          class="fa-solid fa-pen-to-square"
                        ></i>
                      </div>
                      <div
                        className="EditChannelFavicon"
                        id={
                          currentUser.channels.length <= 1
                            ? "NoDeleteChannelsArray"
                            : ""
                        }
                      >
                        {showModalDeleteVideo &&
                          currentUser.channels.length > 1 && (
                            <Modal
                              onClose={() => setShowModalDeleteVideo(false)}
                            >
                              <DeleteVideoForm
                                video={currentVideo}
                                setShowModal={setShowModalDeleteVideo}
                              />
                            </Modal>
                          )}
                        <i
                          onClick={() => {
                            setShowModalDeleteVideo(true);
                            setCurrentVideo(video);
                          }}
                          class="fa-sharp fa-solid fa-trash"
                        ></i>
                      </div>
                    </div>
                    <div className="VideoCardProfileManage" id="ManageVideosArrayProfile">
                      <div
                        className="VideoCardProfileManagePreview"
                        onClick={() => history.push(`/videos/${video.id}`)}
                      >
                        {video.video_url.includes("s3") ? (
                          <ReactPlayer
                            width="100%"
                            height="100%"
                            url={video.video_url}
                            playIcon={true}
                          />
                        ) : (
                          <ReactPlayer
                            width="100%"
                            height="100%"
                            url={video.video_url}
                            playIcon={true}
                            light={true}
                            showPreview
                          />
                        )}
                      </div>
                      <div className="VideoTitleCardManageProfile" onClick={() => history.push(`/videos/${video.id}`)}>{video.title}</div>
                      <div className="VideoDescriptionCardManage">{video.description}</div>
                    </div>
                    <TagsVideos video={video}/>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserVideoSection;
