import "./LikedVideosPage.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { getAllPlaylistsThunk } from "../../store/playlist";
import { updatePlaylistThunk } from "../../store/playlist";
import { getAllLikesThunk } from "../../store/likes";
import { getWatchLaterThunk } from "../../store/watchlater";
import { Modal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { amountViews } from "../../Utils/Utils";
import { Link } from "react-router-dom";
export function WatchLaterPage({ sidePanel }) {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const channels = useSelector((state) => state.channel);
  const likes = useSelector((state) => state.likes);
  const watchlater = useSelector((state) => state.watchlater);

  const channelsArray = Object.values(channels);
  const videosArray = Object.values(videos);
  const watchlaterArray = Object.values(watchlater);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);
  useEffect(() => {
    if (user) {
      dispatch(getWatchLaterThunk(user.id));
    }
  }, [dispatch, user]);

  let userWatchLater;

  if (watchlaterArray != null && user != null) {
    userWatchLater = watchlaterArray.filter((likes) => likes.user_id == user.id);
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

  if (!user) {
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
            {userWatchLater[0] != null ? (
              <div
                className="PlaylistPreviewImage"
                onClick={() =>
                  history.push(`/videos/${userWatchLater[0].video_id}`)
                }
                // onClick={() =>
                //   history.push(`/likedvideos/${userWatchLater[0].video_id}`)
                // }
              >
                {videosArray &&
                  videosArray.map((video) => {
                    return (
                      <>
                        {video.id == userWatchLater[0].video_id ? (
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
              <div className="PlaylistNoVideosPreview">
                <img
                  className="PlaylistNoVideosPreview"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Black_Box.png/1280px-Black_Box.png"
                  id="noCursor"
                />
                <div className="NoVideosInPlaylistUserSection" id="noCursor">
                  Nothing to watch{" "}
                </div>
              </div>
            )}
          </div>
          <div className="CenterImagePlaylistCardDetails">
            <div className="PlaylistTitlePageContainer">
              <div className="PlaylistTitleOnCard">Watch Later</div>
            </div>
            {/* <div className="PlaylistCardButtonContainer">
              {userWatchLater[0] != null && userWatchLater[0].video_id != null ? (
                <div
                  className="PlaylistPlayAllButton"
                  onClick={() =>
                    history.push(`/likedvideos/${userWatchLater[0].video_id}`)
                  }
                >
                  {" "}
                  <i class="fa-solid fa-play"></i>
                  Play all
                </div>
              ) : (
                ""
              )}
            </div> */}
          </div>
        </div>













        
        {/* playlist videos */}
        <div className="PlaylistVideosContainerPage">
          {userWatchLater &&
            userWatchLater.map((likedvideos) => {
              return (
                <>
                  <div className="PlaylistVideosArraySection">
                    {videosArray &&
                      videosArray.map((video) => {
                        return (
                          <>
                            {likedvideos.video_id == video.id ? (
                              <div
                                className="VideoCardPlaylist"
                                // onClick={() => history.push(`/videos/${video.id}`)}
                              >
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
