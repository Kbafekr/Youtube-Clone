import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllVideosThunk } from "../../../store/video";
import { getAllChannelsThunk } from "../../../store/channel";
import { getAllPlaylistsThunk } from "../../../store/playlist";
import ReactPlayer from "react-player";
import { amountViews } from "../../../Utils/Utils";
import { Link } from "react-router-dom";
import "../LibraryPage.css";

export default function LibraryPlaylistsSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const channels = useSelector((state) => state.channel);
  const playlists = useSelector((state) => state.playlist);

  const channelsArray = Object.values(channels);
  const videosArray = Object.values(videos);
  const playlistArray = Object.values(playlists);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getAllPlaylistsThunk());
  }, [dispatch, user]);

  let userPlaylists;

  if (playlistArray != null) {
    userPlaylists = playlistArray.filter(
      (playlist) => playlist.user_id == user.id
    );
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
    {userPlaylists.length > 0 ? (
      <div className="UserChannelsDetailsSection">
        <div className="VideosMapped " id="mappedContainerLibrarySection">
          {userPlaylists &&
            userPlaylists.map((playlist) => {
              return (
                <div className="PlaylistCardContainerLibraryPage">
                  {playlist != null && playlist.playlist_videos[0] != null ? (
                    <div
                      className="PlaylistCardContainerLibraryPage"
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
                                <div className="PlaylistPreviewImageLibrary">
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
                      <div className="PlaylistNoVideosPreviewLibrary">
                        <img
                          className="PlaylistNoVideosPreviewLibrary"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Black_Box.png/1280px-Black_Box.png"
                          onClick={() =>
                            history.push(`/playlists/${playlist.id}`)
                          }
                        />
                        <div
                          className="NoVideosInPlaylistLibrarySection"
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
                        className="PlaylistDetailsLibraryTitle"
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
      ) : (
        <div className="LibraryTextErrorResults"> Save videos to playlists. Your playlists show up right here.</div>
      )}
    </>
  );
}
