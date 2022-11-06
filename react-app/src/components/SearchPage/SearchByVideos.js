import "./SearchPage.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { amountViews } from "../../Utils/Utils";
import { getAllTagsThunk } from "../../store/tags";
import { getAllLikesThunk } from "../../store/likes";
import { getAllDisLikesThunk } from "../../store/dislikes";
import { Link } from "react-router-dom";
export function SearchPageVideos({ searchTerm, activeSort }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const tags = useSelector((state) => state.tags);
  const channels = useSelector((state) => state.channel);
  const [newChannelMade, setNewChannelMade] = useState(false);
  const [tagClicked, setTagClicked] = useState("all");
  const [tagsFilter, setTagsFilter] = useState("");

  let videosArray;
  let channelsArray;
  let tagsArray;

  let videosFiltered;

  videosArray = Object.values(videos);
  channelsArray = Object.values(channels);
  tagsArray = Object.values(tags);

  if (videosArray) {
    videosFiltered = videosArray.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

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
  let videoArrayCopy;
  let sortedVideosByNewest;

  if (videosFiltered != null) {
    videoArrayCopy = [...videosFiltered];
  }
  if (videoArrayCopy && videoArrayCopy.length > 0 && videosFiltered != null) {
    sortedVideosByNewest = videoArrayCopy.sort((a, b) => b.id - a.id);
  }
  if (activeSort == "Newest"  && sortedVideosByNewest != null) {
    arrayResult = [...sortedVideosByNewest];
  } else {
    arrayResult = [...videosFiltered];
  }

  return (
    <>
      {arrayResult.length > 0 ? (
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
                                      <div>{amountViews(video.video_views)} views</div>
                                      <div className="CircleDiv" />
                                      <div>{video.created_at.slice(0, 16)}</div>
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
      ) : (
        <div className="ErrorSearchResultsText"> No results found</div>
      )}
    </>
  );
}
