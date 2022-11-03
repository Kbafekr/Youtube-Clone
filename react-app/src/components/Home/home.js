import "./home.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUserThunk } from "../../store/session";
import { newChannelThunk } from "../../store/channel";
import { authenticate } from "../../store/session";
import { amountViews } from "../../Utils/Utils";
import logo from "../../icons/you2oobLogo.png";

import { getAllTagsThunk } from "../../store/tags";
import {getAllLikesThunk} from '../../store/likes'
import {getAllDisLikesThunk} from '../../store/dislikes'

export function HomePage({ sidePanel }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const tags = useSelector((state) => state.tags);
  const channels = useSelector((state) => state.channel);
  const [newChannelMade, setNewChannelMade] = useState(false);
  const [tagsFilter, setTagsFilter] = useState("all")

  const email =
    "fsdaiufgh3w9832f23wkjqfhwejkfasdbff9843wqeyrwdjkafhsdf@gmail.com";
  const password = "password";

  let videosArray;
  let channelsArray;
  let tagsArray;

  videosArray = Object.values(videos);
  channelsArray = Object.values(channels);
  tagsArray = Object.values(tags)

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

  if (videosArray) {
    videoArrayCopy = [...videosArray]
  }
  if (videoArrayCopy && videoArrayCopy.length > 0) {
    sortedVideosByNewest = videoArrayCopy.sort((a, b) => b.id - a.id);
  }

  if (tagsFilter == "New") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "Gaming") {
    let filteredTags = tagsArray.filter((tag) => tag.videoId)
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "Music") {
    arrayResult = videosArray.filter((video) => video.tags)
  }
  else if (tagsFilter == "Sports") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "Nature") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "Superheroes") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "Anime") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "Programming") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "News") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "Podcasts") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "Food") {
    arrayResult = [...sortedVideosByNewest]
  }
  else if (tagsFilter == "TV") {
    arrayResult = [...sortedVideosByNewest]
  }
  else {
    arrayResult = [...videosArray]
  }
  return (
    <>
      <div
        className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}
      >
        <div className="homeContainerInner">
          <div className="homeTagsBarContainer">
            <div className="homeTagsBar">
              <div className={tagsFilter == "All" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("All")}>All</div>
              <div className={tagsFilter == "New" ? "NewtagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("New")}>New to you</div>
              <div className={tagsFilter == "Gaming" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Gaming")}>Gaming</div>
              <div className={tagsFilter == "Music" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Music")}>Music</div>
              <div className={tagsFilter == "Sports" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Sports")}>Sports</div>
              <div className={tagsFilter == "Nature" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Nature")}>Nature</div>
              <div className={tagsFilter == "Superheroes" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Superheroes")}>Superheroes</div>
              <div className={tagsFilter == "Anime" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Anime")}>Anime</div>
              <div className={tagsFilter == "Programming" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Programming")}>Programming</div>
              <div className={tagsFilter == "News" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("News")}>News</div>
              <div className={tagsFilter == "Podcasts" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Podcasts")}>Podcasts</div>
              <div className={tagsFilter == "Food" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("Food")}>Food</div>
              <div className={tagsFilter == "TV" ? "tagHomePageActive" : "tagHomePage"} onClick={() => setTagsFilter("TV")}>TV</div>
            </div>
          </div>
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
                        {video.video_url.includes('s3') ?
                        ( <ReactPlayer
                          width="100%"
                          height="100%"
                          url={video.video_url}
                          playIcon={true}

                        />) :
                        <ReactPlayer
                          width="100%"
                          height="100%"
                          url={video.video_url}
                          light={true}
                          playIcon={true}
                        /> }
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
                                    <div className="VideoTitleCard" onClick={() => history.push(`/videos/${video.id}`)}>
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
                                        <div>{video.created_at.slice(0,16)}</div>
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
  );
}
