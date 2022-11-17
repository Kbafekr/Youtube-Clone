
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { updateUserThunk } from "../../store/session";
import { newChannelThunk } from "../../store/channel";
import { authenticate } from "../../store/session";
import { amountViews } from "../../Utils/Utils";
import logo from "../../icons/you2oobLogo.png";
import { Link } from "react-router-dom";

import { getAllTagsThunk } from "../../store/tags";
import { getAllLikesThunk } from "../../store/likes";
import { getAllDisLikesThunk } from "../../store/dislikes";

import { getWatchHistoryThunk } from "../../store/watchhistory";

export function HootubeMusic({ sidePanel, setNavBarType }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const tags = useSelector((state) => state.tags);
  const channels = useSelector((state) => state.channel);
  const [newChannelMade, setNewChannelMade] = useState(false);
  const [loaded, setLoaded] = useState(false);
  setNavBarType("Music");

  let videosArray;
  let channelsArray;
  let tagsArray;

  videosArray = Object.values(videos);
  channelsArray = Object.values(channels);
  tagsArray = Object.values(tags);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, newChannelMade, user]);

  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllLikesThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllDisLikesThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, [dispatch, user]);


  let arrayResult;

    arrayResult = [...videosArray];
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // create new variable to filter through tags based on keyword
  return (
    loaded && (
      <>
        <div
          className={
            sidePanel == true ? "homeContainer" : "homeContainerClosed"
          }
        >
          <div className="homeContainerInner">
            <div className="homeTagsBarContainer"></div>
              <div className="VideosMapped">
                {arrayResult &&
                  arrayResult.map((video) => {
                    return (
                      <>
                        <div className="VideoCardHome">
                          <div
                            className="VideoPreviewHome"
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
                                            history.push(`/videos/${video.id}`)
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
                                              {amountViews(video.video_views)}{" "}
                                              views
                                            </div>
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
                      </>
                    );
                  })}
              </div>
          </div>
        </div>
      </>
    )
  );
}
