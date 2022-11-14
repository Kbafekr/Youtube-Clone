// create three modes,
// 1 lists all recent videos and filters by channels,
// 2 displays all channels and lists every video inside a scrollable div
// 3 lists channels only

import "../Subscriptions.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../../store/video";
import { getAllChannelsThunk } from "../../../store/channel";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../../store/session";
import { amountViews } from "../../../Utils/Utils";
import { Link } from "react-router-dom";

import { getAllTagsThunk } from "../../../store/tags";
import { getAllLikesThunk } from "../../../store/likes";
import { getAllDisLikesThunk } from "../../../store/dislikes";

export function SubscriptionsVideosRow() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const tags = useSelector((state) => state.tags);
  const channels = useSelector((state) => state.channel);
  const [loaded, setLoaded] = useState(false);

  if (user == null) {
    history.push("/");
  }

  let videosArray;
  let channelsArray;
  let tagsArray;
  let userSubscriptionsArray;

  videosArray = Object.values(videos);
  channelsArray = Object.values(channels);
  tagsArray = Object.values(tags);
  userSubscriptionsArray = Object.values(user.subscriptions);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);

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
  let videoArrayCopy;
  let sortedVideosByNewest;

  if (videosArray) {
    videoArrayCopy = [...videosArray];
  }
  if (videoArrayCopy && videoArrayCopy.length > 0) {
    sortedVideosByNewest = videoArrayCopy.sort((a, b) => b.id - a.id);
  }

  // redefine starting array
  if (sortedVideosByNewest && sortedVideosByNewest.length > 0) {

      arrayResult = [...sortedVideosByNewest];
    }

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // create new variable to filter through tags based on keyword
  return (
    loaded &&  (
      <>
          <div className="homeContainerInnerList1">
              <div className="ChannelsMappedSubscriptionsPage">
                  {userSubscriptionsArray && userSubscriptionsArray.map((subscriptions) => {
                    return (
                        <>
                {arrayResult &&
                  arrayResult.map((video) => {
                    return (
                      <>
                        {video.channel_id == subscriptions.channel_id ?
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
                        :""}
                        </>
                        )
                      })}
                      </>
                    );
                  })}
              </div>
          </div>
      </>
    )
  );
}
