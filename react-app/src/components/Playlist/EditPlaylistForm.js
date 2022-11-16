import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllPlaylistsThunk } from "../../store/playlist";
import { useParams } from "react-router-dom";
import { updatePlaylistThunk } from "../../store/playlist";
function EditPlaylistForm({setShowModal }) {

const {playlistId} = useParams()
  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlist);
  const playlistArray = Object.values(playlists)
  const playlist = playlistArray.filter((playlist) => playlist.id == playlistId)

  console.log(playlist)
  const dispatch = useDispatch();
  const userId = user.id;

  const [title, setTitle] = useState(playlist[0].title);
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const formValidationErrors = [];

    if (!title || title.length < 1 || title.trim().length < 1)
      formValidationErrors.push(
        "Playlist title must exist and must be more than 1 character"
      );
    if (title.length > 50)
      formValidationErrors.push("Playlist title must less than 50 characters");
    setErrors(formValidationErrors);
  }, [title]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updatePlaylistThunk(
          playlistId,
          userId,
          title,
        )
      )
        .then(() => setShowModal(false)).then(() => dispatch(getAllPlaylistsThunk()))
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
          <h2 className="EditUserHeaderTop">Edit Playlist</h2>
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
          <div className="EditUserHeader">Title:</div>
          <input
            className="preview-image-input"
            id="edit-channel-input"
            type="text"
            name="preview-image"
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="deleteImageButtons">
            <button
              className="submitDeleteImage"
              onClick={handleSubmit}
              type="submit"
            >
              Submit Edit
            </button>
            <button
              className="cancelDeleteImage"
              onClick={() => setShowModal(false)}
              type="submit"
            >
              Cancel Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPlaylistForm;
