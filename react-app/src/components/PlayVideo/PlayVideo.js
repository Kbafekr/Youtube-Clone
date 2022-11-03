import "./PlayVideo.css";

import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk, getOneVideoThunk } from "../../store/video";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { amountViews } from "../../Utils/Utils";
import logo from "../../icons/you2oobLogo.png";
import { getAllChannelsThunk } from "../../store/channel";

import { CommentsSection } from "./CommentsSection/Comments";
import LikesDislikes from "./Likes&Dislikes/LikesDislikes";

export function VideoPage({ sidePanel }) {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);

  const videos = useSelector((state) => state.video);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);

  useEffect(() => {
    (async () => {
      await dispatch(getAllVideosThunk());
      setLoaded(true);
    })();
  }, [dispatch, user]);

  if (!loaded) {
    return null;
  }
  let videosArray;
  let channelsArray;
  videosArray = Object.values(videos);
  channelsArray = Object.values(channels);

  let filteredVideo;
  let notVideoArray;

  if (videosArray && videoId) {
    filteredVideo = videosArray.filter((videos) => videos.id == videoId);
  }
  if (videosArray && videoId) {
    notVideoArray = videosArray.filter((videos) => videos.id != videoId);
  }

  if (filteredVideo[0] && loaded) {
    return (
      <>
        <div
          className={
            sidePanel == true ? "homeContainer" : "homeContainerClosed"
          }
        >
          <div className="VideoSingleOuterContainer">
            <div className="SingleVideoContainer">
              <div className="VideoPreviewDetails">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={filteredVideo[0].video_url}
                  playing={true}
                  controls={true}
                />
              </div>
              <div className="VideoDetailsTitleCard">
                <div className="VideoDetailsTitle">
                  {filteredVideo[0].title}
                </div>
                {channelsArray &&
                  channelsArray.map((channel) => {
                    return (
                      <>
                        {channel.id == filteredVideo[0].channel_id ? (
                          <div className="VideoDetailsContainerSection">
                            <div className="profileImageHomeVideoArray">
                              <img
                                className="channelPictureHomeArray"
                                alt="channel"
                                src={channel.profile_picture}
                              />
                            </div>
                            <div className="HomeVideoArrayChannelDetails">
                              <div
                                className="flexColumn"
                                id="homeArrayChannelDetails"
                              >
                                <div
                                  className="flexRow"
                                  id="ChannelNameHomeArray"
                                >
                                  <div>{channel.channel_name}</div>
                                  <div id="verifiedCheckMark">
                                    <i class="fa-solid fa-check"></i>
                                  </div>
                                </div>
                                <div
                                  className="flexRow"
                                  id="homeArrayChannelViews"
                                >
                                  <div>{amountViews()}</div>
                                  <div className="CircleDiv" />
                                  <div>{channel.created_at.slice(0, 16)}</div>
                                </div>
                              </div>
                            </div>
                            <div className="SubscribeAndBellSection">
                              <div className="subscribeButtonContainer">
                                <div className="SubscribeButton">
                                  Subscribed
                                </div>
                              </div>

                              <div className="notificationBellVideoPlay">
                                {/* <i class="fa-solid fa-bell"></i> */}
                              </div>
                            </div>

                            <LikesDislikes />
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                <div className="VideoDetailsDescriptionSection">
                  {filteredVideo[0].description}
                </div>
              </div>
              <div className="VideoDetailsCommentsSection">
                <CommentsSection />
              </div>
            </div>

            <div className="RightSideVideoDetailsSection">
              <div className="RecommendedArraySection">
                {notVideoArray &&
                  notVideoArray.map((video) => {
                    return (
                      <>
                        <div
                          className="VideoCardRecommended"
                          onClick={() => history.push(`/videos/${video.id}`)}
                        >
                          <div
                            className="RecommendedVideoPreview"
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
                                light={true}
                                playIcon={true}
                              />
                            )}
                          </div>
                          <div className="RecommendedVideoDetailsSection">
                            {channelsArray &&
                              channelsArray.map((channel) => {
                                return (
                                  <>
                                    {channel.id == video.channel_id ? (
                                      <div className="HomeVideoCardBottomSection">
                                        <div className="HomeVideoArrayChannelDetails">
                                          <div
                                            className="VideoTitleCard"
                                            onClick={() =>
                                              history.push(
                                                `/videos/${video.id}`
                                              )
                                            }
                                          >
                                            {video.title}
                                          </div>
                                          <div
                                            className="flexColumn"
                                            id="homeArrayChannelDetails"
                                          >
                                            <div
                                              className="flexRow"
                                              id="ChannelNameHomeArray"
                                            >
                                              <div>{channel.channel_name}</div>
                                              <div id="verifiedCheckMark">
                                                <i class="fa-solid fa-check"></i>
                                              </div>
                                            </div>
                                            <div
                                              className="flexRow"
                                              id="homeArrayChannelViews"
                                            >
                                              <div>{amountViews()}</div>
                                              <div className="CircleDiv" />
                                              <div>
                                                {video.created_at.slice(0, 16)}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (!filteredVideo[0] && loaded) {
    return (
      <>
        <div>{history.push("/")}</div>
      </>
    );
  }
}
