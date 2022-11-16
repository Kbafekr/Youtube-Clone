import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllPlaylistsThunk } from "../../../store/playlist";
import { newPlaylistThunk } from "../../../store/playlist";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function CreatePlaylistForm({setShowModal}) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const userId = user.id;

  const [title, setTitle] = useState("");
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
        newPlaylistThunk(
          userId,
          title
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
          <h2 className="EditUserHeaderTop">Create New Playlist</h2>
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
            id="edit-image-input"
            type="text"
            name="preview-image"
            placeholder="Playlist name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // required
          />
          <div className="deleteImageButtons">
            <button
              className="submitDeleteImage"
              onClick={handleSubmit}
              type="submit"
            >
              Submit Playlist
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

export default CreatePlaylistForm;
