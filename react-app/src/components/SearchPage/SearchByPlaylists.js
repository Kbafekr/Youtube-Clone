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
import { getAllPlaylistsThunk } from "../../store/playlist";
import { Link } from "react-router-dom";
export function SearchPagePlaylists({ searchTerm, activeSort }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const tags = useSelector((state) => state.tags);
  const playlists = useSelector((state) => state.playlist);

  const channels = useSelector((state) => state.channel);
  const [newChannelMade, setNewChannelMade] = useState(false);
  const [tagClicked, setTagClicked] = useState("all");
  const [tagsFilter, setTagsFilter] = useState("");


  let videosArray;
  let channelsArray;
  let tagsArray;

  let videosFiltered;

  const playlistArray = Object.values(playlists);

  videosArray = Object.values(videos);
  channelsArray = Object.values(channels);
  tagsArray = Object.values(tags);

  if (videosArray) {
    videosFiltered = playlistArray.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const randomBackground = (backgroundNumber) => {
    if (backgroundNumber !== 0) {
      if (backgroundNumber == 1) {
        return "FirstPlaylistBackground";
      } else if (backgroundNumber == 2) {
        return "SecondPlaylistBackground";
      } else if (backgroundNumber == 3) {
        return "ThirdPlaylistBackground";
      } else if (backgroundNumber == 4) {
        return "FourthPlaylistBackground";
      } else if (backgroundNumber == 5) {
        return "FifthPlaylistBackground";
      } else if (backgroundNumber == 6) {
        return "SixthPlaylistBackground";
      } else if (backgroundNumber == 7) {
        return "SeventhPlaylistBackground";
      } else if (backgroundNumber == 8) {
        return "EigthPlaylistBackground";
      } else if (backgroundNumber == 9) {
        return "NinthPlaylistBackground";
      } else {
        return "TenthPlaylistBackground";
      }
    }
  };

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
        <div className="UserChannelsDetailsSectionOuterSearch">
        <div className="UserChannelsDetailsSectionSearch">
          <div className="PlaylistUserSectionMappedSearch">
            {arrayResult &&
              arrayResult.map((playlist) => {
                return (
                  <div
                    className="PlaylistCardContainerUserPage"
                    id={randomBackground(Math.ceil(Math.random() * 10))}
                  >
                    {playlist != null && playlist.playlist_videos[0] != null ? (
                      <div
                        className="PlaylistPreviewImage"
                        onClick={() =>
                          history.push(
                            `/playlists/${playlist.id}/${playlist.playlist_videos[0].video_id}`
                          )
                        }

                        //   onClick={() =>
                        //     history.push(
                        //       `/playlists/${playlist.id}/${playlist.playlist_videos[0].video_id}`
                        //     )
                        //   }
                      >
                        {videosArray &&
                          videosArray.map((video) => {
                            return (
                              <>
                                {video.id ==
                                playlist.playlist_videos[0].video_id ? (
                                  <div className="PlaylistPreviewImage">
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
                                        onClickPreview={false}
                                      />
                                    )}
                                    {/* <div className="backgroundImagePlaylistCard"> {video.video_url.includes("s3") ? (
                              <ReactPlayer
                                width="100%"
                                height="100%"
                                url={video.video_url}
                                playIcon={true}
                              />
                            ) : (
                              <div className="PlaylistPreviewImageBackground">
                                <ReactPlayer
                                  width="100%"
                                  height="100%"
                                  url={video.video_url}
                                  light={true}
                                  playIcon={true}
                                  onClickPreview={false}
                                />
                              </div>
                            )}</div> */}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                      </div>
                    ) : (
                      <>
                        <div className="PlaylistNoVideosPreview">
                          <img
                            className="PlaylistNoVideosPreview"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Black_Box.png/1280px-Black_Box.png"
                            onClick={() =>
                              history.push(`/playlists/${playlist.id}`)
                            }
                          />
                          <div
                            className="NoVideosInPlaylistUserSection"
                            onClick={() =>
                              history.push(`/playlists/${playlist.id}`)
                            }
                          >
                            No videos in playlist{" "}
                          </div>
                        </div>
                      </>
                    )}

                    <div className="PlaylistDetailsUserContainerCard">
                      <div
                        className="PlaylistDetailsUserSection"
                        key={playlist.id}
                      >
                        <Link
                          className="PlaylistDetailsUserTitle"
                          to={`/playlists/${playlist.id}`}
                        >
                          {playlist.title}
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      ) : (
        <div className="ErrorSearchResultsText"> No results found</div>
      )}
    </>
  );
}
