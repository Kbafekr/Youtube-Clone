import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPlaylistsThunk } from "../../../store/playlist";
import { newPlaylistThunk } from "../../../store/playlist";
import { addVideoToPlaylistThunk } from "../../../store/playlist";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function AddToPlaylistForm({ setShowModal }) {
  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlist);

  const dispatch = useDispatch();
  const userId = user.id;
  const { videoId } = useParams();


  const playlistArray = Object.values(playlists);

  let userPlaylists;

  if (playlistArray != null) {
    userPlaylists = playlistArray.filter(
      (playlist) => playlist.user_id == user.id
    );
  }

  const [playlistId, setPlaylistId] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const formValidationErrors = [];

    if (!playlistId || playlistId.length < 1)
      formValidationErrors.push(
        "Choose a playlist"
      );
    setErrors(formValidationErrors);
  }, [playlistId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(addVideoToPlaylistThunk(playlistId, videoId))
        .then(() => setShowModal(false))
        .then(() => dispatch(getAllPlaylistsThunk()))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return errors;
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="EditUser-outer">
      <div className="edit-user-containerinner">
        <form
          className="Edit-User-inner"
          onSubmit={handleSubmit2}
          autoComplete="off"
        >
          <h2 className="EditUserHeaderTop">Add Video to Playlist</h2>
          <div className="errorHandlingContainer">
            {errors.length > 0 && (
              <div className="HeaderErrorStyling">
                <ul className="ImageUlBulletErrorStyling">
                  {errors.map((error, idx) => (
                    <li className="ImageErrorPoints" key={idx}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <select
            className="preview-image-input"
            value={playlistId}
            onChange={(e) => setPlaylistId(e.target.value)}
            // required
          >
            <option selected disabled value="">
              Select a playlist...
            </option>
            {userPlaylists &&
              userPlaylists.map((playlist) => {
                return (
                  <option
                    className="OptionsAlbumsDropdown"
                    value={playlist.id}
                    key={playlist.id}
                  >
                    {playlist.title}
                  </option>
                );
              })}
          </select>
          <div className="deleteImageButtons">
            <button
              className="submitDeleteImage"
              onClick={handleSubmit}
              type="submit"
            >
              Add to Playlist
            </button>
            <button
              className="cancelDeleteImage"
              onClick={() => setShowModal(false)}
              type="submit"
            >
              Cancel Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddToPlaylistForm;
