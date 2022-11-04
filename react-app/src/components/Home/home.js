import "./home.css";
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

import { getAllTagsThunk } from "../../store/tags";
import { getAllLikesThunk } from "../../store/likes";
import { getAllDisLikesThunk } from "../../store/dislikes";

export function HomePage({ sidePanel }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const tags = useSelector((state) => state.tags);
  const channels = useSelector((state) => state.channel);
  const [newChannelMade, setNewChannelMade] = useState(false);
  const [tagClicked, setTagClicked] = useState("All");
  const [tagsFilter, setTagsFilter] = useState("");
  const [loaded, setLoaded] = useState(false);

  const email =
    "fsdaiufgh3w9832f23wkjqfhwejkfasdbff9843wqeyrwdjkafhsdf@gmail.com";
  const password = "password";

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

  useEffect(() => {
    if (user && channelsArray) {
      const userChannels = channelsArray.filter(
        (channel) => channel.user_id == user.id
      );
      if (
        user.active_channel == null &&
        user.channels[0] != null &&
        channelsArray != null
      ) {
        dispatch(
          updateUserThunk(
            user.id,
            user.first_name,
            user.last_name,
            email,
            user.channels[0].id,
            password
          )
        );
      }
      if (
        user.channels.length < 1 &&
        userChannels.length < 1 &&
        channelsArray != null &&
        newChannelMade == false
      ) {
        let channelName = `${user.first_name} ${user.last_name}`;
        setNewChannelMade(true);
        dispatch(newChannelThunk(channelName, user.id, "", ""))
          .then(() => setNewChannelMade(true))
          .then(() => dispatch(getAllChannelsThunk()))
          .then(() => dispatch(authenticate()));
      }
    }
  }, [dispatch, channelsArray, user]);

  let arrayResult;
  let videoArrayCopy;
  let sortedVideosByNewest;
  let filteredTags;

  if (videosArray) {
    videoArrayCopy = [...videosArray];
  }
  if (videoArrayCopy && videoArrayCopy.length > 0) {
    sortedVideosByNewest = videoArrayCopy.sort((a, b) => b.id - a.id);
  }
  if (tagsArray && tagsFilter) {
    filteredTags = tagsArray.filter((tag) =>
      tag.body.toLowerCase().includes(tagsFilter.toLowerCase())
    );
  }

  // redefine starting array
  if (tagClicked == "New") {
    arrayResult = [...sortedVideosByNewest];
  } else {
    arrayResult = [...videosArray];
  }
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
              <div className="homeTagsBarContainer">
                <div className="homeTagsBar">
                  <div
                    className={
                      tagClicked == "All" ? "tagHomePageActive" : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("All");
                      setTagsFilter("");
                    }}
                  >
                    All
                  </div>
                  <div
                    className={
                      tagClicked == "New"
                        ? "NewtagHomePageActive"
                        : "newToYouTag"
                    }
                    onClick={() => {
                      setTagClicked("New");
                      setTagsFilter("");
                    }}
                  >
                    New to you
                  </div>
                  <div
                    className={
                      tagClicked == "Gaming"
                        ? "tagHomePageActive"
                        : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Gaming");
                      setTagsFilter("Gaming");
                    }}
                  >
                    Gaming
                  </div>
                  <div
                    className={
                      tagClicked == "Music"
                        ? "tagHomePageActive"
                        : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Music");
                      setTagsFilter("Music");
                    }}
                  >
                    Music
                  </div>
                  <div
                    className={
                      tagClicked == "Sports"
                        ? "tagHomePageActive"
                        : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Sports");
                      setTagsFilter("Sports");
                    }}
                  >
                    Sports
                  </div>
                  <div
                    className={
                      tagClicked == "Nature"
                        ? "tagHomePageActive"
                        : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Nature");
                      setTagsFilter("Nature");
                    }}
                  >
                    Nature
                  </div>
                  <div
                    className={
                      tagClicked == "Superheroes"
                        ? "tagHomePageActive"
                        : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Superheroes");
                      setTagsFilter("Superheroes");
                    }}
                  >
                    Superheroes
                  </div>
                  <div
                    className={
                      tagClicked == "Anime"
                        ? "tagHomePageActive"
                        : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Anime");
                      setTagsFilter("Anime");
                    }}
                  >
                    Anime
                  </div>
                  <div
                    className={
                      tagClicked == "Programming"
                        ? "tagHomePageActive"
                        : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Programming");
                      setTagsFilter("Programming");
                    }}
                  >
                    Programming
                  </div>
                  <div
                    className={
                      tagClicked == "News" ? "tagHomePageActive" : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("News");
                      setTagsFilter("News");
                    }}
                  >
                    News
                  </div>
                  <div
                    className={
                      tagClicked == "Podcasts"
                        ? "tagHomePageActive"
                        : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Podcasts");
                      setTagsFilter("Podcasts");
                    }}
                  >
                    Podcasts
                  </div>
                  <div
                    className={
                      tagClicked == "Food" ? "tagHomePageActive" : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("Food");
                      setTagsFilter("Food");
                    }}
                  >
                    Food
                  </div>
                  <div
                    className={
                      tagClicked == "TV" ? "tagHomePageActive" : "tagHomePage"
                    }
                    onClick={() => {
                      setTagClicked("TV");
                      setTagsFilter("TV");
                    }}
                  >
                    TV
                  </div>
                </div>
              </div>
              {filteredTags != null ? (
                <div className="VideosMapped">
                  {arrayResult &&
                    arrayResult.map((video) => {
                      return (
                        <>
                          {filteredTags &&
                            filteredTags.map((tags) => {
                              return (
                                <>
                                  {video.id == tags.video_id ? (
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
                                              {channel.id ==
                                              video.channel_id ? (
                                                <div className="HomeVideoCardBottomSection">
                                                  <div className="profileImageHomeVideoArray">
                                                    <img
                                                      className="channelPictureHomeArray"
                                                      alt="channel"
                                                      src={
                                                        channel.profile_picture
                                                      }
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
                                                        <div>
                                                          {channel.channel_name}
                                                        </div>
                                                        <div id="verifiedCheckMark">
                                                          <i class="fa-solid fa-check"></i>
                                                        </div>
                                                      </div>
                                                      <div
                                                        className="flexRow"
                                                        id="homeArrayChannelViews"
                                                      >
                                                        <div>
                                                          {amountViews()}
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
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                </div>
              ) : (
                <div className="VideosMapped">
                  {arrayResult &&
                    arrayResult.map((video) => {
                      return (
                        <>
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
                        </>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </>
      )
    );
}
