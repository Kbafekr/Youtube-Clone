import "./HootubeMusic.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllSongsThunk } from "../../store/song";
import { getAllChannelsThunk } from "../../store/channel";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { actionSongPlaying } from "../../store/audioPlayer";
import { authenticate } from "../../store/session";
import { amountViews } from "../../Utils/Utils";
import logo from "../../icons/you2oobLogo.png";
import { Link } from "react-router-dom";
import { getAllUsersThunk } from "../../store/allusers";

export function HootubeMusic({
  sidePanel,
  setNavBarType,
  setPlayingSongPlayer,
  setPlayStateReactPlayer,
  playStateReactPlayer,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.song);
  const channels = useSelector((state) => state.channel);
  const [loaded, setLoaded] = useState(false);
  const [currentPlayingSong, setCurrentPlayingSong] = useState(false);
  setNavBarType("Music");

  console.log(playStateReactPlayer);
  let songsArray;
  let channelsArray;

  songsArray = Object.values(songs);
  channelsArray = Object.values(channels);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getAllSongsThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, user]);

  let arrayResult;

  arrayResult = [...songsArray];
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
                arrayResult.map((song) => {
                  return (
                    <>
                      <div className="VideoCardHome">

                        {/*  if song is not being */}
                        <div
                          className="OverlaySongPreviewHome"
                          onClick={() => {
                            dispatch(actionSongPlaying(song));
                            setPlayingSongPlayer(true);
                            setCurrentPlayingSong(song);
                            setPlayStateReactPlayer(true);
                            // setPlayStateReactPlayer(!playStateReactPlayer);
                          }}
                        >
                          {song.id === currentPlayingSong.id &&
                          playStateReactPlayer === true ? (
                            <div className="SongPauseButton">
                              <div
                                className="CircleContainerPlaySongHover"
                                id="CircleBackgroundHover"
                              >
                                <i class="fa-solid fa-circle"></i>
                              </div>

                              <div
                                className="backgroundCircleSongPlay"
                                id="playSongButtonHover"
                              >
                                <i class="fa-solid fa-pause"></i>
                              </div>
                            </div>
                          ) : (
                            <div className="SongPlayButtonHover">
                              <div
                                className="CircleContainerPlaySongHover"
                                id="CircleBackgroundHover"
                              >
                                <i class="fa-solid fa-circle"></i>
                              </div>

                              <div
                                className="backgroundCircleSongPlay"
                                id="playSongButtonHover"
                              >
                                <i class="fa-solid fa-play"></i>
                              </div>
                            </div>
                          )}
                        </div>



                        {/*  if song is not being */}
                        {song.id === currentPlayingSong.id && playStateReactPlayer === true ?
                        <div
                          className="OverlaySongPreviewHome"
                          onClick={() => {
                            dispatch(actionSongPlaying(song));
                            setPlayingSongPlayer(true);
                            setCurrentPlayingSong(song);
                            setPlayStateReactPlayer(false);
                            // setPlayStateReactPlayer(!playStateReactPlayer);
                          }}
                        >
                            <div className="SongPauseButton">
                              <div
                                className="CircleContainerPlaySongHover"
                                id="CircleBackgroundHover"
                              >
                                <i class="fa-solid fa-circle"></i>
                              </div>

                              <div
                                className="backgroundCircleSongPlay"
                                id="playSongButtonHover"
                              >
                                <i class="fa-solid fa-pause"></i>
                              </div>
                            </div>
                        </div> : "" }


                        {/*  if song is not being played */}

                        {song.id === currentPlayingSong.id && playStateReactPlayer === false ?
                        <div
                          className="OverlaySongPreviewHome"
                          onClick={() => {
                            dispatch(actionSongPlaying(song));
                            setPlayingSongPlayer(true);
                            setCurrentPlayingSong(song);
                            setPlayStateReactPlayer(true);

                          }}
                        >
                            <div className="SongPauseButton">
                              <div
                                className="CircleContainerPlaySongHover"
                                id="CircleBackgroundHover"
                              >
                                <i class="fa-solid fa-circle"></i>
                              </div>

                              <div
                                className="backgroundCircleSongPlay"
                                id="playSongButtonHover"
                              >
                              <i class="fa-solid fa-play"></i>

                              </div>
                            </div>
                        </div> : "" }

                        {/* end of logic */}
                        <div className="SongPreviewHome">
                          {song.song_url.includes("s3") ? (
                            <ReactPlayer
                              width="100%"
                              height="100%"
                              url={song.song_url}
                              playIcon={true}
                            />
                          ) : (
                            <ReactPlayer
                              width="100%"
                              height="100%"
                              url={song.song_url}
                              light={true}
                              playIcon={true}
                            />
                          )}
                        </div>
                        {channelsArray &&
                          channelsArray.map((channel) => {
                            return (
                              <>
                                {channel.id == song.channel_id ? (
                                  <div className="HomeVideoCardBottomSection">
                                    <div className="HootubeSongArrayHomeArtist">
                                      <div
                                        className="SongTitleCardHome"
                                        onClick={() =>
                                          history.push(`/songs/${song.id}`)
                                        }
                                      >
                                        {song.title}
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
                                            to={`/songs/${song.id}`}
                                          >
                                            {song.artist}
                                          </Link>
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
