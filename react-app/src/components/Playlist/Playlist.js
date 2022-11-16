import "./Playlist.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { getAllPlaylistsThunk } from "../../store/playlist";
import { updatePlaylistThunk } from "../../store/playlist";
import DeletePlaylistVideoForm from "./RemoveVideoFromPlaylist";
import EditPlaylistForm from "./EditPlaylistForm";
import { Modal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { amountViews } from "../../Utils/Utils";
import { Link } from "react-router-dom";
export function PlaylistPage({ sidePanel }) {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const channels = useSelector((state) => state.channel);
  const playlist = useSelector((state) => state.playlist);

  const [currentPlaylist, setCurrentPlaylist] = useState(false);
  const [showModalRemoveVideo, setShowModalRemoveVideo] = useState(false);
  const [showModalEditPlaylist, setShowModalEditPlaylist] = useState(false);

  const channelsArray = Object.values(channels);
  const videosArray = Object.values(videos);
  const playlistArray = Object.values(playlist);

  if (user == null) {
    history.push("/");
  }

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
      (playlist) => playlist.id == playlistId
    );
  }

  //   randomly assign playlist background color
  const [backgroundNumber, setBackgroundNumber] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("");
  useEffect(() => {
    setBackgroundNumber(Math.ceil(Math.random() * 10));
    if (backgroundColor !== 0) {
      if (backgroundNumber == 1) {
        setBackgroundColor("FirstPlaylistBackground");
      } else if (backgroundNumber == 2) {
        setBackgroundColor("SecondPlaylistBackground");
      } else if (backgroundNumber == 3) {
        setBackgroundColor("ThirdPlaylistBackground");
      } else if (backgroundNumber == 4) {
        setBackgroundColor("FourthPlaylistBackground");
      } else if (backgroundNumber == 5) {
        setBackgroundColor("FifthPlaylistBackground");
      } else if (backgroundNumber == 6) {
        setBackgroundColor("SixthPlaylistBackground");
      } else if (backgroundNumber == 7) {
        setBackgroundColor("SeventhPlaylistBackground");
      } else if (backgroundNumber == 8) {
        setBackgroundColor("EigthPlaylistBackground");
      } else if (backgroundNumber == 9) {
        setBackgroundColor("NinthPlaylistBackground");
      } else {
        setBackgroundColor("TenthPlaylistBackground");
      }
    }
  }, [dispatch, backgroundNumber, playlistId]);

  if (!userPlaylists[0] && playlistArray != null) {
    return (
      <>
        <div>{history.push("/")}</div>
      </>
    );
  }

  return (
    <>
      <div
        className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}
      >
        {/* playlist Card */}
        <div className="PlaylistCardContainerPage" id={`${backgroundColor}`}>
          <div className="CenterImagePlaylistCard">
            {userPlaylists[0].playlist_videos[0] != null ? (
              <div
                className="PlaylistPreviewImage"
                onClick={() =>
                  history.push(
                    `/playlists/${playlistId}/${userPlaylists[0].playlist_videos[0].video_id}`
                  )
                }
              >
                {videosArray &&
                  videosArray.map((video) => {
                    return (
                      <>
                        {video.id ==
                        userPlaylists[0].playlist_videos[0].video_id ? (
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
              <div>No videos in Playlist</div>
            )}
          </div>
          <div className="CenterImagePlaylistCardDetails">
            <div className="PlaylistTitlePageContainer">
              <div className="PlaylistTitleOnCard">
                {userPlaylists[0].title}
              </div>
              <div className="EditDeleteChannelSection">
                <div className="EditChannelFavicon">
                  {showModalEditPlaylist && (
                    <Modal onClose={() => setShowModalEditPlaylist(false)}>
                      <EditPlaylistForm
                        setShowModal={setShowModalEditPlaylist}
                      />
                    </Modal>
                  )}

                  <i
                    onClick={() => {
                      setShowModalEditPlaylist(true);
                    }}
                    class="fa-solid fa-pen-to-square"
                  ></i>
                </div>
              </div>
            </div>
            <div className="PlaylistCardButtonContainer">
              <div
                className="PlaylistPlayAllButton"
                onClick={() =>
                  history.push(
                    `/playlists/${playlistId}/${userPlaylists[0].playlist_videos[0].video_id}`
                  )
                }
              >
                {" "}
                <i class="fa-solid fa-play"></i>
                Play all
              </div>

              <Link
                className="PlaylistSeeAllPlaylists"
                to={{
                  pathname: `/users/${user.id}`,
                  state: {
                    directedCategory: 3,
                    uploadModalState: false,
                  },
                }}
               >See All Playlist</Link>
            </div>
          </div>
        </div>
        {/* playlist videos */}
        <div className="PlaylistVideosContainerPage">
          {userPlaylists &&
            userPlaylists[0].playlist_videos.map((playlistVideos) => {
              return (
                <>
                  <div className="PlaylistVideosArraySection">
                    {videosArray &&
                      videosArray.map((video) => {
                        return (
                          <>
                            {playlistVideos.video_id == video.id ? (
                              <div
                                className="VideoCardPlaylist"
                                // onClick={() => history.push(`/videos/${video.id}`)}
                              >
                                <div className="EditChannelFavicon">
                                  {showModalRemoveVideo && (
                                    <Modal
                                      onClose={() =>
                                        setShowModalRemoveVideo(false)
                                      }
                                    >
                                      <DeletePlaylistVideoForm
                                        playlistVideo={currentPlaylist}
                                        setShowModal={setShowModalRemoveVideo}
                                      />
                                    </Modal>
                                  )}

                                  <i
                                    onClick={() => {
                                      setShowModalRemoveVideo(true);
                                      setCurrentPlaylist(playlistVideos);
                                    }}
                                    class="fa-sharp fa-solid fa-trash"
                                  ></i>
                                </div>

                                {/* used to cover video preview to prevent load */}
                                <div
                                  className="OverlayVideoPlaylistPreviewDetails"
                                  onClick={() =>
                                    history.push(`/videos/${video.id}`)
                                  }
                                ></div>
                                {/* used to cover video preview to prevent load */}
                                <div
                                  className="RecommendedVideoPlaylistPreview"
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
                                      onClickPreview={false}
                                    />
                                  )}
                                </div>
                                <div className="RecommendedVideoPlaylistDetailsSection">
                                  {channelsArray &&
                                    channelsArray.map((channel) => {
                                      return (
                                        <>
                                          {channel.id == video.channel_id ? (
                                            <div className="PlaylistVideoCardBottomSection">
                                              <div className="PlaylistVideoArrayChannelDetails">
                                                <div
                                                  className="VideoTitleCardPlaylistSection"
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
                                                  id="PlaylistVideoArrayChannelDetailsSection"
                                                >
                                                  <div
                                                    className="flexRow"
                                                    id="ChannelNameHomeArray"
                                                  >
                                                    <Link
                                                      className="PlayVideoplaylistChannelName"
                                                      to={`/channels/${channel.id}`}
                                                    >
                                                      {channel.channel_name}
                                                    </Link>
                                                    <div id="verifiedCheckMarkPlaylist">
                                                      <i class="fa-solid fa-check"></i>
                                                    </div>
                                                  </div>
                                                  <div
                                                    className="flexRow"
                                                    id="PlaylistArrayVideoViews"
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
    </>
  );
}
