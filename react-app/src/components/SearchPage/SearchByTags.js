import "./SearchPage";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { amountViews } from "../../Utils/Utils";

import { useDispatch } from "react-redux";
import {useHistory } from "react-router-dom";
import { getAllTagsThunk } from "../../store/tags";
import { getAllLikesThunk } from "../../store/likes";
import { getAllDisLikesThunk } from "../../store/dislikes";

export function SearchPageTags({searchTerm, activeSort}) {
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

  let FilteredTags;

  let counterObject = {};
  let tagsFiltered = [];

  videosArray = Object.values(videos);
  channelsArray = Object.values(channels);
  tagsArray = Object.values(tags);

  if (tagsArray) {
    FilteredTags = tagsArray.filter((tag) =>
    tag.body.toLowerCase().includes(searchTerm.toLowerCase()) )
  }

//   loop through filtered array and remove duplicates
// access the videoId key in each filtered tag
 for (let i = 0; i < FilteredTags.length; i++) {
    let tag = FilteredTags[i]
    // if none, set to true to prevent duplicates
    if (!counterObject[FilteredTags[i]["video_id"]]) {
        counterObject[FilteredTags[i]["video_id"]] = true;
        tagsFiltered.push(tag)
    }
 }

  let tagResults;
  let tagArrayCopy;
  let sortTagsbyNewest;

  if (tagsFiltered != null) {
    tagArrayCopy = [...tagsFiltered];
  }
  if (tagArrayCopy && tagArrayCopy.length > 0) {
    sortTagsbyNewest = tagArrayCopy.sort((a, b) => b.id - a.id);
  }
  if (activeSort == "Newest") {
    tagResults = [...sortTagsbyNewest];
  } else {
    tagResults = [...tagsFiltered];
  }
  console.log(tagResults)


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


  // create new variable to filter through tags based on keyword
  return (
    <>
        <div className="homeContainerInner">
            <div className="VideosMapped">
              {videosArray &&
                videosArray.map((video) => {
                  return (
                    <>
                      {tagResults &&
                        tagResults.map((tags) => {
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
                                                    <div>{amountViews()}</div>
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
        </div>
    </>
  );
}
