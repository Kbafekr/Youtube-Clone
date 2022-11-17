import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllVideosThunk } from "../../../store/video";
import { getAllChannelsThunk } from "../../../store/channel";
import { getWatchHistoryThunk } from "../../../store/watchhistory";
import ReactPlayer from "react-player";
import { amountViews } from "../../../Utils/Utils";
import { Link } from "react-router-dom";
import "../LibraryPage.css";

export default function LibraryHistorySection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const channels = useSelector((state) => state.channel);
  const watchhistory = useSelector((state) => state.watchhistory);

  const channelsArray = Object.values(channels);
  const videosArray = Object.values(videos);
  const watchhistoryArray = Object.values(watchhistory);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);
  useEffect(() => {
    if (user) {
      dispatch(getWatchHistoryThunk(user.id));
    }
  }, [dispatch, user]);

  let userwatchhistoryUnsorted;
  let userwatchhistory;

  if (watchhistoryArray != null && user != null) {
    userwatchhistoryUnsorted = watchhistoryArray.filter(
      (likes) => likes.user_id == user.id
    );
  }
  if (user != null && userwatchhistoryUnsorted != null) {
    userwatchhistory = userwatchhistoryUnsorted.sort((a, b) => b.id - a.id);
  }

  if (!user) {
    return (
      <>
        <div>{history.push("/")}</div>
      </>
    );
  }

  return (
    <>
      {userwatchhistoryUnsorted.length > 0 ? (
        <div className="VideosMapped" id="mappedContainerLibrarySection">
          {userwatchhistory &&
            userwatchhistory.map((watchhistory) => {
              return (
                <>
                    {videosArray &&
                      videosArray.map((video) => {
                        return (
                          <>
                          {watchhistory.video_id == video.id ?
                            <div className="VideoCardHome">
                              <div
                                className="VideoPreviewHome"
                                onClick={() =>
                                  history.push(`/videos/${video.id}`)
                                }
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
                              {channelsArray &&
                                channelsArray.map((channel) => {
                                  return (
                                    <>
                                      {channel.id == video.channel_id ? (
                                        <div className="HomeVideoCardBottomSection">
                                          <div className="profileImageHomeVideoArray">
                                            <img
                                              className="channelPictureHomeArray"
                                              alt="channel"
                                              src={channel.profile_picture}
                                            />
                                          </div>
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
                                                <Link
                                                  className="PlayVideoChannelName"
                                                  to={`/channels/${channel.id}`}
                                                >
                                                  {channel.channel_name}
                                                </Link>
                                                <div id="verifiedCheckMark">
                                                  <i class="fa-solid fa-check"></i>
                                                </div>
                                              </div>
                                              <div
                                                className="flexRow"
                                                id="homeArrayChannelViews"
                                              >
                                                <div>
                                                  {amountViews(
                                                    video.video_views
                                                  )}{" "}
                                                  views
                                                </div>
                                                <div className="CircleDiv" />
                                                <div>
                                                  {video.created_at.slice(
                                                    0,
                                                    16
                                                  )}
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
                            :""}
                          </>
                        );
                      })}
                </>
              );
            })}
        </div>
      ) : (
        <div className="LibraryTextErrorResults"> No videos watched. Watch something and it will show up right here.</div>
      )}
    </>
  );
}
