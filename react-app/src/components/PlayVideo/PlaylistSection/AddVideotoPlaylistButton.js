import "./SubscribeButtonVideo.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../../store/session";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllPlaylistsThunk } from "../../../store/playlist";
import { Modal } from "../../../context/Modal";
import AddToPlaylistForm from "./AddtoPlaylistForm";

export const AddToPlaylistButton = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlist);

  const [showPlaylistModal, setshowPlaylistModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const playlistArray = Object.values(playlists);

  let userPlaylists;

  if (playlistArray != null && user != null) {
    userPlaylists = playlistArray.filter(
      (playlist) => playlist.user_id == user.id
    );
  }

  useEffect(() => {
    dispatch(getAllPlaylistsThunk());
  }, [dispatch, user]);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
    })();
  }, [dispatch]);

    if (user != null) {
      return (
        <>
          {/* button that csubscribees and unsubscribes*/}
          <div
            className="AddtoPlaylistButtonVideosSection"
            // onClick={() =>
            //   dispatch(createSubscriberThunk(currentChannel.id)).then(() =>
            //     setSubscribed(!subscribed)
            //   )
            // }
            onClick={() => {
              setShowModal(true);
            }} >
               {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                              <AddToPlaylistForm
                                setShowModal={setShowModal}
                              />
                            </Modal>
                          )}
              <div className="PlaylistAddButtonText">
                add to playlist
              </div>
          </div>
          {/* drop down to add video to playlist */}

        </>
      );
    } else return <></>;
};
