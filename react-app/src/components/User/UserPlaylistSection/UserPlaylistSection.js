import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../../store/session";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import ReactPlayer from "react-player";
import { getAllVideosThunk } from "../../../store/video";
import EditPlaylistForm from "./EditPlaylistForm";
import DeletePlaylistForm from "./DeletePlaylistForm";
import "./UserPlaylistSection.css";

import { getAllPlaylistsThunk } from "../../../store/playlist";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function UserPlaylistSection() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlist);
  const videos = useSelector((state) => state.video);
  const videosArray = Object.values(videos);

  const playlistArray = Object.values(playlists);

  let userPlaylists;

  if (playlistArray != null) {
    userPlaylists = playlistArray.filter(
      (playlist) => playlist.user_id == currentUser.id
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

  const [currentPlaylist, setcurrentPlaylist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  // channels
  useEffect(() => {
    dispatch(getAllPlaylistsThunk());
  }, [dispatch, showModal, showModalCreate, showModalEdit, showModalDelete]);
  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
    })();
  }, [dispatch, showModal, showModalCreate, showModalEdit, showModalDelete]);

  return (
    <>
      <div className="UserChannelsDetailsSectionOuter">
        <div className="UserChannelsDetailsSection">
          <div className="PlaylistUserSectionMapped">
            {userPlaylists &&
              userPlaylists.map((playlist) => {
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
                      <div className="EditDeleteChannelSection">
                        <div className="EditChannelFavicon">
                          {showModalEdit && (
                            <Modal onClose={() => setShowModalEdit(false)}>
                              <EditPlaylistForm
                                playlist={currentPlaylist}
                                setShowModal={setShowModalEdit}
                              />
                            </Modal>
                          )}

                          <i
                            onClick={() => {
                              setShowModalEdit(true);
                              setcurrentPlaylist(playlist);
                            }}
                            class="fa-solid fa-pen-to-square"
                          ></i>
                        </div>
                        <div className="EditChannelFavicon">
                          {showModalDelete && (
                            <Modal onClose={() => setShowModalDelete(false)}>
                              <DeletePlaylistForm
                                playlist={currentPlaylist}
                                setShowModal={setShowModalDelete}
                              />
                            </Modal>
                          )}
                          <i
                            onClick={() => {
                              setShowModalDelete(true);
                              setcurrentPlaylist(playlist);
                            }}
                            class="fa-sharp fa-solid fa-trash"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPlaylistSection;
